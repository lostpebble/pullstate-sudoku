import { Store } from "pullstate";
import sudoku from "sudoku-umd";
import { Patch } from "immer";

interface IPuzzleStore {
  startedPuzzle: boolean;
  finishedPuzzle: boolean;
  filledBlocks: string[][];
  originalFilledBlocks: string[][];
}

export const PuzzleStore = new Store<IPuzzleStore>({
  startedPuzzle: false,
  finishedPuzzle: false,
  filledBlocks: [],
  originalFilledBlocks: [],
});

// PATCH LISTENER / UNDO / REDO

let changes: Patch[][] = [];
let reverseChanges: Patch[][] = [];
let offset = 0;

PuzzleStore.listenToPatches((patches, inversePatches) => {
  const targetIndex = reverseChanges.length - offset;
  offset = 0;

  if (targetIndex >= 0) {
    changes = changes.slice(0, targetIndex);
    reverseChanges = reverseChanges.slice(0, targetIndex);
  }

  changes.push(patches);
  reverseChanges.push(inversePatches);
});

function undo() {
  const targetIndex = (reverseChanges.length - 1) - offset;

  if (targetIndex >= 0 && reverseChanges[targetIndex]) {
    offset += 1;
    PuzzleStore.applyPatches(reverseChanges[targetIndex]);
  }
}

function redo() {
  const targetIndex = changes.length - offset;

  if (targetIndex >= 0 && changes[targetIndex]) {
    offset -= 1;
    PuzzleStore.applyPatches(changes[targetIndex]);
  }
}

// REACTIONS

// If our board has changed, check if the user has won the game
PuzzleStore.createReaction(
  s => s.filledBlocks,
  (watched, s, o) => {
    if (o.startedPuzzle && watched.length > 0) {
      const boardString = sudoku.board_grid_to_string(watched);
      const solvedBoardString = sudoku.solve(boardString);

      if (solvedBoardString) {
        sudoku.print_board(solvedBoardString);
      }

      if (boardString === solvedBoardString) {
        s.finishedPuzzle = true;
      }
    }
  }
);

// ACTIONS

function generateNewSudoku(level: "easy" | "medium" | "hard" | "very-hard") {
  const sudokuString: string = sudoku.generate(level);
  const filledBlocks: string[][] = sudoku.board_string_to_grid(sudokuString);
  const originalFilled: string[][] = sudoku.board_string_to_grid(sudokuString);

  PuzzleStore.update(s => {
    s.filledBlocks = filledBlocks;
    s.originalFilledBlocks = originalFilled;
    s.startedPuzzle = true;
  });
}

const allowedValuesArr = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function editCell(x: number, y: number, value: string) {
  if (allowedValuesArr.includes(value)) {
    if (value === "") {
      value = ".";
    }
    PuzzleStore.update(s => {
      s.filledBlocks[y][x] = value;
    });
  }
}

export const PuzzleActions = {
  generateNewSudoku,
  editCell,
  undo,
  redo,
};
