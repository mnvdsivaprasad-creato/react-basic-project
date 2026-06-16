import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { addTask, deleteTask, updateTask } from "../store/taskSlice";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import { useState } from "react";

const Dashboard = () => {
  const [editingTask, setEditingTask] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tasks = useSelector((state) => state.tasks.tasks);

  const handleAddTask = (task) => {
    dispatch(addTask(task));
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = (updatedTask) => {
    dispatch(updateTask(updatedTask));
    setEditingTask(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task ManagerDashboard</h1>
      <TaskForm
        onAddTask={handleAddTask}
        onUpdateTask={handleUpdateTask}
        editingTask={editingTask}
      />
      {/* <hr />-<h3>Quick Actions</h3>
      <button>Add New Task</button> */}
      <br></br>
      <Link to="/">Logout</Link>
      <hr />
      <h3>My Tasks</h3>
      <ul>
        <li>Kk</li>
      </ul>
      {/* <h3>Welcome, {user?.email || "Guest"}</h3>
      <button onClick={handleLogout}>Logout</button> */}
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};
export default Dashboard;
