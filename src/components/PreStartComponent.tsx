import { Button } from "@material-ui/core";
import React from "react";
import { Grid } from "./Grid";
import { PuzzleActions } from "../pullstate/PuzzleStore";

export const PreStartComponent = () => {
  return (
    <Grid justifyItems={"center"} gap={1}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          PuzzleActions.generateNewSudoku("easy");
        }}>
        Easy
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          PuzzleActions.generateNewSudoku("medium");
        }}>
        Medium
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          PuzzleActions.generateNewSudoku("hard");
        }}>
        Hard
      </Button>
    </Grid>
  );
};
