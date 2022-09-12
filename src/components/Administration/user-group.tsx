import React, { useEffect, useState } from 'react';
import { Alert, Col, Row } from 'antd';

import UserGroupServices from '../../services/user-group';
import { UserGroupContainer, UserGroupDataRowsContainer, UserGroupFormContainer, UserGroupHeaderContainer, UserGroupListContainer } from './container';
import CustomCheckbox from '../common/checkbox';
import { FilledButton, LinkButton } from '../common/button';
import { BLUE_TERTIARY, WHITE } from '../../styles/colors';
import Status from '../common/status';
import { HorizontalSpace, VerticalSpace } from '../common/space';
import CustomModal from '../common/modal';
import InputField from '../common/input-field';
import { error, success } from '../common/message';

interface props {}

export interface IUserGroup {
  id?: number;
  code: string;
  name: string;
  isAdmin: boolean;
  isPublic: boolean;
  isActive: boolean;
}

interface IUserGroupDataRowProps extends IUserGroup {
  onEdit: () => void;
  onDelete: () => void;
}

export const defaultUserGroup: IUserGroup = {
  name: '',
  code: '',
  isAdmin: true,
  isPublic: false,
  isActive: true,
};

const UserGroupHeader = () => {
  return (
    <UserGroupHeaderContainer>
      <Row align={'middle'} gutter={[8, 24]} justify="space-around">
        <Col span={2}>Code</Col>
        <Col span={6}>Name</Col>
        <Col span={2}>
          <div>Admin</div>
        </Col>
        <Col span={2}>
          <div>Public</div>
        </Col>
        <Col span={2}>
          <div>Active</div>
        </Col>
        <Col span={1}>
          <div>Edit</div>
        </Col>
        <Col span={1}>
          <div>Delete</div>
        </Col>
      </Row>
    </UserGroupHeaderContainer>
  );
};

const UserGroupDataRow: React.FC<IUserGroupDataRowProps> = (props) => {
  return (
    <UserGroupDataRowsContainer>
      <Row align={'middle'} gutter={[8, 24]} justify="space-around">
        <Col span={2}>{props.code}</Col>
        <Col span={6}>{props.name}</Col>
        <Col span={2}>
          <CustomCheckbox value={props.isAdmin} name="isAdmin" />
        </Col>
        <Col span={2}>
          <CustomCheckbox value={props.isPublic} name="isPublic" />
        </Col>
        <Col span={2}>
          <CustomCheckbox value={props.isActive} name="isActive" />
        </Col>
        <Col span={1}>
          <LinkButton type="link" onClick={() => props.onEdit()}>
            Edit
          </LinkButton>
        </Col>
        <Col span={1}>
          <LinkButton type="link" onClick={() => props.onDelete()}>
            Delete
          </LinkButton>
        </Col>
      </Row>
    </UserGroupDataRowsContainer>
  );
};

const UserGroup: React.FC<props> = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [UserGroups, setUserGroups] = useState<IUserGroup[]>([defaultUserGroup]);
  const [values, setValues] = useState<IUserGroup>({ ...defaultUserGroup });
  const [showForm, setShowForm] = useState(false);
  const [isError, setIsError] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    fetchUserGroups();
  }, []);

  const fetchUserGroups = async () => {
    const res = await UserGroupServices.getUserGroups();
    setUserGroups(res.userGroups);
  };

  const onCancle = () => {
    setShowForm(false);
    setIsEdit(false);
    setValues({ ...defaultUserGroup });
  };

  const onOkay = async () => {
    try {
      const { name, code, isActive, isAdmin, isPublic } = values;
      if (name && code) {
        let res;
        if (isEdit && values.id) {
          res = await UserGroupServices.editUserGroup({ name, code, isActive, isAdmin, isPublic }, values.id);
        } else {
          res = await UserGroupServices.setUserGroup({ name, code, isActive, isAdmin, isPublic });
        }
        await fetchUserGroups();
        success(res.message);
        setValues({ ...defaultUserGroup });
        setShowForm(false);
        setIsEdit(false);
      } else if (name) {
        setIsError(true);
        setErr('Code is required.');
      } else if (code) {
        setIsError(true);
        setErr('Name is required.');
      } else {
        setIsError(true);
        setErr('Both name and code are required.');
      }
    } catch (e: any) {
      error('Unable to create user group');
      setShowForm(false);
    }
  };

  const onEdit = (index: number) => () => {
    setValues(UserGroups[index]);
    setShowForm(true);
    setIsEdit(true);
  };

  const onDelete = async () => {
    try {
      if (values.id) {
        const res = await UserGroupServices.deleteUserGroup(values.id);
        success(res.message);
      }
    } catch (e: any) {
      error('Unable to create user group');
    }
  };

  const onInputChange = ({ name, value }: { name: string; value: string }) => {
    const udpateValues: any = { ...values };
    udpateValues[name] = value;
    setValues({ ...udpateValues });
  };

  return (
    <UserGroupContainer>
      <UserGroupListContainer>
        <div className="flex" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="name">User Group</div>
          <div className="total-group">{UserGroups.length} Groups</div>

          <div className="groups">
            <Status color={false ? 'green' : 'red'} text={true ? 'Actice' : 'InActice'} value={1} />
            <HorizontalSpace width={36} />
            <Status color={true ? 'green' : 'red'} text={false ? 'Actice' : 'InActice'} value={0} />
          </div>
        </div>
        <FilledButton width="164px" height="32px" background={BLUE_TERTIARY} color={WHITE} font="14px" onClick={() => setShowForm(true)}>
          <img src="/images/icons/add.svg" alt="add" /> Add User Group
        </FilledButton>
      </UserGroupListContainer>
      <CustomModal title="Add user group" visible={showForm} width={500} onCancel={onCancle} onOk={onOkay}>
        {isError && (
          <>
            <Alert
              style={{ borderRadius: 16, textAlign: 'left' }}
              message="Error"
              description={<div>{err}</div>}
              type="error"
              onClose={() => {
                setErr('');
                setIsError(false);
              }}
              closable
            />
            <VerticalSpace height={32} />
          </>
        )}
        <UserGroupFormContainer>
          <InputField type="input" setValue={onInputChange} value={values.name} name="name" label="Name" placeholder="Name" inputFieldContainerProps={{ marginBottom: 8 }} />
          <InputField type="input" setValue={onInputChange} value={values.code} name="code" label="Code" placeholder="Code" inputFieldContainerProps={{ marginBottom: 16 }} />
          <CustomCheckbox value={values.isAdmin} setValue={onInputChange} name="isAdmin">
            Administration
          </CustomCheckbox>
          <CustomCheckbox value={values.isPublic} setValue={onInputChange} name="isPublic">
            Public
          </CustomCheckbox>
          <CustomCheckbox value={values.isActive} setValue={onInputChange} name="isActive">
            Activate
          </CustomCheckbox>
        </UserGroupFormContainer>
      </CustomModal>
      {isExpanded && (
        <div>
          <UserGroupHeader />
          {UserGroups.map((userGroup: IUserGroup, index: number) => (
            <UserGroupDataRow {...userGroup} onDelete={onDelete} onEdit={onEdit(index)} key={index} />
          ))}
        </div>
      )}
    </UserGroupContainer>
  );
};

export default UserGroup;
