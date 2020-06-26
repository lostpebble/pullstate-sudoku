import React, { useEffect } from "react";
import "./App.css";
import { PreStartComponent } from "./components/PreStartComponent";
import { useStoreState } from "pullstate";
import { PuzzleComponent } from "./components/PuzzleComponent";
import { Button, Chip } from "@material-ui/core";
import confetti from "canvas-confetti";
import { Grid } from "./components/Grid";
import { useWindowSize } from "./hooks/useWindowSize";
import { GithubCircle } from "mdi-material-ui";
import { PuzzleActions, PuzzleStore } from "./pullstate/PuzzleStore";
import { PuzzleUndoRedo, UndoStore } from "./pullstate/PuzzleUndoRedo";

function runFireworks() {
  const end = Date.now() + 15 * 1000;

  // @ts-ignore
  const createdConfetti = confetti.create();

  let interval: NodeJS.Timeout = setInterval(function () {
    if (Date.now() > end) {
      return clearInterval(interval);
    }

    createdConfetti({
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      shapes: ["square"],
      origin: {
        x: Math.random(),
        // since they fall down, start a bit higher than random
        y: Math.random() - 0.2,
      },
    } as any);
  }, 200);
}

const App: React.FC = () => {
  const finished = useStoreState(PuzzleStore, (s) => s.finishedPuzzle);
  const started = useStoreState(PuzzleStore, (s) => s.startedPuzzle);
  const canUndo = useStoreState(UndoStore, (s) => s.undoStack.length > 0);
  const canRedo = useStoreState(UndoStore, (s) => s.redoStack.length > 0);

  useEffect(() => {
    if (finished) {
      runFireworks();
    }
  }, [finished]);

  const { width } = useWindowSize();

  let fontSizePx = Math.min(Math.round((width || 100) / 40), 20);

  return (
    <div style={{ fontSize: `${fontSizePx}px` }} className="App">
      {started && (
        <Grid direction={"column"} gap={1}>
          <Button
            onClick={PuzzleActions.reset}
            variant="contained"
            color="primary"
          >
            Start New Puzzle
          </Button>
          <PuzzleComponent />
          <Grid direction={"row"} gap={1}>
            <Button
              onClick={PuzzleUndoRedo.undo}
              variant="outlined"
              color="secondary"
              disabled={!canUndo}
            >
              Undo
            </Button>
            <Button
              onClick={PuzzleUndoRedo.redo}
              variant="outlined"
              color="secondary"
              disabled={!canRedo}
            >
              Redo
            </Button>
            <Button
              onClick={PuzzleActions.clearBoard}
              variant="outlined"
              color="secondary"
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      )}
      {!started && <PreStartComponent />}
      <div style={{ marginTop: "5em" }}>
        <Chip
          icon={<GithubCircle />}
          clickable
          component={"a"}
          color="primary"
          href={`https://github.com/lostpebble/pullstate-sudoku`}
          target={"_blank"}
          label="lostpebble/pullstate-sudoku"
        />
      </div>
    </div>
  );
};

export default App;
