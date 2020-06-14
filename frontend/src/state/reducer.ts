import { LoggedUser } from "../../../backend/src/types";
import { State } from "./state";
import userService from "../services/userService";

export type Action =
  | {
      type: "SET_USER";
      payload: LoggedUser | null;
    };

export const logout = (): Action => {
  userService.logout();
  return {
    type: "SET_USER",
    payload: null
  };
};

export const login = (user: LoggedUser | null): Action => {
  return {
    type: "SET_USER",
    payload: user
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};