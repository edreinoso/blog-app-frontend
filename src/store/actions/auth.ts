import { StateAction, User } from "@types";

export const LOGOUT = "LOGOUT";
export const LOGIN = "LOGIN";

export function login({ user }: { user: User }): StateAction {
  return { type: LOGIN, payload: { user } };
}

export function logout(): StateAction {
  return { type: LOGOUT };
}
