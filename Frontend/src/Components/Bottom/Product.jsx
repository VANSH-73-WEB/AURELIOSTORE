import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config/api";
import { buyNow } from "../../Services/checkout";

const PRODUCTS_PER_PAGE = 12;

// Optional props (used by the category pages):
//   category / subCategory - only load products from that section
//   title / emptyMessage   - heading and empty-state text
// On the home page none of these are passed, so it behaves exactly as before.
const Product = ({
  products: searchResults,
  cart,
  setCart,
  category,
  subCategory,
  title = "All Products",
  emptyMessage = "No products found. Try a different search.",
}) => {
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [addingId, setAddingId] = useState(null);
  const [buyingId, setBuyingId] = useState(null);
  const navigate = useNavigate();

  // Quick View modal: `quickView` holds the full product (fetched fresh, since
  // the list view doesn't include the description) or null when closed.
  const [quickView, setQuickView] = useState(null);
  const [quickViewLoading, setQuickViewLoading] = useState(false);

  const openQuickView = async (item) => {
    setQuickViewLoading(true);
    setQuickView({ ...item }); // show what we already have immediately
    try {
      const res = await fetch(`${BASE_URL}/api/products/${item._id}`);
      if (res.ok) setQuickView(await res.json());
    } catch (error) {
      console.error(error);
    } finally {
      setQuickViewLoading(false);
    }
  };

  const handleBuyNow = async (item) => {
    setBuyingId(item._id);
    try {
      await buyNow(item, { navigate, toast });
    } finally {
      setBuyingId(null);
    }
  };

  // Price range slider. `bounds` is the real min/max for this section
  // (fetched once per category/subCategory); `range` is what the user has
  // dragged the slider to. Until bounds load we don't filter by price at all.
  const [bounds, setBounds] = useState(null);
  const [range, setRange] = useState(null);

  const isSearching = searchResults && searchResults.length > 0;

  // Load this section's actual price floor/ceiling so the slider reflects
  // real data instead of an arbitrary guessed range.
  useEffect(() => {
    if (isSearching) return;
    let ignore = false;
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (subCategory) params.set("subCategory", subCategory);

    fetch(`${BASE_URL}/api/products/price-range?${params}`)
      .then((res) => res.json())
      .then((data) => {
        if (ignore) return;
        const min = Math.floor(data.min ?? 0);
        const max = Math.ceil(data.max ?? 0);
        setBounds({ min, max });
        setRange({ min, max });
      })
      .catch(() => { if (!ignore) { setBounds(null); setRange(null); } });

    return () => { ignore = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, subCategory]);

  // Server-side pagination: only pull one page's worth of products at a time
  // instead of fetching the whole collection and slicing it in the browser.
  // Debounced ~350ms so dragging the price slider doesn't fire a request per pixel.
  useEffect(() => {
    if (isSearching) return; // search results are already a small, complete list

    let ignore = false;
    setLoadingProducts(true);

    const timeout = setTimeout(() => {
      const params = new URLSearchParams({ page: currentPage, limit: PRODUCTS_PER_PAGE });
      if (category) params.set("category", category);
      if (subCategory) params.set("subCategory", subCategory);
      if (range && bounds && (range.min > bounds.min || range.max < bounds.max)) {
        params.set("minPrice", range.min);
        params.set("maxPrice", range.max);
      }

      fetch(`${BASE_URL}/api/products?${params}`)
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
    }, 350);

    return () => { ignore = true; clearTimeout(timeout); };
  }, [currentPage, isSearching, category, subCategory, range, bounds]);

  // Dragging the slider should jump back to page 1, same as a new search
  useEffect(() => {
    setCurrentPage(1);
  }, [range]);

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
          <p className="text-lg">{emptyMessage}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 md:px-16 xl:px-20 py-10">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-light text-gray-800 tracking-wide">
          {isSearching ? `${searchResults.length} results` : title}
        </h2>
        {!isSearching && (
          <p className="text-sm text-gray-400">
            Page {currentPage} of {effectiveTotalPages}
          </p>
        )}
      </div>

      {/* Price range slider - only for browsing, not while showing search results */}
      {!isSearching && bounds && bounds.max > bounds.min && range && (
        <PriceSlider bounds={bounds} range={range} onChange={setRange} />
      )}

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
                  e.currentTarget.src = "/products/placeholder.svg";
                }}
              />
              {/* Quick view overlay */}
              <button
                type="button"
                onClick={() => openQuickView(item)}
                className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center"
              >
                <span className="opacity-0 group-hover:opacity-100 bg-white text-gray-800 text-xs px-4 py-2 rounded-full font-medium shadow transition-all duration-300">
                  Quick View
                </span>
              </button>
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
                <button
                  className="flex-1 py-2 bg-blue-950 text-white rounded-xl text-sm hover:bg-blue-800 transition-all duration-200 disabled:opacity-50"
                  onClick={() => handleBuyNow(item)}
                  disabled={buyingId === item._id}
                >
                  {buyingId === item._id ? (
                    <span className="flex items-center justify-center gap-1">
                      <i className="ri-loader-4-line animate-spin text-sm" /> Please wait...
                    </span>
                  ) : (
                    "Buy Now"
                  )}
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
      {quickView && (
        <QuickViewModal
          product={quickView}
          loading={quickViewLoading}
          onClose={() => setQuickView(null)}
          onAddToCart={addToCart}
          onBuyNow={handleBuyNow}
          addingId={addingId}
          buyingId={buyingId}
        />
      )}
    </section>
  );
};

