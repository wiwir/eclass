import { combineReducers } from "redux";
import {
  SEARCH_ITEM,
  REQUEST_ITEM,
  RECEIVE_ITEM,
  SAVE_TOKEN
} from "../actions";

const item = (state = "", action) => {
  switch (action.type) {
    case SEARCH_ITEM:
      return action.item;
    default:
      return state;
  }
};

// Saving of the token parsed by url
const token = (state = "", action) => {
  switch (action.type) {
    case SAVE_TOKEN:
      return action.token;
    default:
      return state;
  }
};

const itemData = (
  state = {
    isFetching: false,
    items: []
  },
  action
) => {
  switch (action.type) {
    case REQUEST_ITEM:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_ITEM:
      return {
        ...state,
        isFetching: false,
        items: action.itemData
      };
    default:
      return state;
  }
};

const spotifyApp = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_ITEM:
    case RECEIVE_ITEM:
      return {
        ...state,
        [action.item]: itemData(state[action.item], action)
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  spotifyApp,
  item,
  token
});

export default rootReducer;
