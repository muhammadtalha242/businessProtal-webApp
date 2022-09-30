import React, { createContext, useReducer } from 'react';
import { IEntity, defaultEntityValues } from '../components/Entity/form';

interface IState {
  allEntities: IEntity[];
  selectEntity: IEntity;
}

const initialState: IState = {
  allEntities: [],
  selectEntity: {...defaultEntityValues},
};

type IActions = {
  payload: any;
  type: string;
};

const ACTION_TYPES = {
  SET_ENTITY: 'SET_ENTITY',
  SET_ALL_ENTITIES: 'SET_ALL_ENTITIES',
  UPDATE_ENTITY_PERMISSIONS: 'UPDATE_ENTITY_PERMISSIONS',
};

const entityReducer = (state: IState, action: IActions): IState => {
  switch (action.type) {
    case ACTION_TYPES.SET_ENTITY:
      return {
        ...state,
        selectEntity: { ...action.payload },
      };
    case ACTION_TYPES.SET_ALL_ENTITIES:
      return {
        ...state,
        allEntities: [...action.payload],
      };

    case ACTION_TYPES.UPDATE_ENTITY_PERMISSIONS:
      return {
        ...state,
        selectEntity: { ...action.payload },
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const setEntity = (dispatch: React.Dispatch<IActions> | undefined) => (entity: IEntity) => {
  if (dispatch) dispatch({ type: ACTION_TYPES.SET_ENTITY, payload: entity });
};

export const setAllEntities = (dispatch: React.Dispatch<IActions> | undefined) => (entiteis: IEntity[]) => {
  if (dispatch) dispatch({ type: ACTION_TYPES.SET_ALL_ENTITIES, payload: entiteis });
};

export const updateEntityPermissions = (dispatch: React.Dispatch<IActions> | undefined) => (entity: IEntity) => {
  if (dispatch) dispatch({ type: ACTION_TYPES.UPDATE_ENTITY_PERMISSIONS, payload: entity });
};

const Context = () => {
  const EntityContext = createContext<{ state: IState; dispatch?: React.Dispatch<IActions> }>(null!);
  const Provider = ({ children }: { children: any }) => {
    const [state, dispatch] = useReducer(entityReducer, initialState);
    return <EntityContext.Provider value={{ state, dispatch }}>{children}</EntityContext.Provider>;
  };

  return { EntityContext, Provider };
};

export const { EntityContext, Provider } = Context();
