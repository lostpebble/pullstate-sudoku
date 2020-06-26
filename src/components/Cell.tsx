import { useStoreState } from "pullstate";
import React, { CSSProperties } from "react";
import { PuzzleActions, PuzzleStore } from "../pullstate/PuzzleStore";

export interface ICellProps {
  x: number;
  y: number;
}

const borderStyle = `1px solid #667788`;

export const Cell = ({ x, y }: ICellProps) => {
  const filledBlock = useStoreState(
    PuzzleStore,
    (s) => (s.startedPuzzle ? s.filledBlocks[y][x] : ""),
    [x, y]
  );
  const originalFilled = useStoreState(
    PuzzleStore,
    (s) => (s.startedPuzzle ? s.originalFilledBlocks[y][x] : ""),
    [x, y]
  );

  const style: CSSProperties = {
    userSelect: "none",
  };

  if ([2, 5].includes(x)) {
    style.borderRight = borderStyle;
  }

  if ([3, 6].includes(x)) {
    style.borderLeft = borderStyle;
  }

  if ([2, 5].includes(y)) {
    style.borderBottom = borderStyle;
  }

  if ([3, 6].includes(y)) {
    style.borderTop = borderStyle;
  }

  const wasOriginal = originalFilled !== ".";
  const filledValue = filledBlock !== "." ? filledBlock : "";

  return (
    <div
      style={style}
      className={`cell ${wasOriginal ? `original` : `editable`}`}
    >
      {!wasOriginal && (
        <input
          type={"number"}
          value={filledValue}
          onChange={(event) => PuzzleActions.editCell(x, y, event.target.value)}
        />
      )}
      {wasOriginal && <span className={`set-value`}>{filledValue}</span>}
    </div>
  );
};
