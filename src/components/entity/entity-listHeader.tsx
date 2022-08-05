import React from 'react';
import { EntityListHeaderContainer } from './container';

interface props {}

const EntityListHeader: React.FC<props> = (props) => {
  return <EntityListHeaderContainer>
    <div className="checkbox"/>
    <div className="name">Name</div>
    <div className="description">description</div>
    <div className="actions">Actions</div>
  </EntityListHeaderContainer>;
};
export default EntityListHeader;
