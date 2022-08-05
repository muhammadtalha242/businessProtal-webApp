import React, { useEffect, useState } from 'react';

import entity from '../../services/entity';
import { BLUE_TERTIARY, WHITE } from '../../styles/colors';
import { FilledButton } from '../common/button';
import DashboardHeader from '../common/dashboard-header';
import { EntityComponenetContainer } from './container';
import EntityForm, { IEntity } from './form';
import EntityListHeader from './entity-listHeader';
import EntityList from './entity-list';

interface props {}

const Entity: React.FC<props> = (props) => {
  const [entities, setEntities] = useState<IEntity[]>();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const getAllEntities = async () => {
      const res = await entity.getEntities();
      console.log('res', res);
      setEntities(res.entities);
    };
    getAllEntities();
    console.log('i fire once');
  }, []);
  return (
    <EntityComponenetContainer>
      <DashboardHeader title="Enitiy">
        <FilledButton width="164px" height="32px" background={BLUE_TERTIARY} color={WHITE} font="14px" onClick={() => setShowForm(!showForm)}>
          <img src="/images/icons/add.svg" alt="add" /> Add New Entity
        </FilledButton>
      </DashboardHeader>

      {showForm && <EntityForm setShowForm={setShowForm} />}
      <EntityListHeader />
      {entities && <EntityList entities={entities} />}
    </EntityComponenetContainer>
  );
};

export default Entity;
