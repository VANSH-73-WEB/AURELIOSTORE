
import { useNavigate } from "react-router-dom";
 import {useState} from "react";

const Register = () => {
  const navigate = useNavigate();
  const [User , setUser]=useState({
    name:"",
    email:"",
    password:""
  });

  const handleChange=(e)=>{
    const {name , value}=e.target;
    setUser({
      ...User,
      [name]:value
    }); 
  };

  const handleSubmit = async () =>{
    try{
      const res = await fetch("http://localhost:5000/api/auth/register", {method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(User)
    });
    const data = await res.json();

    if(res.status === 201){
      alert("Registration successful! Please login.");
      navigate("/");
    }
    else{
      alert(data.message || "Registration failed. Try again.");
    }
  }
    catch(error){
      console.log("Error during registration:", error);
      alert("Server error. Please try again later.");
    }

  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-700 to-teal-900 flex items-center justify-center text-white">
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-lg w-[350px] shadow-lg">

        <h2 className="text-2xl mb-6 text-center">Create Account</h2>

        <input
          type="text"
          placeholder="Name"
          name="name"
          value={User.name}
          onChange={handleChange}

          className="w-full mb-4 bg-transparent border-b border-gray-300 focus:outline-none py-2"
        />

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={User.email}
          onChange={handleChange}
          className="w-full mb-4 bg-transparent border-b border-gray-300 focus:outline-none py-2"
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={User.password}
          onChange={handleChange}
          className="w-full mb-6 bg-transparent border-b border-gray-300 focus:outline-none py-2"
        />

        <button className="w-full bg-white text-teal-800 py-2 rounded hover:bg-gray-200" onClick={handleSubmit}>
          Register
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default Register;