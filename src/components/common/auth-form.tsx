import React, { useEffect, useState } from "react";
import { Alert } from "antd";
import * as _ from "lodash";

import { BLUE_TERTIARY, GREEN_PRIMARY, WHITE } from "../../styles/colors";

import { AuthFormContainer } from "../container";
import { FilledButton } from "./button";
import InputField from "./input-field";
import { VerticalSpace } from "./space";
import { VERIFY_ACCOUNT_CODE_LENGTH } from "../../constants";
import errors from "../../constants/errors";
import { success, error } from "./message";

interface IKeyable {
  [key: string]: any;
}

interface Props {
  heading: string;
  buttonText: string;
  subHeading?: string | React.ReactNode;
  fields?: IField[];
  isVerifyAccount?: boolean;
  onSubmit?: Function;
  err?: any;
  setErr?: Function;
  children: React.ReactNode;
}

interface ISetValueParams {
  name: string;
  value: any;
}

interface ISetVerifyInputValueParams {
  key: string;
}

export interface IField {
  label: string;
  type: string;
  placeholder: string;
  name: string;
  defaultValue: any;
  link?: string;
  linkLabel?: string;
  activeIcon?: string;
  deactiveIcon?: string;
}

const Error: React.FC<{ err: any | undefined }> = ({ err }) => {
  if (err.code === errors.INVALID_PASSWORD.code) {
    let policy = err.policy ? err.policy.split("\n") : null;
    return (
      <div>{policy && policy.map((policy: string) => <div>{policy}</div>)}</div>
    );
  } else if (err.code === errors.INVALID_SIGNUP.code) {
    return <div>Account with email already exists</div>;
  } else if (err.code === errors.FIELDS_REQUIRED.code) {
    return <div>{err.description}</div>;
  } else {
    return <div>{err.message}</div>;
  }
};

const AuthForm: React.FC<Props> = ({
  fields,
  heading,
  subHeading,
  buttonText,
  children,
  onSubmit,
  isVerifyAccount,
  err,
  setErr,
}) => {
  const [state, setState] = useState<IKeyable>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setValues = () => {
      let state: { [key: string]: any } = {};
      if (isVerifyAccount) {
        for (let i = 0; i < VERIFY_ACCOUNT_CODE_LENGTH; i++) {
          state[i] = null;
        }
      } else if (fields) {
        fields.forEach((field) => {
          state[field.name] = field.defaultValue;
        });
      }
      setState(state);
    };
    setValues();
  }, [fields, isVerifyAccount]);

  const setInputValue = ({ name, value }: ISetValueParams) => {
    const updateState = { ...state };
    updateState[name] = value;
    setState(updateState);
  };

  const setVerifyInputValue =
    ({ key }: ISetVerifyInputValueParams) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const updateState = { ...state };
      updateState[key] = (e.target as HTMLInputElement).value;
      const nextInputRef = document.getElementById(
        `input-${updateState[key] ? parseInt(key) + 1 : parseInt(key) - 1}`
      );
      nextInputRef?.focus();
      setState(updateState);
    };
  const onsubmit = async () => {
    if (onSubmit) {
      try {
        setLoading(true);
        const res = await onSubmit(state);
        success(res.message);
        setLoading(false);
      } catch (e: any) {
        setLoading(false);
      }
    }
  };

  return (
    <AuthFormContainer>
      <VerticalSpace height={24} />
      <img src="/images/Polaris-Logo.jpg" alt="logo" />
      <VerticalSpace height={24} />
      <div className="content">
        <div className="heading">{heading}</div>
        {subHeading && <div className="sub-heading">{subHeading}</div>}
        <VerticalSpace height={32} />
        {!_.isEmpty(err) && (
          <>
            <Alert
              onClose={() => (setErr ? setErr({}) : null)}
              style={{ borderRadius: 16, textAlign: "left" }}
              message="Error"
              description={<Error err={err} />}
              type="error"
              closable
            />
            <VerticalSpace height={32} />
          </>
        )}
        <div className="form-container">
          {isVerifyAccount && (
            <div className="verify-input-container">
              {Object.keys(state).map((key) => {
                return (
                  <input
                    key={key}
                    id={`input-${key}`}
                    maxLength={1}
                    onChange={setVerifyInputValue({ key })}
                  />
                );
              })}
            </div>
          )}
          {fields &&
            fields.map((field) => (
              <InputField
                key={field.name}
                {...field}
                setValue={setInputValue}
              />
            ))}
        </div>
        <FilledButton
          background={BLUE_TERTIARY}
          color={WHITE}
          width="100%"
          onClick={onsubmit}
          loading={loading}
        >
          {buttonText}
        </FilledButton>
        {children}
      </div>
      <VerticalSpace height={32} />
    </AuthFormContainer>
  );
};

export default AuthForm;
