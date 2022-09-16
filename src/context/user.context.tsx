import React, { createContext, useReducer } from 'react';

interface IState {
  name: string;
  email: string;
  accessToken: string;
  id?: number
}

type ISetUserParams = {
  name: string;
  email: string;
  accessToken: string;
};

export const initialState: IState = {
  name: '',
  email: '',
  accessToken: '',
};

type IAction = {
  type: string;
  payload?: any;
};

const ACTION_TYPES = {
  SET_USER: 'SET_USER',
};

const userReducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case ACTION_TYPES.SET_USER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export const setUser = (dispatch: React.Dispatch<IAction> | undefined) => (params: ISetUserParams) => {
  if (dispatch) dispatch({ type: ACTION_TYPES.SET_USER, payload: { ...params } });
};


const Context = () => {
  const UserContext = createContext<{ state: IState; dispatch?: React.Dispatch<IAction> }>(null!);
  const Provider = ({ children }: { children: any }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
  };
  return { UserContext, Provider };
};

export const { UserContext, Provider } = Context();
