import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import myImage from "../Uploads/AURILEOSTORE.png";

const BASE_URL = "https://aurelio-backend-ztel.onrender.com";
const Login = () => {
  
 const navigate = useNavigate();
 const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      setError("");
       console.log("Form Submitted");  
  

  try{
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
       credentials: "include",
      body: JSON.stringify(formData)
    });

   
      const data = await response.json();
     


      if (response.ok) {
       
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
 
  localStorage.setItem("userInfo", JSON.stringify(data));
    navigate("/home");
   
      } else {
        setError(data.message || "Login failed");
      }

    } catch (error) {
      console.log("Error during login:", error);

      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-teal-700 to-teal-900 flex items-center justify-center relative">

      {/* Top Navigation */}
     <div
  className="absolute top-6 left-6 text-white cursor-pointer"
  onClick={() => navigate("/home")}
>
  ← Back to store
</div>

      <div className="absolute top-6 right-6 text-white">
        Not a member?{" "}
        <span className="border px-3 py-1 rounded cursor-pointer hover:bg-white hover:text-teal-800 transition " onClick={() => navigate("/register")}>
          Sign Up
        </span>
      </div>

      {/* Login Card */}
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-lg w-[350px] shadow-lg text-white">

        <div className="flex justify-center mb-8">
  <div className="w-16 h-16 clip-path-custom flex items-center justify-center">
    <img
      src={myImage}
      alt="Logo"
      className="w-full h-full object-contain"
    />
  </div>
</div>

        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-6">

          {/* Email */}
          <div>
            <label className="block text-sm mb-2">EMAIL ADDRESS</label>
           <input
  type="email"
  name="email"
  autoComplete="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="demo@modonotebooks.com"
  className="w-full bg-transparent border-b border-gray-300 py-2 
  focus:outline-none focus:border-white 
  focus:ring-2 focus:ring-teal-300 focus:ring-opacity-50 transition duration-300"
  required
/>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-2">PASSWORD</label>
            <input
  type="password"
  name="password"
  autoComplete="new-password"
  value={formData.password}
  onChange={handleChange}
  placeholder="********"
  className="w-full bg-transparent border-b border-gray-300 py-2 
  focus:outline-none focus:border-white 
  focus:ring-2 focus:ring-teal-300 focus:ring-opacity-50 transition duration-300"
  required
/>
          </div>

          {/* Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-white text-teal-700 py-3 rounded-lg font-semibold 
  hover:bg-gray-200 transition duration-300"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;