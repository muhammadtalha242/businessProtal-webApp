import React, { createContext, useReducer } from 'react';

import { defaultUserGroup, IUserGroup } from '../components/Administration/user-group';

interface IState {
  allUserGruops: IUserGroup[];
}

type ISetUserGroupParams = {
  id?: number;
  name: string;
  code: string;
  isActive: boolean;
};

export const initialState: IState = {
  allUserGruops: [{ ...defaultUserGroup }],
};

type IAction = {
  type: string;
  payload?: any;
};

const ACTION_TYPES = {
  SET_USER_GROUPS: 'SET_USER_GROUPS',
};

const userGroupReducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case ACTION_TYPES.SET_USER_GROUPS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const setUserGroups = (dispatch: React.Dispatch<IAction> | undefined) => (params: ISetUserGroupParams[]) => {
  if (dispatch) dispatch({ type: ACTION_TYPES.SET_USER_GROUPS, payload: { ...params } });
};

const Context = () => {
  const UserGroupContext = createContext<{ state: IState; dispatch?: React.Dispatch<IAction> }>(null!);
  const Provider = ({ children }: { children: any }) => {
    const [state, dispatch] = useReducer(userGroupReducer, initialState);

    return <UserGroupContext.Provider value={{ state, dispatch }}>{children}</UserGroupContext.Provider>;
  };
  return { UserGroupContext, Provider };
};

export const { UserGroupContext, Provider } = Context();
