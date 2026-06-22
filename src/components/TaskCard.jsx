import { Link } from "react-router-dom";

const TaskCard = ({ task, onDelete, onEdit,onView }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        marginBottom: "10px",
        borderRadius: "8px",
      }}
    >
      <button onClick={()=>onView(task.id)}>View</button>
      <h3>
        <Link to={`/task/${task.id}`}>
        {task.title}</Link></h3>
      <p>{task.description}</p>
      <strong>Status:{task.status}</strong>

      <br />
      <br />
      
      <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={() => onDelete(task.id)} style={{ marginLeft: "10px" }}>
        Delete
      </button>
    </div>
  );
};
export default TaskCard;
