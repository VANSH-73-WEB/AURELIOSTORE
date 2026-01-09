import Navbar from "./Components/Navbar"
import Middle from "./Components/middle"
import Product from "./Components/Bottom/Product"
import Cart from "./Components/Bottom/Cart"
import { useState } from "react"
const App = () => {
  const [cart, setCart] = useState([]);
   const [showCart, setShowCart] = useState(false);
  return (
    <div className="relative">
      <Navbar cart={cart} setShowCart={setShowCart} />
      <Middle />
      <Product cart={cart} setCart={setCart}/>
      {showCart && (
        <Cart cart={cart} setCart={setCart} />
      )}
    </div>
  )
}

export default App
