import React from "react";
import "./App.css";
import { PreStartComponent } from "./components/PreStartComponent";
import { PuzzleActions, PuzzleStore } from "./store/PuzzleStore";
import { useStoreStateOpt } from "pullstate";
import { PuzzleComponent } from "./components/PuzzleComponent";
import { Button } from "@material-ui/core";

const App: React.FC = () => {
  const [started] = useStoreStateOpt(PuzzleStore, [["startedPuzzle"]]);

  return (
    <div className="App">
      {started && (
        <>
          <Button onClick={() => PuzzleStore.update(s => {
            s.startedPuzzle = false;
          })} className={"restart-button"} variant="contained" color="primary">
            Restart
          </Button>
          <div className={"space"} />
        </>
      )}
      {!started && <PreStartComponent />}
      {started && <PuzzleComponent />}
    </div>
  );
};

setTimeout(() => {
  PuzzleActions.generateNewSudoku("easy");
}, 100);

export default App;
