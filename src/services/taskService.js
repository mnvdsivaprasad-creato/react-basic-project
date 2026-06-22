import axiosInstance from "../api/axiosInstance";
export const getTasks = async () => {
  const response = await axiosInstance.get("/todos");
  return response.data.slice(0, 10).map((task) => ({
    id: task.id,
    title: task.title,
    description: "Task fetched from API",
    status: task.completed ? "Completed" : "Pending",
  }));
};

export const createTaskApi = async (taskData) => {
  const response = await axiosInstance.post("/todos", taskData);
  return response.data;
};

export const updateTaskApi=async(task)=>{
    const response=await axiosInstance.put(`/todos/${task.id}`,task);
    return response.data;
}

export const deleteTaskApi=async(id)=>{
    const response=await axiosInstance.delete(`/todos/${id}`);
    return response.data;
}