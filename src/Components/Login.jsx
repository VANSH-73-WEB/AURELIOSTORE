import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser({ email, password });

      // 🔥 STORE USER AFTER SUCCESSFUL LOGIN
      localStorage.setItem("userInfo", JSON.stringify(data));

      navigate("/"); // redirect to home
    } catch (error) {
    alert(error.response?.data?.message || "Login Failed");
  }
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;