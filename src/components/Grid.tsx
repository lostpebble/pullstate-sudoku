import React from "react";
import { AlignItemsProperty, JustifyContentProperty, JustifyItemsProperty } from "csstype";

export interface IGridProps {
  direction?: "row" | "column";
  justifyContent?: JustifyContentProperty;
  justifyItems?: JustifyItemsProperty;
  align?: AlignItemsProperty;
  gap?: number;
}

export const Grid: React.FC<IGridProps> = ({
  direction = "row",
  gap = 1,
  justifyContent = "center",
  justifyItems = "center",
  align = "center",
  children,
}) => {
  return (
    <div
      style={{
        display: "grid",
        gridAutoFlow: direction === "column" ? "row" : "column",
        gap: `${gap}em`,
        justifyContent,
        justifyItems,
        alignItems: align,
      }}>
      {children}
    </div>
  );
};
