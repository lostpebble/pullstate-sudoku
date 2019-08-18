import React, { useEffect } from "react";
import "./App.css";
import { PreStartComponent } from "./components/PreStartComponent";
import { PuzzleActions, PuzzleStore } from "./store/PuzzleStore";
import { useStoreStateOpt } from "pullstate";
import { PuzzleComponent } from "./components/PuzzleComponent";
import { Button, Chip } from "@material-ui/core";
import confetti from "canvas-confetti";
import { Grid } from "./components/Grid";
import { useWindowSize } from "./hooks/useWindowSize";
import { GithubCircle } from "mdi-material-ui"

function runFireworks() {
  const end = Date.now() + 15 * 1000;

  // @ts-ignore
  const createdConfetti = confetti.create();

  let interval: NodeJS.Timeout = setInterval(function() {
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
  const [started, finished] = useStoreStateOpt(PuzzleStore, [["startedPuzzle"], ["finishedPuzzle"]]);

  useEffect(
    () => {
      if (finished) {
        runFireworks();
      }
    },
    [finished]
  );

  const { width } = useWindowSize();

  let fontSizePx = Math.min(Math.round((width || 100) / 40), 20);

  return (
    <div style={{ fontSize: `${fontSizePx}px` }} className="App">
      {started && (
        <Grid direction={"column"} gap={1}>
          <Button
            onClick={() =>
              PuzzleStore.update(s => {
                s.startedPuzzle = false;
                s.finishedPuzzle = false;
              })
            }
            variant="contained"
            color="primary">
            Start New Puzzle
          </Button>
          <PuzzleComponent />
          <Grid direction={"row"} gap={1}>
            <Button onClick={PuzzleActions.undo} variant="outlined" color="secondary">
              Undo
            </Button>
            <Button onClick={PuzzleActions.redo} variant="outlined" color="secondary">
              Redo
            </Button>
          </Grid>
        </Grid>
      )}
      {!started && <PreStartComponent />}
      <div style={{ marginTop: "5em" }}>
        <Chip
          icon={<GithubCircle/>}
          clickable
          component={"a"}
          color="primary"
          href={`https://github.com/lostpebble/pullstate-sudoku`}
          label="View the source at github.com/lostpebble/pullstate-sudoku"
        />
      </div>
    </div>
  );
};

setTimeout(() => {
  PuzzleActions.generateNewSudoku("easy");
}, 100);

export default App;
