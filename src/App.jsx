import Navbar from "./Components/Navbar";
import Middle from "./Components/Middle";
import Product from "./Components/Bottom/Product";
import Cart from "./Components/Bottom/Cart";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer/Footer";

const App = () => {
  const [cart, setCart] = useState([]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar cart={cart} />

      {/* Main content */}
      <main className="flex-grow ">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Middle />
                <Product cart={cart} setCart={setCart} />
              </>
            }
          />

          <Route
            path="/cart"
            element={<Cart cart={cart} setCart={setCart} />}
          />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
