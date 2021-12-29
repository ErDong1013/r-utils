import React, { createContext, useReducer, Dispatch } from 'react';
import { initialState, reducerFunction, Action, ActionTypes, IState } from './reducer';

export { ActionTypes };

interface IProvider {
  children: React.ReactNode;
}

interface IGlobalContext {
  state: IState;
  dispatch: Dispatch<Action>;
}

const GlobalContext = createContext<IGlobalContext>({
  state: initialState,
  dispatch: () => {},
});

const Provider: React.FC<IProvider> = React.memo((props: IProvider) => {
  const [state, dispatch] = useReducer(reducerFunction, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>{props.children}</GlobalContext.Provider>
  );
});

export { Provider, GlobalContext };
