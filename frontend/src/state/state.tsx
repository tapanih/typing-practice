import React from 'react';
import { LoggedUser } from '../../../backend/src/types';
import { Action } from './reducer';

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