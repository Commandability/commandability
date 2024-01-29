/**
 * Group Actions
 */

import {v4 as uuidv4} from 'uuid';

import {
  EDIT_GROUP,
  ALERT_PERSON_TO_GROUP,
  DEALERT_PERSON_TO_GROUP,
  TOGGLE_GROUP,
  CONFIGURE_GROUPS,
} from '../types';
import {dateTimeFormat} from '../utils/report-manager';

export const editGroup = (group, settings) => {
  const entryId = uuidv4(); // For storage in the report reducer
  const dateTime = new Date().toLocaleString(dateTimeFormat);

  return {
    type: EDIT_GROUP,
    payload: {entryId, dateTime, group, settings},
  };
};

export const alertPersonToGroup = (group, person) => {
  const entryId = uuidv4(); // For storage in the report reducer
  const dateTime = new Date().toLocaleString(dateTimeFormat);
  return {
    type: ALERT_PERSON_TO_GROUP,
    payload: {entryId, dateTime, group, person},
  };
};

export const dealertPersonToGroup = (group, person) => {
  return {
    type: DEALERT_PERSON_TO_GROUP,
    payload: {group, person},
  };
};

export const toggleGroup = (group) => {
  const entryId = uuidv4(); // For storage in the report reducer
  const dateTime = new Date().toLocaleString(dateTimeFormat);
  return {
    type: TOGGLE_GROUP,
    payload: {entryId, dateTime, currTime: Date.now(), group},
  };
};

export const configureGroups = (groups = {}) => ({
  type: CONFIGURE_GROUPS,
  payload: {groups},
});
