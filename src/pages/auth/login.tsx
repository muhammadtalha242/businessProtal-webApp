import { useNavigate } from 'react-router';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Divider } from 'antd';

import AuthForm from '../../components/common/auth-form';

import { IField } from '../../components/common/auth-form';
import { VerticalSpace } from '../../components/common/space';
import { success } from '../../components/common/message';

import userService from '../../services/users';
import { UserContext, setUser } from '../../context/user.context';
import { AuthContext, setAuthToken } from '../../context/auth.context';

import { ROCK_BLUE } from '../../styles/colors';
import { LoginFormContainer } from '../../components/container';

import ReCAPTCHACheck from '../../components/common/recaptch-check';

interface Props {}

export interface ILoginSubmitParams {
  email: string;
  password: string;
}

const fields: IField[] = [
  {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    name: 'email',
    defaultValue: '',
  },
  {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    name: 'password',
    defaultValue: '',
    link: '/reset-password',
    linkLabel: 'Forgot password?',
    activeIcon: '/images/icons/show.svg',
    deactiveIcon: '/images/icons/hide.svg',
  },
];

const Login: React.FC<Props> = (props) => {
  const { dispatch: userDispatch } = useContext(UserContext);
  const { dispatch: authDispatch } = useContext(AuthContext);

  const [err, setErr] = useState({});
  const history = useNavigate();
  const onSubmit = async ({ email, password }: ILoginSubmitParams) => {
    if (!email || !password) {
      setErr({
        isError: true,
        description: 'All fields are required to be filled',
        code: 'fields_required',
      });
    } else {
      try {
        const data = await userService.login({
          email,
          password,
        });

        setUser(userDispatch)({  ...data.user });
        setAuthToken(authDispatch)({ isAuthenticated: true, accessToken: data.accessToken });
        success(data.message);
        const nextPath = data.user.isPasswordUpdated ? (data.user.isCheckReq ? '/verify-account' : `/`) : `/new-password`;
        history(nextPath);
      } catch (e: any) {
        const { data } = e.response;
        if (data) setErr({ message: data.message, isError: true });
      }
    }
  };

  return (
    <LoginFormContainer>
      <AuthForm heading="Log in to your account" subHeading="Enter your work email address" fields={fields} buttonText="Next" onSubmit={onSubmit} err={err} setErr={setErr}>
        <VerticalSpace height={32} />
        <ReCAPTCHACheck />
        <Divider>Or Sign In with</Divider>
        <VerticalSpace height={32} />
        <div className="social-login-component">
          <button className="social-login-button">
            <img src="https://cdn.monday.com/images/logo_google_v2.svg" alt="log-in-google" />
            <div className="g-signin2" data-onsuccess="onSignIn">
              Sign IN
            </div>
          </button>
        </div>
        <div>
          <VerticalSpace height={32} />
          New on Protal?{' '}
          <Link to="/register" style={{ color: ROCK_BLUE }}>
            Create an account
          </Link>
        </div>
      </AuthForm>
    </LoginFormContainer>
  );
};

export default Login;
