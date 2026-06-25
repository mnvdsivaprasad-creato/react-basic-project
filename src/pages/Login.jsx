import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("please enter email and password");
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    dispatch(
      login({
        email,
      }),
    );

    navigate("/dashboard");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Login Page</h1>

      <div>
        <label>Email</label>
        <br />
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <br />

      <div>
        <label>Password</label>
        <br />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
export default Login;
