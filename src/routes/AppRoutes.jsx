import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import TaskDetails from "../pages/TaskDetails";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
        <Dashboard />
        </ProtectedRoute>
        } />
      <Route path="/register" element={<Register />} />
      <Route path="task/:id" element={<TaskDetails/>}/>
    </Routes>
  );
};
export default AppRoutes;
