// Set VITE_API_URL (e.g. in Frontend/.env.local -> VITE_API_URL=http://localhost:5000)
// to talk to a local backend. Without it, the deployed backend is used as before.
const BASE_URL = import.meta.env.VITE_API_URL || "https://aurelio-backend-ztel.onrender.com";
export default BASE_URL;
