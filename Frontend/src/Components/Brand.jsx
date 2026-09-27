import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL from "../config/api";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fallback product search - fires only when the brand-name filter below
  // comes up empty, so e.g. searching "jbl" (a product/brand name that isn't
  // a registered Brand document) still surfaces something instead of a
  // dead-end "No brands found."
  const [productResults, setProductResults] = useState([]);
  const [productSearchLoading, setProductSearchLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    const fetchBrands = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/brands`);
        if (!ignore) setBrands(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchBrands();
    return () => { ignore = true; };
  }, []);

  const filteredBrands = brands.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  // No standalone /product/:id page exists yet, so a fallback product result
  // adds straight to cart rather than navigating somewhere that 404s.
  const addToCart = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to your cart.");
      return;
    }
    try {
      const res = await fetch(`${BASE_URL}/api/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ productId: product._id }),
      });
      if (!res.ok) throw new Error("Failed to add");
      toast.success(`${product.title} added to cart 🛒`);
    } catch (err) {
      console.error(err);
      toast.error("Could not add to cart.");
    }
  };

  useEffect(() => {
    if (!search.trim() || filteredBrands.length > 0) {
      setProductResults([]);
      return;
    }
    let ignore = false;
    setProductSearchLoading(true);
    const timeout = setTimeout(() => {
      axios
        .get(`${BASE_URL}/api/products/search`, { params: { q: search.trim() } })
        .then((res) => { if (!ignore) setProductResults(res.data); })
        .catch(() => { if (!ignore) setProductResults([]); })
        .finally(() => { if (!ignore) setProductSearchLoading(false); });
    }, 350);
    return () => { ignore = true; clearTimeout(timeout); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filteredBrands.length]);

  return (
    <div className="pt-24 md:pt-28 min-h-screen bg-[#f8f8f8]">
      <div className="px-6 md:px-16 xl:px-20">
        {/* Breadcrumb - matches Category.jsx */}
        <nav className="text-sm text-gray-400 flex items-center gap-1" aria-label="Breadcrumb">
          <span className="hover:text-blue-950 transition">Home</span>
          <i className="ri-arrow-right-s-line" />
          <span className="text-gray-600">Brands</span>
        </nav>

        {/* Header - same rounded, image-backed banner style as Category.jsx */}
        <div className="mt-4 rounded-2xl overflow-hidden relative text-white px-6 md:px-10 py-8 md:py-10 flex items-center gap-5 min-h-[140px] bg-blue-950">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950" />
          <span className="relative w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-3xl">
            <i className="ri-price-tag-3-line" />
          </span>
          <div className="relative">
            <h1 className="font-raleway text-2xl md:text-4xl font-light tracking-wide">Shop by Brands</h1>
            <p className="text-white/70 text-sm mt-1">Explore products from top brands</p>
          </div>
        </div>

        {/* Search - same input language used across the app */}
        <div className="mt-6 max-w-md">
          <div className="relative">
            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search brand..."
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none text-sm focus:border-blue-950 transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <section className="px-6 md:px-16 xl:px-20 py-10">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 h-36 animate-pulse" />
            ))}
          </div>
        ) : filteredBrands.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredBrands.map((brand) => (
              <div
                key={brand._id}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-950/20 cursor-pointer transition-all duration-300 p-6 flex flex-col items-center gap-3"
                onClick={() => navigate(`/brand/${brand._id}`)}
              >
                <div className="w-16 h-16 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    loading="lazy"
                    className="h-10 w-10 object-contain group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://via.placeholder.com/150?text=" + encodeURIComponent(brand.name);
                    }}
                  />
                </div>
                <h2 className="text-center text-sm font-medium text-gray-700 group-hover:text-blue-950 transition-colors">
                  {brand.name}
                </h2>
              </div>
            ))}
          </div>
        ) : search.trim() && productSearchLoading ? (
          <div className="flex flex-col items-center gap-3 text-gray-400 py-16">
            <i className="ri-loader-4-line animate-spin text-3xl" />
            <p className="text-sm">Searching products for &ldquo;{search}&rdquo;...</p>
          </div>
        ) : search.trim() && productResults.length > 0 ? (
          <div>
            <p className="text-sm text-gray-500 mb-5">
              No brand named &ldquo;{search}&rdquo; - here's what we found in products instead:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {productResults.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg cursor-pointer transition group"
                  onClick={() => addToCart(product)}
                  title="Add to cart"
                >
                  <div className="relative h-32">
                    <img
                      src={product.image}
                      alt={product.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 bg-white text-gray-800 text-xs px-3 py-1.5 rounded-full font-medium transition flex items-center gap-1">
                        <i className="ri-shopping-cart-line" /> Add to Cart
                      </span>
                    </span>
                  </div>
                  <div className="p-3">
                    <h2 className="font-medium text-sm text-gray-700 line-clamp-2">{product.title}</h2>
                    <p className="text-blue-950 font-semibold text-sm mt-1">
                      ₹{product.price?.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 text-gray-400 py-16">
            <i className="ri-price-tag-3-line text-5xl" />
            <p className="text-lg text-gray-500">
              {search.trim() ? `No brands or products matched "${search}"` : "No brands yet - check back soon."}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
