import React, { useState } from "react";
import { Link } from "react-router-dom";

import AuthForm from "../../components/common/auth-form";
import { IField } from "../../components/common/auth-form";
import { VerticalSpace } from "../../components/common/space";
import { success } from "../../components/common/message";

import { ROCK_BLUE } from "../../styles/colors";

import { validatePassword } from "../../utils/validate";

interface Props {}

interface IRegisterSubmitParams {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
}

const fields: IField[] = [
  {
    label: "Full Name",
    type: "text",
    placeholder: "Enter your full name",
    name: "name",
    defaultValue: "",
  },
  {
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    name: "email",
    defaultValue: "",
  },
  {
    label: "Create password",
    type: "password",
    placeholder: "Enter your password",
    name: "password",
    defaultValue: "",
    activeIcon: "/images/icons/show.svg",
    deactiveIcon: "/images/icons/hide.svg",
  },
  {
    label: "Repeat password",
    type: "password",
    placeholder: "Enter your password",
    name: "repeatPassword",
    defaultValue: "",
    activeIcon: "/images/icons/show.svg",
    deactiveIcon: "/images/icons/hide.svg",
  },
];

const Register: React.FC<Props> = (props) => {
  const history = [];
  const [err, setErr] = useState({});
  const onSubmit = async ({
    email,
    password,
    repeatPassword,
    name,
  }: IRegisterSubmitParams) => {
    setErr({});
    const nameArr = name.split(" ");
    const firstName = nameArr[0];
    const lastName =
      nameArr.length > 1 ? nameArr.slice(1, nameArr.length).join(" ") : "";
    if (!firstName || !email || !password || !repeatPassword) {
      setErr({
        isError: true,
        description: "All fields are required.",
        code: "fields_required",
      });
    } else if (password.length < 8 || !validatePassword(password)) {
      setErr({
        isError: true,
        message:
          "Invalid password. At least 8 characters, requires to have lowercase & uppercase letter(s), number(s) and at least one special character.",
      });
    } else {
      try {
        const data = { message: "" };
        success(data.message);
        history.push(`/verify-account/${email}`);
      } catch (e: any) {
        if (e.response) {
          const { data } = e.response;
          if (data.isError) setErr({ message: data.message, isError: true });
        } else {
          setErr({ message: e.message, isError: true });
        }
      }
    }
  };
  return (
    <AuthForm
      heading="Register new account"
      subHeading="Enter your credentials to create new account"
      fields={fields}
      buttonText="Register"
      onSubmit={onSubmit}
      err={err}
      setErr={setErr}
    >
      <div>
        <VerticalSpace height={32} />
        Already have an account?{" "}
        <Link to="/login" style={{ color: ROCK_BLUE }}>
          Log in
        </Link>
      </div>
    </AuthForm>
  );
};

export default Register;
