import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BASE_URL from "../../config/api";

const Product = ({ products: searchResults, cart, setCart }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [addingId, setAddingId] = useState(null);
  const productsPerPage = 12;

  // Fetch all products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products`);
        const data = await res.json();
        setAllProducts(data);
      } catch (error) {
        console.error(error);
        setAllProducts([]);
      }
    };
    fetchProducts();
  }, []);

  // Use search results if provided, otherwise show all
  const products = searchResults && searchResults.length > 0 ? searchResults : allProducts;

  // Reset to page 1 when products change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchResults]);

  // ADD TO CART
  const addToCart = async (product) => {
    setAddingId(product._id);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product._id }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to add");
      }

      toast.success(`${product.title} added to cart 🛒`);
    } catch (error) {
      console.error(error);
      toast.error("Could not add to cart. Please log in.");
    } finally {
      setAddingId(null);
    }
  };

  // PAGINATION
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  if (products.length === 0) {
    return (
      <section className="px-6 md:px-20 py-16 text-center">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <i className="ri-store-2-line text-5xl" />
          <p className="text-lg">No products found. Try a different search.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 md:px-16 xl:px-20 py-10">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-light text-gray-800 tracking-wide">
          {searchResults?.length > 0 ? `${searchResults.length} results` : "All Products"}
        </h2>
        <p className="text-sm text-gray-400">
          Page {currentPage} of {totalPages}
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {currentProducts.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100"
          >
            {/* Image */}
            <div className="relative overflow-hidden h-56 bg-gray-50">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Quick view overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 bg-white text-gray-800 text-xs px-4 py-2 rounded-full font-medium shadow transition-all duration-300">
                  Quick View
                </span>
              </div>
              {/* Badge */}
              {item.brand && (
                <span className="absolute top-3 left-3 bg-blue-950 text-white text-xs px-2 py-1 rounded-full">
                  {item.brand}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="font-medium text-gray-800 text-sm leading-snug line-clamp-2 mb-1">
                {item.title}
              </h3>

              {/* Stars placeholder */}
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <i
                    key={s}
                    className={`ri-star-fill text-xs ${s <= 4 ? "text-amber-400" : "text-gray-200"}`}
                  />
                ))}
                <span className="text-xs text-gray-400 ml-1">(4.0)</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-blue-950">
                  ₹{item.price?.toLocaleString("en-IN")}
                </span>
                {item.originalPrice && (
                  <span className="text-xs text-gray-400 line-through">
                    ₹{item.originalPrice?.toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-3">
                <button
                  className="flex-1 py-2 border border-blue-950 text-blue-950 rounded-xl text-sm hover:bg-blue-950 hover:text-white transition-all duration-200 disabled:opacity-50"
                  onClick={() => addToCart(item)}
                  disabled={addingId === item._id}
                >
                  {addingId === item._id ? (
                    <span className="flex items-center justify-center gap-1">
                      <i className="ri-loader-4-line animate-spin text-sm" /> Adding...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-1">
                      <i className="ri-shopping-cart-line" /> Add
                    </span>
                  )}
                </button>
                <button className="flex-1 py-2 bg-blue-950 text-white rounded-xl text-sm hover:bg-blue-800 transition-all duration-200">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-200 rounded-xl text-sm hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            ← Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-9 h-9 rounded-xl text-sm font-medium transition ${
                currentPage === i + 1
                  ? "bg-blue-950 text-white shadow"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-200 rounded-xl text-sm hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Next →
          </button>
        </div>
      )}
    </section>
  );
};

export default Product;
