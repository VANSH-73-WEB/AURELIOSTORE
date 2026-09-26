import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BASE_URL from "../config/api";

const Middle = ({ searchInputRef, setProducts }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // The navbar search icon on other pages sends people here with
  // state.focusSearch, so land on the search box and focus it.
  useEffect(() => {
    if (!location.state?.focusSearch) return;
    const input = searchInputRef?.current;
    if (!input) return;
    input.scrollIntoView({ behavior: "smooth", block: "center" });
    input.focus({ preventScroll: true });
    // one-shot: clear it so a page reload doesn't jump to the search box again
    navigate(location.pathname, { replace: true, state: null });
  }, [location.state, location.pathname, navigate, searchInputRef]);

  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const searchProducts = async (searchQuery = query) => {
    if (!searchQuery.trim()) {
      setProducts([]);
      return;
    }
    setLoading(true);
    setShowDropdown(false);
    try {
      const res = await fetch(`${BASE_URL}/api/products/search?q=${encodeURIComponent(searchQuery)}`);
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }
    const delay = setTimeout(() => {
      fetch(`${BASE_URL}/api/products/suggest?q=${encodeURIComponent(query)}`)
        .then((res) => { if (!res.ok) throw new Error(); return res.json(); })
        .then((data) => { setSuggestions(data); setShowDropdown(true); })
        .catch(() => setSuggestions([]));
    }, 300);
    return () => clearTimeout(delay);
  }, [query]);

  return (
    // No overflow-hidden here: the suggestions dropdown hangs below the search card,
    // which is the last thing in this wrapper, so overflow-hidden would clip it.
    // z-20 keeps the whole block (and its dropdown) above the product grid below.
    <div className="relative z-20 w-full">
      {/* Hero Banner (overflow is clipped here instead, just around the image) */}
      <div className="relative h-[480px] md:h-[560px] w-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src="https://i.pinimg.com/1200x/ea/c5/d0/eac5d0031ac7f7f745ac1f21ba73a7e7.jpg"
          alt="Aurelio Store Banner"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        {/* Hero text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="text-white/70 text-sm tracking-[0.3em] uppercase mb-2 font-light">
            Premium Fashion & Lifestyle
          </p>
          <h1 className="text-white font-raleway font-thin text-5xl md:text-7xl xl:text-8xl tracking-[0.1em] uppercase drop-shadow-2xl">
            Shop
          </h1>
          <p className="text-white/80 text-base md:text-lg mt-4 max-w-md">
            Discover curated collections crafted for elegance
          </p>
        </div>
      </div>

      {/* Search Bar — floating card below hero */}
      <div className="bg-white shadow-xl rounded-2xl mx-4 md:mx-20 xl:mx-40 -mt-10 relative z-10 px-6 py-5 flex flex-col sm:flex-row items-center gap-4">
        <h2 className="font-raleway text-lg md:text-2xl text-gray-800 font-light whitespace-nowrap shrink-0">
          What are you looking for?
        </h2>

        <div className="relative flex-1 w-full">
          <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            ref={searchInputRef}
            className="w-full h-11 bg-gray-50 text-gray-700 rounded-full border border-gray-200 outline-none pl-10 pr-28 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
            placeholder="Search products, brands..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => suggestions.length && setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            onKeyDown={(e) => e.key === "Enter" && searchProducts()}
          />
          <button
            type="button"
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-950 text-white px-5 py-2 rounded-full text-sm cursor-pointer disabled:opacity-50 hover:bg-blue-800 transition"
            onClick={() => searchProducts()}
            disabled={loading}
          >
            {loading ? "..." : "Search"}
          </button>

          {/* Dropdown */}
          {showDropdown && suggestions.length > 0 && (
            <div className="absolute top-[48px] left-0 bg-white border border-gray-100 w-full rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto">
              {suggestions.map((item) => (
                <div
                  key={item._id}
                  className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center gap-3 text-sm text-gray-700 border-b border-gray-100 last:border-0"
                  onMouseDown={() => {
                    setQuery(item.title);
                    setShowDropdown(false);
                    searchProducts(item.title);
                  }}
                >
                  <i className="ri-search-line text-gray-400 text-xs" />
                  <span>
                    {item.title.split(new RegExp(`(${escapeRegex(query)})`, "gi")).map((part, i) =>
                      part.toLowerCase() === query.toLowerCase()
                        ? <b key={i} className="text-blue-800">{part}</b>
                        : part
                    )}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Middle;
