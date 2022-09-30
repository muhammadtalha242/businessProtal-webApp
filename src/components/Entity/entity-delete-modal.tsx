import React, { useState } from 'react';

import { RED_PRIMARY, WHITE } from '../../styles/colors';
import { FilledButton } from '../common/button';
import InputField from '../common/input-field';
import CustomModal from '../common/modal';
import { VerticalSpace } from '../common/space';

interface props {
  isDelete: boolean;
  setIsDelete: (e: boolean) => void;
  deleteEntityData: { entityId: number; entityName: string };
  onDeleteConfirm: () => void;
}

const EntityDeleteModal: React.FC<props> = ({ isDelete, setIsDelete, deleteEntityData, onDeleteConfirm }) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [showDelete, setShowDelete] = useState(false);

  const onInputChange = ({ name, value }: { name: string; value: string }) => {
    setEnteredValue(value);
    value === deleteEntityData.entityName ? setShowDelete(true) : setShowDelete(false);
  };

  return (
    <CustomModal
      title="Are you absolutely sure?"
      visible={isDelete}
      onCancel={() => setIsDelete(false)}
      width={500}
      footer={
        <>
          <FilledButton width="464px" height="32px" background={RED_PRIMARY} color={WHITE} font="14px" onClick={onDeleteConfirm} disabled={!showDelete}>
            I understand the consequences, delete this entity
          </FilledButton>
        </>
      }
    >
      <>
        This action <b>cannot be</b> undone. This will permanently delete the <b>{deleteEntityData.entityName}</b> Entity, and remove all associations and <b>records</b>.
        <br /> <br />
        Please type <b>{deleteEntityData.entityName}</b> to confirm.
        <br />
        <VerticalSpace height={16} />
        <InputField type="input" setValue={onInputChange} value={enteredValue} name="entityName" inputFieldContainerProps={{ marginBottom: 8 }} />
      </>
    </CustomModal>
  );
};

export default EntityDeleteModal;
