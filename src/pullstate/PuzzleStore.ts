import { Store } from "pullstate";
import sudoku from "sudoku-umd";
import { Patch } from "immer";
import { createPatchesPathsFilter } from "../util";
import { PuzzleUndoRedo } from "./PuzzleUndoRedo";

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

const patchesFilter = createPatchesPathsFilter([["filledBlocks", "*"]]);

PuzzleStore.listenToPatches((patches: Patch[], inversePatches: Patch[]) => {
  const filteredPatches = patchesFilter(patches);

  if (filteredPatches.length > 0) {
    const filteredInversePatches = patchesFilter(inversePatches);
    PuzzleUndoRedo.usePatchesForUndoRedo(filteredPatches, filteredInversePatches);
  }
});

// REACTIONS

// If our board has changed, check if the user has won the game
PuzzleStore.createReaction(
  s => s.filledBlocks,
  (watched, s, o) => {
    if (o.startedPuzzle && watched.length > 0) {
      const boardString = sudoku.board_grid_to_string(watched);
      const solvedBoardString = sudoku.solve(boardString);

      if (solvedBoardString) {
        console.log(`Avert your eyes! - The solved Sudoku:`)
        sudoku.print_board(solvedBoardString);
      }

      s.finishedPuzzle = boardString === solvedBoardString;
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

function reset() {
  PuzzleUndoRedo.reset();
  PuzzleStore.update(s => {
    s.startedPuzzle = false;
    s.finishedPuzzle = false;
  });
}

function clearBoard() {
  PuzzleStore.update((s, o) => {
    // @ts-ignore
    for (const [y, row] of o.originalFilledBlocks.entries()) {
      for (const [x, cell] of row.entries()) {
        s.filledBlocks[y][x] = cell;
      }
    }
  }, PuzzleUndoRedo.usePatchesForUndoRedo);
}

export const PuzzleActions = {
  generateNewSudoku,
  editCell,
  reset,
  clearBoard
};
