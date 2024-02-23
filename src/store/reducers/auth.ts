import { AuthState, StateAction } from "@types";
import { LOGIN, LOGOUT } from "../actions/auth";

export const defaultAuthState: AuthState = {
  isAuthenticated: false,
  user: undefined,
};

export default function authReducer(
  state: AuthState = defaultAuthState,
  action: StateAction
) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: undefined,
      };

    default:
      return state;
  }
}
