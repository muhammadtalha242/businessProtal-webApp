import React, { useEffect, useState } from 'react';

import entityService from '../../services/entity';
import { BLUE_TERTIARY, WHITE } from '../../styles/colors';
import { FilledButton } from '../common/button';
import DashboardHeader from '../common/dashboard-header';
import { EntityComponenetContainer } from './container';
import EntityForm, { defaultEntityValues, IEditEntity, IEntity } from './form';
import EntityList from './entity-list';

interface props {}

const Entity: React.FC<props> = (props) => {
  const [entitiesData, setEntities] = useState<IEntity[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editEntiy, setEditEntity] = useState<IEntity>(defaultEntityValues);
  const [isView, setIsView] = useState(false);
  const [viewEntiy, setViewEntity] = useState<IEntity>(defaultEntityValues);

  useEffect(() => {
    const fetchData = () => {
      FetchEntities();
    };
    fetchData();
  }, []);
  const currentProps: any = { ...props };
  console.log(
    'currentProps:',
    currentProps.onSidebarItemUpdate({
      key: '/entity',
      label: 'Entity',
      link: '/entity',
    })
  );

  const FetchEntities = async () => {
    try {
      const res = await entityService.getEntities();
      setEntities(res.entities);
    } catch (error) {
      console.log(error);
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
      console.log(e);
    }
  };

  const onUpdate = async (updatedEntity: IEditEntity) => {
    try {
      await entityService.updateEntity(updatedEntity.entity.databaseName, updatedEntity);
      FetchEntities();
      setShowForm(false);
      setIsEdit(false);
    } catch (err: any) {
      console.log(err);
    }
  };

  const onEdit = (entity: IEntity) => {
    setIsEdit(true);
    setEditEntity({...entity});
    setShowForm(true);
  };

  const onView = (entity: IEntity) => {
    setIsView(true);
    setViewEntity(entity);
  };

  const onDelete = async (entityId: number) => {
    try {
      await entityService.deleteEntity(entityId);
      FetchEntities();
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <EntityComponenetContainer>
      <DashboardHeader title="Entity">
        {!isView && (
          <FilledButton width="164px" height="32px" background={BLUE_TERTIARY} color={WHITE} font="14px" onClick={() => setShowForm(!showForm)}>
            <img src="/images/icons/add.svg" alt="add" /> Add New Entity
          </FilledButton>
        )}
      </DashboardHeader>

      {showForm && <EntityForm setShowForm={setShowForm} onSave={onSave} onUpdate={onUpdate} isEdit={isEdit} editEntity={editEntiy} setIsEdit={setIsEdit} />}
      {entitiesData && entitiesData.length !== 0 && <EntityList entities={entitiesData} onEdit={onEdit} onView={onView} onDelete={onDelete}/>}
    </EntityComponenetContainer>
  );
};

export default Entity;