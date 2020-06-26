import { Patch } from "immer";
import { PuzzleStore } from "./PuzzleStore";
import { Store } from "pullstate";

// PATCH LISTENER / UNDO / REDO
type Change = [Patch[], Patch[]];
export const UndoStore = new Store({
  undoStack: [] as Change[],
  redoStack: [] as Change[],
});

function addChanges(patches: Patch[], inversePatches: Patch[]) {
  UndoStore.update((s) => {
    s.redoStack = [];
    s.undoStack.push([patches, inversePatches]);
  });
}

function undo() {
  UndoStore.update((s) => {
    const change = s.undoStack.pop();
    if (change === undefined) return;
    const [, inversePatches] = change;
    s.redoStack.push(change);
    PuzzleStore.applyPatches(inversePatches);
  });
}

function redo() {
  UndoStore.update((s) => {
    const change = s.redoStack.pop();
    if (change === undefined) return;
    const [patches] = change;
    s.undoStack.push(change);
    PuzzleStore.applyPatches(patches);
  });
}

function reset() {
  UndoStore.update((s) => {
    s.undoStack = [];
    s.redoStack = [];
  });
}

export const PuzzleUndoRedo = {
  addChanges,
  undo,
  redo,
  reset,
};
