import React from "react";
import Tasks from "../component/tasks";
import { styled } from "styled-components";
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto 20px;
  margin-top: 10%;
`;

const TasksPage = () => {
  return (
    <PageContainer>
      <Tasks />
    </PageContainer>
  );
};

export default TasksPage;
