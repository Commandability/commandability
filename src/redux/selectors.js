/**
 * Selectors root
 */

import { createSelector } from "reselect";

import * as personnel from "./personnel/selectors";
import * as selected from "./selected/selectors";

export * from "./groups/selectors";
export * from "./navigation/selectors";
export * from "./personnel/selectors";
export * from "./report/selectors";
export * from "./selected/selectors";
export * from "./theme/selectors";
export * from "./timer/selectors";

// Multi-reducer selectors

export const selectSelectedPersonnel = createSelector(
  selected.selectSelectedPersonnelIds,
  personnel.selectPersonnelById,
  (selectedPersonnelIds, personnelById) =>
    selectedPersonnelIds.map((personId) => personnelById[personId]),
);
