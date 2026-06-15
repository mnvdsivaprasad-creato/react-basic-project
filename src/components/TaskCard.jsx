const TaskCard = ({ title, status }) => {
  return (
    <div
      style={{ border: "1px solid gray", padding: "10px", margin: "10px 0" }}
    >
      <h4>{title}</h4>
      <p>Status:{status}</p>
    </div>
  );
};
export default TaskCard;