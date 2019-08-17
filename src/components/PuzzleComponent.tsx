import { Container } from "@material-ui/core";
import React, { ReactElement } from "react";
import { Cell } from "./Cell";

export const PuzzleComponent = () => {
  const rowsOfCells: ReactElement[][] = [];

  for (let y = 0; y < 9; y += 1) {
    rowsOfCells.push([]);

    for (let x = 0; x < 9; x += 1) {
      rowsOfCells[y].push(<Cell key={`${x}${y}`} x={x} y={y}/>);
    }
  }

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
