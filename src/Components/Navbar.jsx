import { useNavigate, Link } from "react-router-dom";
import {useState} from "react"

const Navbar = ({ cart, focusSearch }) => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  let userInfo = null;

  try {
    userInfo = JSON.parse(localStorage.getItem("userInfo"));
  } catch {
    userInfo = null;
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="bg-blue-950/70 backdrop-blur-md mx-40 h-20 rounded-b-2xl flex items-center shadow-lg px-6">

        <img
          src="src/AURILEOSTORE.png"
          alt="Aurelio Store"
          className="w-20 h-auto"
        />

        <h1 className="ml-4 font-raleway text-2xl font-thin tracking-[0.3em] uppercase text-white">
          AURELIO STORE
        </h1>

        <div className="flex space-x-6 ml-42">
          <Link to="/home" className="text-white hover:text-gray-300">Home</Link>
          <Link to="/shop" className="text-white hover:text-gray-300">Shop</Link>
          <Link to="/blog" className="text-white hover:text-gray-300">Brand</Link>
        </div>

        <div className="flex space-x-6 ml-66 items-center">

          {/* Search */}
          <i
            onClick={focusSearch}
            className="ri-search-line text-2xl text-white cursor-pointer"
          ></i>

          {/* Cart */}
          <div
            className="relative flex items-center cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <i className="ri-shopping-cart-fill text-2xl text-white"></i>

            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-white/30 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cart.reduce((total, item) => total + item.qty, 0)}
              </span>
            )}
          </div>

         {/* USER SECTION */}
<div className="relative">

  {/* User Icon */}
  <i
    className="ri-user-3-fill text-2xl text-white cursor-pointer"
    onClick={() => {
      if (!userInfo) {
        navigate("/Login");
      } else {
        setShowMenu(!showMenu);
      }
    }}
  ></i>

  {/* Dropdown */}
  {userInfo && showMenu && (
    <div className="absolute right--39 mt-5 bg-white text-black p-3 rounded shadow-lg w-45">

      <p className="font-semibold border-b pb-1">
        {userInfo.name}
      </p>

      <p
        className="cursor-pointer hover:text-red-500 mt-2"
        onClick={() => {
          localStorage.removeItem("userInfo");
          navigate("/");
        }}
      >
        Logout
      </p>
<button onClick={() => navigate("/orders")}>
  Orders
</button>
    </div>
  )}

</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;