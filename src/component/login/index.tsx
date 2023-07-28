import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import LabelText from "../common/labelText";
import ErrorText from "../common/errorText";
import { ILogin } from "./login.interface";
import { toast } from "react-toastify";
import { loginApi } from "../../service/auth";
import { setToken } from "../../utils/helper";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  padding-bottom: 30px;
`;

const Input = styled.input`
  width: 90%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
`;

const Button = styled.button`
  width: 95%;
  padding: 16px;
  background-color: #28a745;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 15px;

  &:hover {
    background-color: #1e7e34;
  }
`;

const TitleWrapper = styled.div`
  width: 94%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const TitleHeading = styled.h1`
  font-size: 32px;
  color: #333333;
  margin-bottom: 20px;
`;
const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333333;
`;
const LoginText = styled.label`
  width: 94%;
  display: block;
  font-size: 16px;
  margin: 5px 0px;
  text-align: right;
  color: #5555e5;
  cursor: pointer;
`;

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (value: ILogin) => {
    try {
      setLoading(true);
      const { data } = await loginApi(value);
      setLoading(false);
      setToken(data?.access_token);
      navigate("/");
      toast.success("Login Successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } catch (error: any) {
      setLoading(false);
      toast.error(
        `${
          error?.response?.data?.message
            ? error.response.data.message
            : "Login failed"
        }`,
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Wrapper>
        <TitleWrapper>
          <TitleHeading>Kwanso Assessment Project</TitleHeading>
        </TitleWrapper>

        <FormContainer>
          <Title>Login</Title>
          <LabelText>Email</LabelText>
          <Input
            type="email"
            placeholder="Enter Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                message: "Invalid Email address",
              },
            })}
          />
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
          <LabelText>Password</LabelText>
          <Input
            type="password"
            placeholder="Enter Password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
          <LoginText onClick={() => navigate("/signup")}>
            Create an account
          </LoginText>
          <Button>{loading ? "Loading..." : "Login"}</Button>
        </FormContainer>
      </Wrapper>
    </form>
  );
};

export default Login;
