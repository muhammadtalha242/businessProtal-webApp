import React, { useEffect, useState } from 'react';
import { Alert, Col, Row } from 'antd';

import UserGroupServices from '../../services/user-group';
import UsersServices from '../../services/users';
import { UserGroupContainer, UserGroupDataRowsContainer, UserGroupFormContainer, UserGroupHeaderContainer, UserGroupListContainer } from './container';
import CustomCheckbox from '../common/checkbox';
import { FilledButton, LinkButton } from '../common/button';
import { BLUE_TERTIARY, WHITE } from '../../styles/colors';
import Status from '../common/status';
import { HorizontalSpace, VerticalSpace } from '../common/space';
import CustomModal from '../common/modal';
import InputField from '../common/input-field';
import { error, success } from '../common/message';
import { IUserGroup } from './user-group';
import SelectField, { IOptionType } from '../common/select';
import { COUNTRIES_NAME_LIST } from '../../constants/countires';

interface props {}

export interface IUser {
  id?: number;
  email: string;
  password: string;
  name: string;
  country: string;
  userGroupId: string;
  isActive: boolean;
  isCheckReq: boolean;
  isPasswordUpdated: boolean;
  userGroup?: IUserGroup;
}

interface IUserGroupDataRowProps extends IUser {
  onEdit: () => void;
  onDelete: () => void;
}

export const defaultUser: IUser = {
  name: '',
  password: '',
  email: '',
  country: '',
  userGroupId: '',
  isActive: true,
  isCheckReq: true,
  isPasswordUpdated: true,
};

const UserGroupHeader = () => {
  return (
    <UserGroupHeaderContainer>
      <Row align={'middle'} gutter={[8, 24]} justify="space-around">
        <Col span={5}>Name</Col>
        <Col span={5}>Email</Col>
        <Col span={4}>
          <div>Country</div>
        </Col>
        <Col span={4}>
          <div>User Group</div>
        </Col>
        <Col span={2}>
          <div>Active</div>
        </Col>
        <Col span={2}>
          <div>2Factor Auth</div>
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
        <Col span={5}>{props.name}</Col>
        <Col span={5}>{props.email}</Col>
        <Col span={4}>{props.country}</Col>
        <Col span={4}>{props.userGroup?.name}</Col>
        <Col span={2}>
          <CustomCheckbox value={props.isActive} name="isActive" />
        </Col>
        <Col span={2}>
          <CustomCheckbox value={props.isCheckReq} name="isCheckReq" />
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

const UsersRow: React.FC<props> = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [UserGroups, setUserGroups] = useState<IOptionType[]>([]);
  const [Users, setUsers] = useState<IUser[]>([defaultUser]);
  const [values, setValues] = useState<IUser>({ ...defaultUser });
  const [showForm, setShowForm] = useState(false);
  const [isError, setIsError] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    fetchUserGroups();
    fetchUsers();
  }, [showForm]);

  const fetchUserGroups = async () => {
    try {
      const res = await UserGroupServices.getUserGroups();
      const userGroupOptions: IOptionType[] = res.userGroups.map((userGroup: IUserGroup) => ({ value: userGroup.id, label: userGroup.name }));
      setUserGroups(userGroupOptions);
    } catch (e: any) {}
  };

  const fetchUsers = async () => {
    const res = await UsersServices.getUsers();
    setUsers(res.users);
  };

  const onCancle = () => {
    setShowForm(false);
    setIsEdit(false);
    setValues({ ...defaultUser });
  };

  const onOkay = async () => {
    try {
      const { name, email, isActive, country, userGroupId, password, isCheckReq, isPasswordUpdated } = values;
      if (name && email && country && userGroupId && password) {
        let res;
        if (isEdit && values.id) {
          // res = await UserGroupServices.editUserGroup({ name, email, isActive, country, isPublic }, values.id);
        } else {
          res = await UsersServices.setUser({ name, email, isActive, country, userGroupId, password, isCheckReq, isPasswordUpdated: !isPasswordUpdated });
        }
        await fetchUserGroups();
        await fetchUsers();
        success(res.message);
        setValues({ ...defaultUser });
        setShowForm(false);
        setIsEdit(false);
      } else if (name) {
        setIsError(true);
        setErr('Code is required.');
      } else if (email) {
        setIsError(true);
        setErr('Name is required.');
      } else {
        setIsError(true);
        setErr('Both name and email are required.');
      }
    } catch (e: any) {
      error('Unable to create user group');
      setShowForm(false);
    }
  };

  const onEdit = (index: number) => () => {
    setValues(Users[index]);
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
          <div className="name">Users</div>
          <div className="total-group">{Users.length} Users</div>

          <div className="groups">
            <Status color={false ? 'green' : 'red'} text={true ? 'Actice' : 'InActice'} value={1} />
            <HorizontalSpace width={36} />
            <Status color={true ? 'green' : 'red'} text={false ? 'Actice' : 'InActice'} value={0} />
          </div>
        </div>
        <FilledButton width="164px" height="32px" background={BLUE_TERTIARY} color={WHITE} font="14px" onClick={() => setShowForm(true)}>
          <img src="/images/icons/add.svg" alt="add" /> Add User
        </FilledButton>
      </UserGroupListContainer>
      <CustomModal title="Add User" visible={showForm} width={500} onCancel={onCancle} onOk={onOkay}>
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
          {!isEdit && (
            <InputField type="input" setValue={onInputChange} value={values.password} name="password" label="Password" placeholder="Password" inputFieldContainerProps={{ marginBottom: 8 }} />
          )}
          <InputField type="input" setValue={onInputChange} value={values.email} name="email" label="Email" placeholder="Email" inputFieldContainerProps={{ marginBottom: 16 }} />

          <SelectField options={COUNTRIES_NAME_LIST} value={values.country} setValue={onInputChange} name="country" key="Country" label="Country" placeholder="Country" showSearch filterOption />
          <SelectField options={UserGroups} value={values.userGroupId} setValue={onInputChange} name="userGroupId" key="userGroupId" label="Use Group" placeholder="Use Group" />

          <CustomCheckbox value={values.isActive} setValue={onInputChange} name="isActive">
            Activate
          </CustomCheckbox>
          <CustomCheckbox value={values.isCheckReq} setValue={onInputChange} name="isCheckReq">
            2Factor Auth
          </CustomCheckbox>
          <CustomCheckbox value={values.isPasswordUpdated} setValue={onInputChange} name="isPasswordUpdated">
            Change Password After First login.
          </CustomCheckbox>
        </UserGroupFormContainer>
      </CustomModal>
      {isExpanded && (
        <div>
          <UserGroupHeader />
          {Users.map((user: IUser, index: number) => (
            <UserGroupDataRow {...user} onDelete={onDelete} onEdit={onEdit(index)} key={index} />
          ))}
        </div>
      )}
    </UserGroupContainer>
  );
};

export default UsersRow;
