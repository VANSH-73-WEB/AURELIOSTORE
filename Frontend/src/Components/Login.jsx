import { useState } from "react";
import { useNavigate } from "react-router-dom";
import myImage from "../Uploads/AURILEOSTORE.png";
import BASE_URL from "../config/api";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        if (data.token) localStorage.setItem("token", data.token);
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/home");
      } else {
        setError(data.message || "Invalid email or password.");
      }
    } catch {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-teal-800 flex">

      {/* Left Panel — branding */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-16 text-white">
        <div className="max-w-sm">
          <img src={myImage} alt="Logo" className="w-20 h-20 object-contain mb-8 opacity-90" />
          <h1 className="font-raleway text-5xl font-thin tracking-[0.15em] uppercase mb-4 leading-tight">
            Aurelio<br />Store
          </h1>
          <p className="text-white/60 text-sm leading-relaxed">
            Premium fashion & lifestyle products crafted for elegance and everyday comfort.
          </p>
          <div className="flex gap-4 mt-10">
            {["Free shipping", "Easy returns", "Secure checkout"].map((t) => (
              <span key={t} className="text-xs text-white/50 border border-white/20 px-2 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-10 w-full max-w-sm shadow-2xl border border-white/10 text-white">

          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-6">
            <img src={myImage} alt="Logo" className="w-14 h-14 object-contain" />
          </div>

          <h2 className="text-2xl font-light mb-1">Welcome back</h2>
          <p className="text-white/50 text-sm mb-8">Sign in to your account</p>

          {error && (
            <div className="bg-red-500/20 border border-red-400/30 text-red-200 text-sm px-4 py-3 rounded-xl mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} autoComplete="off" className="space-y-5">
            <div>
              <label className="block text-xs text-white/60 mb-2 uppercase tracking-widest">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/10 transition"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-white/60 mb-2 uppercase tracking-widest">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/10 transition"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-blue-950 py-3 rounded-xl font-semibold hover:bg-gray-100 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <><i className="ri-loader-4-line animate-spin" /> Signing in...</>
              ) : "Sign In"}
            </button>
          </form>

          <p className="text-sm text-center text-white/50 mt-6">
            New here?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-white underline underline-offset-2 hover:text-white/80 transition"
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
