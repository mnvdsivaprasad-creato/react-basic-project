import { useState, useEffect } from "react";

const TaskForm = ({ onAddTask, onUpdateTask, editingTask,loading, }) => {
  const [title, setTitle] = useState(editingTask?.title || "");
  const [description, setDescription] = useState(
    editingTask?.description || "",
  );
  const [status, setStatus] = useState("Pending");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }
    const taskData = {
      id: editingTask ? editingTask.id : Date.now(),
      title,
      description,
      status,
    };
    if (editingTask) {
      onUpdateTask(taskData);
    } else {
      onAddTask(taskData);
    }
    setTitle("");
    setDescription("");
  };

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setStatus(editingTask.status);
    } else{
      setTitle("");
      setDescription("");
      setStatus("Pending");
    }
  }, [editingTask]);

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <div>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <br />

      <div>
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <br />

      <div>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <br />
      <button type="submit" disabled={loading}>{loading?"Processing":editingTask ? "update Task" : "Add Task"}</button>
    </form>
  );
};
export default TaskForm;
