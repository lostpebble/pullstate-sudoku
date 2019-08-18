import { Patch } from "immer";
import { PuzzleStore } from "./PuzzleStore";

// PATCH LISTENER / UNDO / REDO

let changes: Patch[][] = [];
let reverseChanges: Patch[][] = [];
let offset = 0;

function usePatchesForUndoRedo(patches: Patch[], inversePatches: Patch[]) {
  const targetIndex = reverseChanges.length - offset;
  offset = 0;

  if (targetIndex >= 0) {
    changes = changes.slice(0, targetIndex);
    reverseChanges = reverseChanges.slice(0, targetIndex);
  }

  changes.push(patches);
  reverseChanges.push(inversePatches);
}

function undo() {
  const targetIndex = (reverseChanges.length - 1) - offset;

  if (targetIndex >= 0 && reverseChanges[targetIndex]) {
    offset += 1;
    PuzzleStore.applyPatches(reverseChanges[targetIndex]);
  }
}

function redo() {
  const targetIndex = changes.length - offset;

  if (targetIndex >= 0 && changes[targetIndex]) {
    offset -= 1;
    PuzzleStore.applyPatches(changes[targetIndex]);
  }
}

function reset() {
  changes = [];
  reverseChanges = [];
  offset = 0;
}

export const PuzzleUndoRedo = {
  usePatchesForUndoRedo,
  undo,
  redo,
  reset
}
