import axios, { setHeaders } from '../singletons/axios';
import REACT_APP_API_URL from '../constants/api';
import { IUser } from '../components/Administration/users';
import { ILoginSubmitParams } from '../pages/auth/login';

export interface IVerifyAccountRequest {
  code: number;
  email: string;
}

export interface IPasswordUpdateRequest {
  password: string;
  email: string;
}

const setUser = async (user: IUser) => {
  const res = await axios.post(`${REACT_APP_API_URL}/auth/register`, user);
  return res.data;
};

const login = async ({ email, password }: ILoginSubmitParams) => {
  const res = await axios.post(`${REACT_APP_API_URL}/auth/login`, { username: email, password });
  setHeaders(res.data.accessToken);
  return res.data;
};

const sendVerificationCode = async (email: string) => {
  const res = await axios.post(`${REACT_APP_API_URL}/auth/send_verification_code`, { email });
  return res.data;
};

const verifyAccount = async ({ email, code }: IVerifyAccountRequest) => {
  const res = await axios.post(`${REACT_APP_API_URL}/auth/verify_account`, { email, code });
  return res.data;
};

const resetPassword = async ({ email }: { email: string }) => {
  const res = await axios.post(`${REACT_APP_API_URL}/auth/rest_password`, { email });
  return res.data;
};

const updatePassword = async ({ email, password }: IPasswordUpdateRequest) => {
  const res = await axios.post(`${REACT_APP_API_URL}/auth/update_password`, { email, password });
  return res.data;
};

const getUsers = async () => {
  const res = await axios.get(`${REACT_APP_API_URL}/user`);
  return res.data;
};

async function update<updateType>(user: updateType, userId: number) {
  const res = await axios.put(`${REACT_APP_API_URL}/user/${userId}`, user);
  return res.data;
}

const exports = {
  getUsers,
  setUser,
  login,
  update,
  verifyAccount,
  sendVerificationCode,
  resetPassword,
  updatePassword
};

export default exports;
