import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import myImage from "../Uploads/2.png";

const Navbar = ({ cart, focusSearch }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  let userInfo = null;
  try {
    userInfo = JSON.parse(localStorage.getItem("userInfo"));
  } catch {
    userInfo = null;
  }

  const cartCount = cart?.reduce((total, item) => total + (item.qty || item.quantity || 0), 0) || 0;

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="bg-blue-950/80 backdrop-blur-md mx-4 md:mx-20 xl:mx-40 h-16 md:h-20 rounded-b-2xl flex items-center shadow-lg px-4 md:px-6 justify-between">

        {/* Logo + Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <img src={myImage} alt="Aurelio Store" className="w-10 md:w-14 h-auto" />
          <span className="font-raleway text-base md:text-xl font-thin tracking-widest uppercase text-white hidden sm:block">
            AURELIO STORE
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-white text-sm font-light tracking-wide">
          <Link to="/home" className="hover:text-gray-300 transition">Home</Link>
          <Link to="/home" className="hover:text-gray-300 transition">Shop</Link>
          <Link to="/home" className="hover:text-gray-300 transition">Brands</Link>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Search */}
          <i
            onClick={focusSearch}
            className="ri-search-line text-xl text-white cursor-pointer hover:text-gray-300 transition hidden md:block"
          />

          {/* Cart */}
          <div
            className="relative flex items-center cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <i className="ri-shopping-cart-fill text-xl text-white hover:text-gray-300 transition" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>

          {/* User */}
          <div className="relative">
            <i
              className="ri-user-3-fill text-xl text-white cursor-pointer hover:text-gray-300 transition"
              onClick={() => {
                if (!userInfo) navigate("/");
                else setShowMenu(!showMenu);
              }}
            />
            {userInfo && showMenu && (
              <div className="absolute right-0 mt-3 bg-white text-gray-800 p-4 rounded-xl shadow-2xl w-44 border border-gray-100">
                <p className="font-semibold text-sm border-b pb-2 mb-2 truncate">{userInfo.name}</p>
                <button
                  className="w-full text-left text-sm py-1 hover:text-blue-700 transition"
                  onClick={() => { navigate("/orders"); setShowMenu(false); }}
                >
                  My Orders
                </button>
                <button
                  className="w-full text-left text-sm py-1 mt-1 hover:text-red-500 transition"
                  onClick={() => { localStorage.removeItem("userInfo"); localStorage.removeItem("token"); navigate("/"); }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white text-xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <i className={mobileOpen ? "ri-close-line" : "ri-menu-line"} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-blue-950/95 backdrop-blur-md mx-4 rounded-b-2xl px-6 py-4 flex flex-col gap-3 text-white text-sm">
          <Link to="/home" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link to="/home" onClick={() => setMobileOpen(false)}>Shop</Link>
          <Link to="/home" onClick={() => setMobileOpen(false)}>Brands</Link>
          <button onClick={() => { focusSearch(); setMobileOpen(false); }} className="text-left">Search</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
