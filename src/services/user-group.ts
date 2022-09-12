import axios from '../singletons/axios';
import REACT_APP_API_URL from '../constants/api';
import { IUserGroup } from '../components/Administration/user-group';

const getUserGroups = async () => {
  const res = await axios.get(`${REACT_APP_API_URL}/usergroup`);
  return res.data;
};

const setUserGroup = async (usergroup: IUserGroup) => {
  const res = await axios.post(`${REACT_APP_API_URL}/usergroup`, usergroup);
  return res.data;
};

const editUserGroup = async (usergroup: IUserGroup, userGroupId: number) => {
  const res = await axios.put(`${REACT_APP_API_URL}/usergroup/${userGroupId}`, usergroup);
  return res.data;
};

const deleteUserGroup = async (userGroupId: number) => {
  const res = await axios.delete(`${REACT_APP_API_URL}/usergroup/${userGroupId}`);
  return res.data;
};

const exports = {
  getUserGroups,
  setUserGroup,
  editUserGroup,
  deleteUserGroup,
};

export default exports;
