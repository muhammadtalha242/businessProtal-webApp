import React from 'react';
import { EntityItemContainer } from './container';
import Checkbox from '../common/checkbox';
import { IEntity } from './form';

interface props {
  entity: IEntity;
  key: number;
}

const EntityItem: React.FC<props> = (props) => {
  return (
    <EntityItemContainer key={props.key}>
      <div className="flex">
        <div className="check-box">
          <Checkbox />
        </div>

        <div className="name">{props.entity.name}</div>

        <div className="description">{props.entity.description}</div>
        <div className="actions">ACTIONS</div>
        {/* <Popover placement="bottomRight" content={content} trigger="hover">
    <span className="icon-dots">
      <img src={`/images/icons/dots.svg`} alt="click" />
    </span>
  </Popover> */}
      </div>
    </EntityItemContainer>
  );
};

export default EntityItem;
