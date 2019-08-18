import { Button } from "@material-ui/core";
import React from "react";
import { PuzzleActions } from "../store/PuzzleStore";
import { Grid } from "./Grid";

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
