const TaskCard = ({ task, onDelete, onEdit }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        marginBottom: "10px",
        borderRadius: "8px",
      }}
    >
      <h3>{task.title}</h3>
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
