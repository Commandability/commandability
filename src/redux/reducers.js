/**
 * Reducers root
 *
 * This file generates persistReducers for redux-persist and generates the root reducer
 * It also contains the logic for the RESET_APP action
 */

import { combineReducers } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, purgeStoredState } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import groups from "./groups/reducer";
import navigation from "./navigation/reducer";
import personnel from "./personnel/reducer";
import report from "./report/reducer";
import selected from "./selected/reducer";
import theme from "./theme/reducer";
import timer from "./timer/reducer";
import { RESET_APP } from "./types";

const groupsPersistConfig = {
  key: "groups",
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};

const navigationPersistConfig = {
  key: "navigation",
  storage: AsyncStorage,
};

// Personnel reducer config, set persisted data to autoMergeLevel2 to track personnel changes
// https://blog.reactnativecoach.com/the-definitive-guide-to-redux-persist-84738167975
const personnelPersistConfig = {
  key: "personnel",
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};

const reportPersistConfig = {
  key: "report",
  storage: AsyncStorage,
};

const themePersistConfig = {
  key: "theme",
  storage: AsyncStorage,
};

const timePersistConfig = {
  key: "timer",
  storage: AsyncStorage,
};

const appReducer = combineReducers({
  groups: persistReducer(groupsPersistConfig, groups),
  navigation: persistReducer(navigationPersistConfig, navigation),
  personnel: persistReducer(personnelPersistConfig, personnel),
  report: persistReducer(reportPersistConfig, report),
  selected,
  theme: persistReducer(themePersistConfig, theme),
  timer: persistReducer(timePersistConfig, timer),
});

// Root reducer config, persisted data defaults to autoMergeLevel1
const rootPersistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = (state, action) => {
  // Should ONLY be called immediately before signing user out
  if (action.type === RESET_APP) {
    // Undefined state results in all reducers returning default state because of default parameters
    state = undefined; // Does not mutate state
    purgeStoredState(groupsPersistConfig);
    purgeStoredState(navigationPersistConfig);
    purgeStoredState(personnelPersistConfig);
    purgeStoredState(reportPersistConfig);
    purgeStoredState(rootPersistConfig);
    purgeStoredState(themePersistConfig);
    purgeStoredState(timePersistConfig);
  }
  return appReducer(state, action);
};

export default persistReducer(rootPersistConfig, rootReducer);
