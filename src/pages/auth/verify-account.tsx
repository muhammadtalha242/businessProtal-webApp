import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

import { error, success } from '../../components/common/message';
import { VerticalSpace } from '../../components/common/space';
import AuthForm from '../../components/common/auth-form';
import { GREEN_PRIMARY } from '../../styles/colors';
import { UserContext, setUser } from '../../context/user.context';
import userService from '../../services/users';

interface IMatchParams {
  email: string;
}

const VerifyAccount: React.FC<IMatchParams> = (props) => {
  const { dispatch: userDispatch, state: userState } = useContext(UserContext);
  const [err, setErr] = useState({});
  const history = useNavigate();
  const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      sendVerficationCode();
    }
    return () => {
      effectRan.current = true;
    };
  }, []);

  const sendVerficationCode = async () => {
    try {
      if (userState.email) {
        const res = await userService.sendVerificationCode(userState.email);
        success(res.message);
      }
    } catch (e: any) {
      error(e.message || 'Error');
    }
  };

  const onSubmit = async (values: { [key: string]: string }) => {
    let code = '';
    Object.keys(values).map((key) => (code += values[key]));
    try {
      if (userState.email) {
        const data = await userService.verifyAccount({ email: userState.email, code: parseInt(code) });
        setUser(userDispatch)({ accessToken: data.accessToken, ...data.user });
        success(data.message);
        history('/');
      }
    } catch (e: any) {
      setErr({ ...e.response.data });
    }
  };
  return (
    <AuthForm
      heading="Autenticate your account"
      buttonText="Confirm"
      subHeading={
        <>
          <div>Please confirm your account</div>
          <div>by entering the authorisation code sent to</div>
          <div className="green">{userState.email}</div>
        </>
      }
      onSubmit={onSubmit}
      isVerifyAccount
      err={err}
      setErr={setErr}
    >
      <>
        <VerticalSpace height={32} />
        <div>It may take a minute to receive the code.</div>
        <VerticalSpace height={7} />
        <div>
          Haven't received it? <span style={{ color: GREEN_PRIMARY }}>Resend a new code</span>
        </div>
      </>
    </AuthForm>
  );
};

export default VerifyAccount;
