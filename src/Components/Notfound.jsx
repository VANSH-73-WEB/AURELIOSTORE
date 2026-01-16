import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h1 className="text-5xl font-bold text-red-500">404</h1>
      <p className="text-xl mt-4">Page Not Found</p>

      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Go Home
      </Link>
    </div>
  );
};

export default Notfound;
