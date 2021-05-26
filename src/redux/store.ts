import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer, { State } from "./reducer";
import { ActionTypes } from "./actions";

const store: Store<State, ActionTypes> = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
