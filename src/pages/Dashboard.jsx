import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task ManagerDashboard</h1>
      <hr />-<h3>Quick Actions</h3>
      <button>Add New Task</button>
      <br></br>
      <Link to="/">Logout</Link>
      <hr />
      <h3>My Tasks</h3>
      <ul>
        <li>
          Kk
        </li>
      </ul>
      {/* <h3>Welcome, {user?.email || "Guest"}</h3>
      <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
};
export default Dashboard;
