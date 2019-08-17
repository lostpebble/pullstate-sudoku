import { Button, Container } from "@material-ui/core";
import React from "react";
import { PuzzleActions } from "../store/PuzzleStore";

export const PreStartComponent = () => {
  return (
    <Container className={"pre-start"}>
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
    </Container>
  );
};
