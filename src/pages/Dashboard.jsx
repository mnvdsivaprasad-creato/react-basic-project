import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import {
  createTask,
  deleteTaskAsync,
  updateTaskAsync,
} from "../store/taskSlice";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import { useState, useEffect } from "react";
import { fetchTasks } from "../store/taskSlice";

const Dashboard = () => {
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const taskPerPage = 5;

  const handleView = (id) => {
    navigate(`/task/${id}`);
  };

  const { tasks, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchTerm]);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const filteredTasks = tasks
    .filter((task) => {
      const matchesFilter =
        filter === "All" || task.status.toLowerCase() === filter.toLowerCase();

      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

  const indexOfLastTask = currentPage * taskPerPage;
  const indexOfFirstTask = indexOfLastTask - taskPerPage;

  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const totalPages = Math.ceil(filteredTasks.length / taskPerPage);

  const handleAddTask = async (task) => {
    await dispatch(createTask(task));
    toast.success("Task Created Succesfully");
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = async (updatedTask) => {
    console.log("Updated Task:", updatedTask);

    const result = await dispatch(updateTaskAsync(updatedTask));
    console.log("Result:", result);
    setEditingTask(null);
    toast.success("Toast Updated Succesfully");
  };

  const handleDelete = async (id) => {
    console.log("Deleting ID:", id);
    const result = await dispatch(deleteTaskAsync(id));
    console.log(result);
    toast.success("Task Deleted Succesfully");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status.toLowerCase() === "pending",
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status.toLowerCase() === "in progress",
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status.toLowerCase() === "completed",
  ).length;

  if (loading) {
    return <h2>Loading Tasks...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task ManagerDashboard</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <TaskForm
        onAddTask={handleAddTask}
        onUpdateTask={handleUpdateTask}
        editingTask={editingTask}
        loading={loading}
      />
      <br></br>
      <button onClick={handleLogout}>Logout</button>
      <hr />

      <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
        <div
          style={{
            border: "1px solid gray",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <h4>Total</h4>
          <p>{totalTasks}</p>
        </div>

        <div
          style={{
            border: "1px solid gray",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <h4>Pending</h4>
          <p>{pendingTasks}</p>
        </div>

        <div
          style={{
            border: "1px solid gray",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <h4>In Progress</h4>
          <p>{inProgressTasks}</p>
        </div>

        <div
          style={{
            border: "1px solid gray",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <h4>Completed</h4>
          <p>{completedTasks}</p>
        </div>
      </div>

      <h3>My Tasks</h3>
      <h4>Current Filter:{filter}</h4>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setFilter("All")}>All</button>
        <button
          onClick={() => setFilter("Pending")}
          style={{ marginLeft: "10px" }}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter("In Progress")}
          style={{ marginLeft: "10px" }}
        >
          In Progress
        </button>
        <button
          onClick={() => setFilter("Completed")}
          style={{ marginLeft: "10px" }}
        >
          Completed
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          previous
        </button>
        <span>
          Page{currentPage}of{totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>

      <div style={{ marginBottom: "15px", marginTop: "13px" }}>
        <input
          type="text"
          placeholder="Search tasks...."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px",
            width: "250px",
          }}
        />
      </div>

      <h4>
        Showing {filteredTasks.length} of {tasks.length}
      </h4>
      {filteredTasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        currentTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        ))
      )}

      <div style={{ marginBottom: "15px" }}>
        <label>Sort By:</label>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Title (A-Z)</option>
          <option value="desc">Title (Z-A)</option>
        </select>
      </div>
    </div>
  );
};
export default Dashboard;
