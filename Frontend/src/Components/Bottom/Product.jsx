import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BASE_URL from "../../config/api";

const PRODUCTS_PER_PAGE = 12;

const Product = ({ products: searchResults, cart, setCart }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [addingId, setAddingId] = useState(null);

  const isSearching = searchResults && searchResults.length > 0;

  // Server-side pagination: only pull one page's worth of products at a time
  // instead of fetching the whole collection and slicing it in the browser.
  useEffect(() => {
    if (isSearching) return; // search results are already a small, complete list

    let ignore = false;
    setLoadingProducts(true);

    fetch(`${BASE_URL}/api/products?page=${currentPage}&limit=${PRODUCTS_PER_PAGE}`)
      .then((res) => res.json())
      .then((data) => {
        if (ignore) return;
        setAllProducts(data.products ?? data);
        setTotalPages(data.pages ?? 1);
      })
      .catch((error) => {
        console.error(error);
        if (!ignore) setAllProducts([]);
      })
      .finally(() => { if (!ignore) setLoadingProducts(false); });

    return () => { ignore = true; };
  }, [currentPage, isSearching]);

  // Reset to page 1 whenever a new search is run
  useEffect(() => {
    setCurrentPage(1);
  }, [searchResults]);

  const products = isSearching ? searchResults : allProducts;
  const effectiveTotalPages = isSearching ? 1 : totalPages;

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

  if (loadingProducts && !isSearching) {
    return (
      <section className="px-6 md:px-16 xl:px-20 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
              <div className="h-56 bg-gray-100" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-100 rounded w-3/4" />
                <div className="h-4 bg-gray-100 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

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
          {isSearching ? `${searchResults.length} results` : "All Products"}
        </h2>
        {!isSearching && (
          <p className="text-sm text-gray-400">
            Page {currentPage} of {effectiveTotalPages}
          </p>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100"
          >
            {/* Image */}
            <div className="relative overflow-hidden h-56 bg-gray-50">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://via.placeholder.com/300?text=" + encodeURIComponent(item.title || "Product");
                }}
              />
              {/* Quick view overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 bg-white text-gray-800 text-xs px-4 py-2 rounded-full font-medium shadow transition-all duration-300">
                  Quick View
                </span>
              </div>
              {/* Brand badge - clicking jumps straight to that brand's page */}
              {item.brand?._id && (
                <a
                  href={`/brand/${item.brand._id}`}
                  className="absolute top-3 left-3 bg-blue-950 text-white text-xs px-2 py-1 rounded-full hover:bg-blue-800 transition"
                >
                  {item.brand.name}
                </a>
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
      {!isSearching && effectiveTotalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-200 rounded-xl text-sm hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            ← Prev
          </button>

          {Array.from({ length: effectiveTotalPages }, (_, i) => (
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
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, effectiveTotalPages))}
            disabled={currentPage === effectiveTotalPages}
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
