import { products } from "../../data/produts";
import { useState } from "react";

const Product = ({ cart, setCart }) => {

  const addToCart = (product) => {
    const exists = cart.find(item => item.id === product.id);

    if (exists) {
      setCart(
        cart.map(item =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

const [currentPage, setCurrentPage] = useState(1);
const productsPerPage = 12;
const indexOfLastProduct = currentPage * productsPerPage;
const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

const totalPages = Math.ceil(products.length / productsPerPage);
  return (
    <section className=" px-20">
     
   <div className="mt-20 grid grid-cols-3 gap-1 ml-70"> 


      {currentProducts.map((item) => (
        <div key={item.id} className="product-card bg-white rounded-3xl p-4 shadow-sm hover:shadow-lg transition">

          <img
            src={item.image}
            alt={item.name}
            className="w-81 h-70 rounded-2xl"
          />

          <h3 className="font-semibold text-2xl">{item.name}</h3>
          <p>₹{item.price}</p>

          <div className="flex justify-between">
            <button
              className="w-30 h-10 font-semibold rounded-3xl border border-gray-300 cursor-pointer"
              onClick={() => addToCart(item)}
            >
              Add to Cart
            </button>

            <button className="w-30 h-10 font-semibold rounded-3xl border border-gray-300 bg-black text-white cursor-pointer">
              Buy Now
            </button>
          </div>
        </div>
      ))}
    </div>
    <div className="flex justify-center gap-3 mt-10">
  <button
    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
    className="px-4 py-2 border rounded"
  >
    Prev
  </button>

  {Array.from({ length: totalPages }, (_, i) => (
    <button
      key={i}
      onClick={() => setCurrentPage(i + 1)}
      className={`w-8 h-8 rounded ${
        currentPage === i + 1
          ? "bg-black text-white"
          : "bg-gray-200"
      }`}
    >
      {i + 1}
    </button>
  ))}

  <button
    onClick={() =>
      setCurrentPage(prev => Math.min(prev + 1, totalPages))
    }
    className="px-4 py-2 border rounded"
  >
    Next
  </button>
</div>

    </section>
  );
};

export default Product;
