import React from 'react';
import { LoggedUser } from '../../../backend/src/types';
import userService from '../services/userService';

export interface State {
  user: LoggedUser | null;
}

const initialState: State = {
  user: null,
}

const Context = React.createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

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

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  );
};

export const useStateValue = () => React.useContext(Context);