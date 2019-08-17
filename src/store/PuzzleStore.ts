import { Store } from "pullstate";
import sudoku from "sudoku-umd";

interface IPuzzleStore {
  startedPuzzle: boolean;
  finishedPuzzle: boolean;
  filledBlocks: number[][];
  originalFilledBlocks: number[][];
  scribbleBlocks: string[][];
  timeStart: number;
}

export const PuzzleStore = new Store<IPuzzleStore>({
  startedPuzzle: false,
  finishedPuzzle: false,
  filledBlocks: [],
  originalFilledBlocks: [],
  scribbleBlocks: [],
  timeStart: -1,
});

// actions

function generateNewSudoku(level: "easy" | "medium" | "hard" | "very-hard") {
  const sudokuString: string = sudoku.generate(level);

  const filledBlocks: number[][] = [];
  const originalFilled: number[][] = [];
  const scribbleBlocks: string[][] = [];

  for (let y = 0; y < 9; y += 1) {
    filledBlocks.push(
      sudokuString
        .substr(y * 9, 9)
        .split("")
        .map((str): number => (str === "." ? 0 : Number(str)))
    );

    scribbleBlocks.push([]);

    for (let x = 0; x < 9; x += 1) {
      scribbleBlocks[y].push("");
    }
  }

  for (const filled of filledBlocks) {
    originalFilled.push([...filled]);
  }

  PuzzleStore.update(s => {
    s.filledBlocks = filledBlocks;
    s.originalFilledBlocks = originalFilled;
    s.scribbleBlocks = scribbleBlocks;
    s.startedPuzzle = true;
  });
}

const numberArray = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function editCell(x: number, y: number, value: string) {
  PuzzleStore.update(s => {
    if (numberArray.includes(value)) {
      if (value === "") {
        value = "0";
      }
      s.filledBlocks[y][x] = Number(value);
    }
  });
}

export const PuzzleActions = {
  generateNewSudoku,
  editCell,
};
