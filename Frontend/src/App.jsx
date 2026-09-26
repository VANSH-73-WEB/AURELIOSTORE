import { useState ,useRef} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Middle from "./Components/Middle";
import Product from "./Components/Bottom/Product";
import Cart from "./Components/Bottom/Cart";
import Footer from "./Components/Footer/Footer";
import Notfound from "./Components/Notfound";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Orders from "./Components/Bottom/Orders";
import Brands from "./Components/Brand";
import SingleBrand from "./Components/SingleBrand";
import Category from "./Components/Category";
import CategoryStrip from "./Components/CategoryStrip";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
   
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
 const location = useLocation();
  const navigate = useNavigate();
const hideLayout = ["/", "/register"].includes(location.pathname);
  const searchInputRef = useRef(null);

  // Navbar search icon. The search box only exists on /home, so from any other
  // page go there first (Middle.jsx then focuses it); on /home just focus it.
  const focusSearch = () => {
    if (location.pathname !== "/home") {
      navigate("/home", { state: { focusSearch: true } });
      return;
    }
    const input = searchInputRef.current;
    input?.scrollIntoView({ behavior: "smooth", block: "center" });
    input?.focus({ preventScroll: true });
  };
 return (
  <div className="min-h-screen flex flex-col">
<ToastContainer position="top-right" autoClose={2000} />
    {/* Show Navbar only if NOT login */}
    {!hideLayout && <Navbar cart={cart} focusSearch={focusSearch} />}

    <main className="flex-grow">
      <Routes>
        <Route path="/" element={<Login />} />
  <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <>
              <Middle searchInputRef={searchInputRef} setProducts={setProducts}  />
              <CategoryStrip />
              <Product  products={products}  cart={cart}  setCart={setCart}  />
            </>
          }
        />

        <Route
          path="/cart"
          element={<Cart cart={cart} setCart={setCart} />}
        />
        <Route path="/orders" element={<Orders />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/brand/:id" element={<SingleBrand />} />
        <Route path="/category/:categorySlug" element={<Category cart={cart} setCart={setCart} />} />
        <Route path="/category/:categorySlug/:subSlug" element={<Category cart={cart} setCart={setCart} />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </main>

    {/* Show Footer only if NOT login */}
    {!hideLayout && <Footer />}
  </div>
);
};

export default App;
