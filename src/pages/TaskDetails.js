import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TaskDetails = () => {
  const { id } = useParams();

  const tasks = useSelector((state) => state.tasks.tasks);

  const task = tasks.find((task) => task.id === Number(id));

  if (!task) {
    return <h2>Task Not found</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Details</h1>
      <h3>{task.title}</h3>
      <p>
        <strong>Descripton:</strong>
        {task.description}
      </p>
      <strong>status:{task.status}</strong>
      <br />
      <br />

      <Link to="/dashboard">Back to Dashboard</Link>
    </div>
  );
};
export default TaskDetails;
