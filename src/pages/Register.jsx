import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = () => {
    if (!formData.name || !formData.email || !formData.password) {
      alert("please fill all the fields");
      return;
    }
    console.log("register Data:", formData);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Register Page</h1>

      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        value={formData.name}
        onChange={handleChange}
      />
      <br />
      <br />

      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        value={formData.email}
        onChange={handleChange}
      />
      <br />
      <br />

      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        value={formData.password}
        onChange={handleChange}
      />
      <br />
      <br />

      <button onClick={handleRegister}>Register</button>

      <br />
      <br />
    </div>
  );
};
export default Register;