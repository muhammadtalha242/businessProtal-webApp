import React, {  createContext, useReducer } from 'react';

interface IState {
  isAuthenticated: boolean;
  accessToken: string;
}

type IAction = {
  payload: any;
  type: string;
};

const InitialAuthState: IState = {
  isAuthenticated: false,
  accessToken: '',
};

const ACTION_TYPES = {
  SET_AUTH: 'SET_AUTH',
};

const AuthReducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case ACTION_TYPES.SET_AUTH:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        accessToken: action.payload.accessToken,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const setAuthToken =
  (dispatch: React.Dispatch<IAction> | undefined) =>
  ({ isAuthenticated, accessToken }: IState) => {
    if (dispatch) dispatch({ type: ACTION_TYPES.SET_AUTH, payload: { isAuthenticated, accessToken } });
  };

const Context = () => {
  const AuthContext = createContext<{ state: IState; dispatch?: React.Dispatch<IAction> }>(null!);
  const Provider = ({ children }: { children: any }) => {
    const [state, dispatch] = useReducer(AuthReducer, InitialAuthState);
    return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
  };

  return { AuthContext, Provider };
};

export const { AuthContext, Provider } = Context();
