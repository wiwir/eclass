import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import spotifyApp from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = createStore(
  spotifyApp,
  composeEnhancers(applyMiddleware(thunk))
);
