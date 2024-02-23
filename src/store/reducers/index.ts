import { combineReducers, Reducer } from "redux";
import { ApplicationState, StateAction } from "../../types";
import { LOGOUT } from "../actions/auth";
import { STORE_VERSION } from "../config";
import authReducer, { defaultAuthState } from "./auth";

const reducers = combineReducers<ApplicationState>({
  auth: authReducer,
});

const defaultState: ApplicationState = {
  auth: defaultAuthState,
};

const rootReducer: Reducer<ApplicationState> = (
  state: ApplicationState | undefined,
  action: StateAction
): ApplicationState => {
  if (action.type === LOGOUT) {
    localStorage.removeItem(`persist:root_${STORE_VERSION}`);
    return reducers(defaultState, action); // eslint-disable-line
  }
  return reducers(state, action);
};

export default rootReducer;
