import React, { ReactElement } from "react";
import { Cell } from "./Cell";
import { createFilled2DArray } from "../util";

export const PuzzleComponent = () => {
  const rowsOfCells: ReactElement[][] = createFilled2DArray(9, 9, (x, y) => (
    <Cell key={`${x}${y}`} x={x} y={y} />
  ));

  return (
    <div className={"puzzle-container"}>
      {rowsOfCells.map((row, index) => (
        <div key={index} className={"row"}>
          {row}
        </div>
      ))}
    </div>
  );
};
