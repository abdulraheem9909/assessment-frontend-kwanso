import React from "react";
import styled from "styled-components";

// Define the styled components
const CardContainer = styled.div`
  width: 708px;
  height: 300px;
  background-color: #fff;
  border-radius: 6px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgb(0 0 0 / 10%);
`;

const LoadingText = styled.p`
  font-size: 16px;
  color: #333;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.3);
  border-top: 4px solid #333;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  animation: spin 2s linear infinite;
  margin-bottom: 16px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingCard = () => {
  return (
    <CardContainer>
      <>
        <Spinner />
        <LoadingText>Loading...</LoadingText>
      </>
    </CardContainer>
  );
};

export default LoadingCard;
