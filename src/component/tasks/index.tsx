import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  createTask,
  deleteAllTask,
  deleteTask,
  getTasks,
} from "../../service/tasks";
import { toast } from "react-toastify";
import LoadingCard from "../common/loadder";
interface ITask {
  name: string;
  id: string;
}

const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 700px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
`;

const TaskInput = styled.input`
  width: 90%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 10px;
  outline: none;
`;

const CardWrapper = styled.div`
  width: 100%;
  max-height: 400px;
  overflow: auto;
`;
const Card = styled.div`
  width: 90%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #dbffdb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  transition: background-color 0.2s ease;
`;

const RemoveButton = styled.button`
  padding: 6px 12px;
  background-color: #ff3333;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
`;
const AddButton = styled.button`
  padding: 6px 12px;
  background-color: #28a745;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
`;
const TitleWrapper = styled.div`
  width: 94%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-size: 32px;
  color: #333333;
  margin-bottom: 20px;
`;
const TextSpan = styled.span`
  padding: 0 10px;
`;
const RemoveAllWrapper = styled.div`
  width: 94%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
`;

const Task: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [taskInput, setTaskInput] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingRemove, setLoadingRemove] = useState(false);
  const [loadingRemoveAll, setLoadingRemoveAll] = useState(false);
  const [loadingAll, setLoadingAll] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoadingAll(true);
      try {
        const { data } = await getTasks();

        setTasks([...data]);
        setLoadingAll(false);
      } catch (error) {
        setLoadingAll(false);
        console.log("error", error);
      }
    };
    fetchUser();
  }, []);

  const handleAddTask = async () => {
    if (taskInput.trim() !== "") {
      setTaskInput("");
      try {
        setLoading(true);
        const { data } = await createTask({ name: taskInput });
        setLoading(false);
        setTasks([...tasks, data]);
        toast.success("Added Successfully", {
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
              : "Something Went Wrong"
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
    }
  };

  const handleRemoveTask = async (index: string) => {
    try {
      setSelectedId(index);
      setLoadingRemove(true);
      const { data } = await deleteTask(index);
      setLoadingRemove(false);
      const updatedTasks: ITask[] = tasks.filter(
        (task, i) => task.id !== index
      );
      setTasks(updatedTasks);
      toast.success("Deleted Successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } catch (error: any) {
      setLoadingRemove(false);
      toast.error(
        `${
          error?.response?.data?.message
            ? error.response.data.message
            : "Something Went Wrong"
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
  const handleRemoveTaskAll = async () => {
    try {
      setLoadingRemoveAll(true);
      await deleteAllTask();
      setLoadingRemoveAll(false);
      setTasks([]);
      toast.success("All Data Deleted Successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } catch (error: any) {
      setLoadingRemoveAll(false);
      toast.error(
        `${
          error?.response?.data?.message
            ? error.response.data.message
            : "Something Went Wrong"
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
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <>
      {loadingAll ? (
        <LoadingCard />
      ) : (
        <TaskContainer>
          <TitleWrapper>
            <Title>My Tasks</Title>
          </TitleWrapper>
          <TaskInput
            type="text"
            placeholder="Enter a new task..."
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
          />
          <AddButton onClick={handleAddTask} disabled={loading}>
            {loading ? "Adding..." : "Add Task"}
          </AddButton>
          {tasks.length > 0 && (
            <RemoveAllWrapper>
              <RemoveButton onClick={handleRemoveTaskAll}>
                {loadingRemoveAll ? "Removing..." : "Remove All"}
              </RemoveButton>
            </RemoveAllWrapper>
          )}
          <CardWrapper>
            {tasks.map((task, index) => (
              <Card key={index}>
                <TextSpan>{task?.name}</TextSpan>
                <RemoveButton
                  onClick={() => handleRemoveTask(task?.id)}
                  disabled={loadingRemove}
                >
                  {loadingRemove && selectedId === task?.id
                    ? "Removing..."
                    : "Remove"}
                </RemoveButton>
              </Card>
            ))}
          </CardWrapper>
        </TaskContainer>
      )}
    </>
  );
};

export default Task;
