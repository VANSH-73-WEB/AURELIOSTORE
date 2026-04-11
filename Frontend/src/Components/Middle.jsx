import { useEffect, useRef, useState } from "react";

const BASE_URL = "https://aurelio-backend-ztel.onrender.com";

const Middle = ({ searchInputRef, setProducts }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // ✅ Unified search function
  const searchProducts = async (searchQuery = query) => {
    if (!searchQuery.trim()) {
      setProducts([]);
      return;
    }
    setLoading(true);
    setShowDropdown(false); // ✅ Close dropdown on search
    try {
      const res = await fetch(
        `${BASE_URL}/api/products/search?q=${encodeURIComponent(searchQuery)}`
      );
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Suggestions with debounce
  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      setShowDropdown(false); // ✅ Fix flicker on clear
      return;
    }

    const delay = setTimeout(() => {
      fetch(`${BASE_URL}/api/products/search?q=${encodeURIComponent(query)}`)
        .then((res) => {
          if (!res.ok) throw new Error("Suggestion fetch failed");
          return res.json();
        })
        .then((data) => {
          setSuggestions(data);
          setShowDropdown(true);
        })
        .catch((err) => {
          console.error("Suggestion error:", err);
          setSuggestions([]);
        });
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="flex justify-center items-center">
      <img
        className="w-full h-[500px] shadow-lg"
        src="https://i.pinimg.com/1200x/ea/c5/d0/eac5d0031ac7f7f745ac1f21ba73a7e7.jpg"
        alt="banner"
      />

      <h1 className="absolute top-11 bg-linear-to-t from-red-500 to-blue-500 bg-clip-text text-transparent font-raleway font-normal text-[300px] tracking-[0.15em]">
        Shop
      </h1>

      <div className="absolute w-340 h-30 bg-white rounded-tl-2xl rounded-tr-2xl top-100 flex">
        <h1 className="font-raleway text-4xl ml-3 mt-3">Give All You Need</h1>

        <div className="absolute top-5 right-5 cursor-pointer">
          <input
            autoFocus
            ref={searchInputRef}
            className="bg-white w-full h-[45px] text-gray-600 rounded-full border border-gray-300 outline-none pl-10 pr-28"
            placeholder="Search on Aurileo"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => suggestions.length && setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            onKeyDown={(e) => e.key === "Enter" && searchProducts()} // ✅ Enter key
          />

          <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

          {/* Dropdown */}
          {showDropdown && suggestions.length > 0 && (
            <div className="absolute top-[50px] left-0 bg-white border w-full rounded-xl shadow-lg z-50 max-h-[250px] overflow-y-auto">
              {suggestions.map((item) => (
                <div
                  key={item._id}
                  className="p-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                  onMouseDown={() => { // ✅ onMouseDown avoids onBlur race condition
                    setQuery(item.title);
                    setShowDropdown(false);
                    searchProducts(item.title); // ✅ Pass selected title directly
                  }}
                >
                  <span>
                    {item.title
                      .split(new RegExp(`(${escapeRegex(query)})`, "gi"))
                      .map((part, i) =>
                        part.toLowerCase() === query.toLowerCase() ? (
                          <b key={i} className="text-black">{part}</b>
                        ) : (
                          part
                        )
                      )}
                  </span>
                </div>
              ))}
            </div>
          )}

          <button
            type="button"
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-black text-white px-6 py-2 rounded-full cursor-pointer disabled:opacity-50"
            onClick={() => searchProducts()}
            disabled={loading} // ✅ Prevent spam clicks
          >
            {loading ? "..." : "Search"} {/* ✅ Loading feedback */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Middle;