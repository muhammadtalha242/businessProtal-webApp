import React, { useContext, useEffect, useState } from 'react';

import entityService from '../../services/entity';
import { BLUE_TERTIARY, WHITE } from '../../styles/colors';
import { FilledButton } from '../common/button';
import DashboardHeader from '../common/dashboard-header';
import { EntityComponenetContainer } from './container';
import EntityForm, { IEditEntity, IEntity } from './form';
import EntityList from './entity-list';
import { logger } from '../../utils/logger';
import { defaultEntityValues, EntityContext, setAllEntities } from '../../context/entity.context';
import { UserContext } from '../../context/user.context';
import { USER_GROUP_MAP } from '../../constants/userGroups';
import EntityDeleteModal from './entity-delete-modal';

interface props {}

const Entity: React.FC<props> = (props) => {
  const [entitiesData, setEntities] = useState<IEntity[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [editEntiy, setEditEntity] = useState<IEntity>(defaultEntityValues);
  const [isView, setIsView] = useState(false);
  const [viewEntiy, setViewEntity] = useState<IEntity>(defaultEntityValues);
  const [deleteEntityData, setDeleteEntityData] = useState({ entityName: '', entityId: -1 });

  const { dispatch: EntityDispatch } = useContext(EntityContext);
  const { state: userState } = useContext(UserContext);

  useEffect(() => {
    const fetchData = () => {
      FetchEntities();
    };
    fetchData();
  }, []);

  const FetchEntities = async () => {
    try {
      const res = await entityService.getEntities();
      setAllEntities(EntityDispatch)(res.entities);
      setEntities(res.entities);
    } catch (error) {
      logger.error(error);
    }
  };

  const onSave = async (entity: IEntity) => {
    try {
      const res = await entityService.createEntities(entity);
      setEntities(res.entities);
      FetchEntities();
      setShowForm(false);
      setIsEdit(false);
    } catch (e: any) {
      logger.error(e);
    }
  };

  const onUpdate = async (updatedEntity: IEditEntity) => {
    try {
      await entityService.updateEntity(updatedEntity.entity.databaseName, updatedEntity);
      FetchEntities();
      setShowForm(false);
      setIsEdit(false);
    } catch (err: any) {
      logger.error(err);
    }
  };

  const onEdit = (entity: IEntity) => {
    setIsEdit(true);
    setEditEntity({ ...entity });
    setShowForm(true);
  };

  const onView = (entity: IEntity) => {
    setIsView(true);
    setViewEntity(entity);
  };


  const onDelete = async (entityId: number, entityName: string) => {
    try {
      setIsDelete(true);
      setDeleteEntityData({ entityId, entityName });
    } catch (err: any) {
      logger.error(err);
      setIsDelete(false);
    }
  };

  const onDeleteConfirm = async () => {
    try {
      await entityService.deleteEntity(deleteEntityData.entityId);
      FetchEntities();
      setIsDelete(false);
      setShowForm(false);
    } catch (err: any) {
      logger.error(err);

      setIsDelete(false);
    }
  };

  return (
    <EntityComponenetContainer>
      <DashboardHeader title="Entity">
        {userState.userGroupCodes?.includes(USER_GROUP_MAP.SYSTEM_ADMIN) && (
          <FilledButton width="164px" height="32px" background={BLUE_TERTIARY} color={WHITE} font="14px" onClick={() => setShowForm(!showForm)}>
            <img src="/images/icons/add.svg" alt="add" /> Add New Entity
          </FilledButton>
        )}
      </DashboardHeader>

      {showForm && <EntityForm setShowForm={setShowForm} onSave={onSave} onUpdate={onUpdate} isEdit={isEdit} editEntity={editEntiy} setIsEdit={setIsEdit} onDelete={onDelete} />}
      {isDelete && <EntityDeleteModal isDelete={isDelete} setIsDelete={setIsDelete} deleteEntityData={deleteEntityData} onDeleteConfirm={onDeleteConfirm} />}

      {entitiesData && entitiesData.length > 0 && <EntityList entities={entitiesData} onEdit={onEdit} onView={onView} />}
    </EntityComponenetContainer>
  );
};

export default Entity;
