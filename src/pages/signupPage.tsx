import React from "react";
import { styled } from "styled-components";
import Signup from "../component/signup";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

const SignupPage = () => {
  return (
    <PageContainer>
      <Signup />
    </PageContainer>
  );
};

export default SignupPage;
