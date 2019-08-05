import { combineReducers } from "redux";
import { ADD_GROUP, EDIT_NAME, EDIT_VISIBILITY, MOVE_PERSONNEL } from "../actions/types";

const groupsById = (state = {}, action) => {
  switch (action.type) {
    case ADD_GROUP:
      return addGroup(state, action);
    case EDIT_NAME:
      return editName(state, action);
    case EDIT_VISIBILITY:
      return editVisibility(state, action);
    case MOVE_PERSONNEL:
      return movePersonnel(state, action);
    default:
      return state;
  }
};

const groupIds = (state = [], action) => {
  switch (action.type) {
    case ADD_GROUP:
      return addGroupId(state, action);
    default:
      return state;
  }
};

const addGroup = (state, action) => {
  const { payload } = action;
  const { id, name, visible } = payload;
  return {
    ...state,
    [id]: {
      id,
      name,
      visible,
      personnel: []
    }
  };
};

const addGroupId = (state, action) => {
  const { payload } = action;
  const { id } = payload;
  return state.concat(id);
};

const editName = (state, action) => {
  const { payload } = action;
  const { id, name } = payload;
  const group = state[id];
  return {
    ...state,
    [id]: {
      ...group,
      name
    }
  };
};

const editVisibility = (state, action) => {
  const { payload } = action;
  const { id, visibility } = payload;
  const group = state[id];
  return {
    ...state,
    [id]: {
      ...group,
      visibility
    }
  };
};

const movePersonnel = (state, action) => {
  const { payload } = action;
  const { personnelId, prevGroupId, nextGroupId } = payload;
  const prevGroup = state[prevGroupId];
  const nextGroup = state[nextGroupId];

  return {
    ...state,
    [prevGroupId]: {
      ...prevGroup,
      personnel: prevGroup.personnel.filter(currId => currId !== personnelId)
    },
    [nextGroupId]: {
      ...nextGroup,
      personnel: nextGroup.personnel.concat(personnelId)
    }
  };
};

export default combineReducers({
  byId: groupsById,
  allIds: groupIds
});
