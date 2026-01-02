import Navbar from "./Components/Navbar"
import Middle from "./Components/middle"
import Product from "./Components/Bottom/Product"
const App = () => {
  return (
    <div className="relative">
      <Navbar />
      <Middle />
      <Product/>
    </div>
  )
}

export default App