// Dual-handle price slider: two native <input type="range"> stacked on top of
// each other (a common CSS-only way to get a min/max slider without a
// library). Each thumb is only clickable over its own pointer-events area,
// and the coloured track between them is a separate absolutely-positioned div.
const PriceSlider = ({ bounds, range, onChange }) => {
  const { min, max } = bounds;
  const span = Math.max(max - min, 1);
  const leftPct = ((range.min - min) / span) * 100;
  const rightPct = ((range.max - min) / span) * 100;

  const setMin = (v) => {
    const next = Math.min(Number(v), range.max);
    onChange({ ...range, min: next });
  };
  const setMax = (v) => {
    const next = Math.max(Number(v), range.min);
    onChange({ ...range, max: next });
  };

  return (
    <section className="px-6 md:px-16 xl:px-20 pt-2 pb-6">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <i className="ri-price-tag-3-line text-blue-950" /> Price range
          </h3>
          <span className="text-sm text-gray-500">
            ₹{range.min.toLocaleString("en-IN")} – ₹{range.max.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="relative h-6 flex items-center">
          {/* Track */}
          <div className="absolute inset-x-0 h-1.5 rounded-full bg-gray-100" />
          {/* Active range */}
          <div
            className="absolute h-1.5 rounded-full bg-blue-950"
            style={{ left: `${leftPct}%`, right: `${100 - rightPct}%` }}
          />
          <input
            type="range"
            min={min}
            max={max}
            value={range.min}
            onChange={(e) => setMin(e.target.value)}
            className="absolute inset-x-0 w-full appearance-none bg-transparent pointer-events-none accent-blue-950 [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
            aria-label="Minimum price"
          />
          <input
            type="range"
            min={min}
            max={max}
            value={range.max}
            onChange={(e) => setMax(e.target.value)}
            className="absolute inset-x-0 w-full appearance-none bg-transparent pointer-events-none accent-blue-950 [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
            aria-label="Maximum price"
          />
        </div>

        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>₹{min.toLocaleString("en-IN")}</span>
          <span>₹{max.toLocaleString("en-IN")}</span>
        </div>
      </div>
    </section>
  );
};

// Modal shown when a product's "Quick View" overlay is clicked. Opens with
// whatever data the grid already had (instant), then swaps in the full
// product (including description, which the list endpoint omits) once it loads.
const QuickViewModal = ({ product, loading, onClose, onAddToCart, onBuyNow, addingId, buyingId }) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto relative grid md:grid-cols-2 gap-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center text-gray-500 hover:text-gray-800 z-10"
          aria-label="Close"
        >
          <i className="ri-close-line text-xl" />
        </button>

        <div className="bg-gray-50 h-64 md:h-full">
          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
        </div>

        <div className="p-6 md:p-8 flex flex-col">
          {product.brand?.name && (
            <span className="inline-block w-fit bg-blue-950 text-white text-xs px-2 py-1 rounded-full mb-3">
              {product.brand.name}
            </span>
          )}
          <h2 className="text-xl font-semibold text-gray-800">{product.title}</h2>

          <div className="flex items-center gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <i
                key={s}
                className={`ri-star-fill text-sm ${s <= Math.round(product.rating || 4) ? "text-amber-400" : "text-gray-200"}`}
              />
            ))}
            <span className="text-xs text-gray-400 ml-1">({(product.rating || 4).toFixed(1)})</span>
          </div>

          <p className="text-2xl font-semibold text-blue-950 mt-4">
            ₹{product.price?.toLocaleString("en-IN")}
          </p>

          <p className="text-sm text-gray-500 mt-4 leading-relaxed">
            {loading && !product.description ? (
              <span className="inline-block h-4 w-full bg-gray-100 rounded animate-pulse" />
            ) : (
              product.description || "No description available."
            )}
          </p>

          {typeof product.stock === "number" && (
            <p className={`text-xs mt-3 ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
              {product.stock > 0 ? `In stock (${product.stock} available)` : "Out of stock"}
            </p>
          )}

          <div className="flex gap-3 mt-auto pt-6">
            <button
              className="flex-1 py-3 border border-blue-950 text-blue-950 rounded-xl text-sm hover:bg-blue-950 hover:text-white transition disabled:opacity-50"
              onClick={() => onAddToCart(product)}
              disabled={addingId === product._id}
            >
              {addingId === product._id ? "Adding..." : "Add to Cart"}
            </button>
            <button
              className="flex-1 py-3 bg-blue-950 text-white rounded-xl text-sm hover:bg-blue-800 transition disabled:opacity-50"
              onClick={() => onBuyNow(product)}
              disabled={buyingId === product._id}
            >
              {buyingId === product._id ? "Please wait..." : "Buy Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
