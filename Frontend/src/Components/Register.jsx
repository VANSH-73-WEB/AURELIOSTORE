import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import BASE_URL from "../config/api";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (res.status === 201) {
        toast.success("Account created! Please sign in.");
        navigate("/");
      } else {
        toast.error(data.message || "Registration failed. Try again.");
      }
    } catch {
      toast.error("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-teal-800 flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-10 w-full max-w-sm shadow-2xl border border-white/10 text-white">

        <h2 className="text-2xl font-light mb-1">Create account</h2>
        <p className="text-white/50 text-sm mb-8">Join Aurelio Store today</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs text-white/60 mb-2 uppercase tracking-widest">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={user.name}
              onChange={handleChange}
              required
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/10 transition"
            />
          </div>

          <div>
            <label className="block text-xs text-white/60 mb-2 uppercase tracking-widest">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={user.email}
              autoComplete="off"
              onChange={handleChange}
              required
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/10 transition"
            />
          </div>

          <div>
            <label className="block text-xs text-white/60 mb-2 uppercase tracking-widest">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Min. 6 characters"
              autoComplete="new-password"
              value={user.password}
              onChange={handleChange}
              required
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/10 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-blue-950 py-3 rounded-xl font-semibold hover:bg-gray-100 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <><i className="ri-loader-4-line animate-spin" /> Creating account...</>
            ) : "Create Account"}
          </button>
        </form>

        <p className="text-sm text-center text-white/50 mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/")}
            className="text-white underline underline-offset-2 hover:text-white/80 transition"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
