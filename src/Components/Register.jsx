
import { useNavigate } from "react-router-dom";


const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-700 to-teal-900 flex items-center justify-center text-white">
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-lg w-[350px] shadow-lg">

        <h2 className="text-2xl mb-6 text-center">Create Account</h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full mb-4 bg-transparent border-b border-gray-300 focus:outline-none py-2"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 bg-transparent border-b border-gray-300 focus:outline-none py-2"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 bg-transparent border-b border-gray-300 focus:outline-none py-2"
        />

        <button className="w-full bg-white text-teal-800 py-2 rounded hover:bg-gray-200">
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