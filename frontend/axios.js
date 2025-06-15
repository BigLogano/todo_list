import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const createTodo = async (data) => {
  try {
    const response = await axiosInstance.post("/todo/createTodo", data);
    return response.data;
  } catch (error) {
    console.error("Error creating todo", error);
    throw error;
  }
};

export const getAllTodos = async () => {
  try {
    const response = await axiosInstance.get("/todo/getAllTodos");
    return response.data;
  } catch (error) {
    console.error("Error getting todos", error);
    throw error;
  }
};

export const updateTodo = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/todo/updateTodo/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating todo", error);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await axiosInstance.delete(`/todo/deleteTodo/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting todo", error);
    throw error;
  }
};
