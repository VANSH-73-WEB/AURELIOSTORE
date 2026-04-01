import { useEffect, useState } from "react";
const BASE_URL = "https://aurelio-backend-ztel.onrender.com";
const Product = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 12;

  // FETCH PRODUCTS
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/products`);
      const data = await res.json();

      setProducts(data); 
    } catch (error) {
      console.error(error);
      setProducts([]);
    }
  };

  fetchProducts();
}, []);

  // ADD TO CART
  const addToCart = async (productId) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/api/auth/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`   
      },
      body: JSON.stringify({
        productId
      })
    });

    const data = await res.json();
    console.log("Cart Updated:", data);
  } catch (error) {
    console.error(error);
  }
};

  // PAGINATION LOGIC
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <section className="px-20">
      <div className="mt-20 grid grid-cols-3 gap-4">
        {currentProducts.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-lg"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-60 rounded-2xl"
            />

            <h3 className="font-semibold text-xl">{item.title}</h3>
            <p>₹{item.price}</p>

            <div className="flex justify-between mt-2">
              <button
                className="px-4 py-2 border rounded"
                onClick={() => addToCart(item._id)}
              >
                Add to Cart
              </button>

              <button className="px-4 py-2 bg-black text-white rounded">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-3 mt-10">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
            setCurrentPage((prev) =>
              Math.min(prev + 1, totalPages)
            )
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