import React from "react";
import Login from "../component/login";
import { styled } from "styled-components";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

const LoginPage = () => {
  return (
    <PageContainer>
      <Login />
    </PageContainer>
  );
};

export default LoginPage;
