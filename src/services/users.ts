import axios, { setHeaders } from '../singletons/axios';
import REACT_APP_API_URL from '../constants/api';
import { IUser } from '../components/Administration/users';
import { ILoginSubmitParams } from '../pages/auth/login';

const getUsers = async () => {
  const res = await axios.get(`${REACT_APP_API_URL}/users`);
  return res.data;
};

const setUser = async (user: IUser) => {
  const res = await axios.post(`${REACT_APP_API_URL}/user/register`, user);
  return res.data;
};

const login = async ({ email, password }: ILoginSubmitParams) => {
  const res = await axios.post(`${REACT_APP_API_URL}/user/login`, { username: email, password });
  setHeaders(res.data.accessToken);
  return res.data;
};

const exports = {
  getUsers,
  setUser,
  login,
};

export default exports;
