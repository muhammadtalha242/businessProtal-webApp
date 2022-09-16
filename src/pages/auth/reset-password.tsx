import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthForm from '../../components/common/auth-form';
import userService from '../../services/users';
import { useNavigate } from 'react-router';

import { IField } from '../../components/common/auth-form';
import { VerticalSpace } from '../../components/common/space';
import { GREEN_PRIMARY, RED_PRIMARY } from '../../styles/colors';
import { success } from '../../components/common/message';
import { validateEmail } from '../../utils/validate';
import { setUser, UserContext } from '../../context/user.context';

interface Props {}

const fields: IField[] = [
  {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    name: 'email',
    defaultValue: '',
  },
];

const ResetPassword: React.FC<Props> = (props) => {
  const [err, setErr] = useState({});
  const { dispatch: userDispatch, state: userState } = useContext(UserContext);
  const history = useNavigate();

  const onSubmit = async ({ email }: { email: string }) => {
    if (validateEmail(email)) {
      try {
        const res = await userService.resetPassword({
          email,
        });
        success(`${res.message}`);
        setUser(userDispatch)({ ...userState, email });
        setErr({});
        history('/new-password');
      } catch (e: any) {
        if (e.response) {
          const { data } = e.response;
          if (data.isError) setErr({ message: data.message, isError: true });
        } else {
          setErr({ message: e.message, isError: true });
        }
      }
    } else {
      setErr({
        isError: true,
        message: 'Invalid Email Address.',
      });
    }
  };
  return (
    <AuthForm heading="Reset password" subHeading="Enter the email address associated with your account" fields={fields} buttonText="Continue" onSubmit={onSubmit} err={err} setErr={setErr}>
      <div>
        <VerticalSpace height={32} />
        <div>
          New on Business Protal?{' '}
          <Link to="/register" style={{ color: GREEN_PRIMARY }}>
            Create an account
          </Link>
        </div>
        <VerticalSpace height={32} />
        {/* <img src={`/images/icons/arrow-back.svg`} style={{ marginRight: 8 }} alt="back" /> */}
        <Link to="/login" style={{ color: RED_PRIMARY }}>
          Back to login
        </Link>
      </div>
    </AuthForm>
  );
};

export default ResetPassword;
