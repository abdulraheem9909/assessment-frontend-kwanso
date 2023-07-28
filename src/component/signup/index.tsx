import React, { useState } from "react";
import styled from "styled-components";
import LabelText from "../common/labelText";
import { useForm } from "react-hook-form";
import ErrorText from "../common/errorText";
import { ISignUp } from "./signup.interface";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signUpApi } from "../../service/auth";

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
  margin-bottom: 10px;
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

  &:hover {
    background-color: #1e7e34;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333333;
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
const LoginText = styled.label`
  width: 94%;
  display: block;
  font-size: 16px;
  margin: 5px 0px;
  text-align: right;
  color: #5555e5;
  cursor: pointer;
`;

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (value: ISignUp) => {
    try {
      setLoading(true);
      const { data } = await signUpApi(value);
      setLoading(false);
      navigate("/");
      toast.success("Signup Successfully", {
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
            : "Signup failed"
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
          <Title>Signup</Title>
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
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
          <LabelText>Confirm Password</LabelText>
          <Input
            type="password"
            placeholder="Enter Confirm Password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <ErrorText>{errors.confirmPassword.message}</ErrorText>
          )}
          <LoginText onClick={() => navigate("/login")}>
            Already have an account
          </LoginText>
          <Button>{loading ? "Loading..." : "Signup"}</Button>
        </FormContainer>
      </Wrapper>
    </form>
  );
};

export default Signup;
