import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

import AuthForm from '../../components/common/auth-form';

import { IField } from '../../components/common/auth-form';
import { VerticalSpace } from '../../components/common/space';
import { GREEN_PRIMARY } from '../../styles/colors';
import { validatePassword } from '../../utils/validate';
import userService from '../../services/users';
import { error, success } from '../../components/common/message';
import { UserContext, setUser } from '../../context/user.context';

interface Props {}

interface INewPassword {
  password: string;
  isPasswordUpdated: boolean;
}

const fields: IField[] = [
  {
    label: 'Create new password',
    type: 'password',
    name: 'password',
    defaultValue: '',
    placeholder: 'Enter your password',
    activeIcon: '/images/icons/show.svg',
    deactiveIcon: '/images/icons/hide.svg',
  },
  {
    label: 'Repeat new password',
    type: 'password',
    placeholder: 'Enter your password',
    name: 'repeatPassword',
    defaultValue: '',
    activeIcon: '/images/icons/show.svg',
    deactiveIcon: '/images/icons/hide.svg',
  },
];

const NewPassword: React.FC<Props> = (props) => {
  const [err, setErr] = useState({});
  const { dispatch: userDispatch, state: userState } = useContext(UserContext);
  const history = useNavigate();
  const onSubmit = async ({ password, repeatPassword }: { password: string; repeatPassword: string }) => {
    if (!password || !repeatPassword) {
      setErr({
        isError: true,
        message: 'All fields are required to be filled',
      });
    } else if (password !== repeatPassword) {
      setErr({
        isError: true,
        message: 'Password not matched',
      });
    } else if (password.length < 8 || !validatePassword(password)) {
      setErr({
        isError: true,
        message: 'Invalid password. At least 8 characters, requires to have lowercase & uppercase letter(s), number(s) and at least one special character.',
      });
    } else {
      try {
        if (userState.email) {
          const res = await userService.updatePassword({ password, email: userState.email });
          success('Password updated.');
          setUser(userDispatch)({ accessToken: res.accessToken, ...res.user });
          const nextPath = res.user.isCheckReq ? '/verify-account' : `/`;
          history(nextPath);
        }
      } catch (e: any) {
        error(e.message || 'Error');
      }
    }
  };

  return (
    <AuthForm heading="Set up new password" fields={fields} buttonText="Set Up" err={err} setErr={setErr} onSubmit={onSubmit}>
      <div>
        <VerticalSpace height={32} />
        Have any questions?{' '}
        <Link to="/login" style={{ color: GREEN_PRIMARY }}>
          Contact support
        </Link>
      </div>
    </AuthForm>
  );
};

export default NewPassword;
