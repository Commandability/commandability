/**
 * Incident Actions
 *
 * Actions managing the state of the current incident.
 */

import { RESET_INCIDENT, START_INCIDENT, END_INCIDENT, RESUME_INCIDENT } from './types';

export const resetIncident = () => ({
  type: RESET_INCIDENT,
});

export const startIncident = () => {
  const entryId = START_INCIDENT; // for storage in the report reducer
  const dateTime = new Date().toLocaleString();
  return {
    type: START_INCIDENT,
    payload: { entryId, dateTime },
  };
};

export const endIncident = () => {
  const entryId = END_INCIDENT;
  const dateTime = new Date().toLocaleString();
  return {
    type: END_INCIDENT,
    payload: { entryId, dateTime },
  };
};

export const resumeIncident = () => ({
  type: RESUME_INCIDENT,
});
