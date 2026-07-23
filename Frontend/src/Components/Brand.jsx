import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../config/api";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  return (
    <div className="w-full min-h-screen bg-[#f5f5f5] p-6 pt-28">

      {/* Hero Section */}
      <div className="bg-black text-white p-10 rounded-2xl mb-8">
        <h1 className="text-3xl font-bold">Shop by Brands</h1>
        <p className="text-sm mt-2">Explore products from top brands</p>
      </div>

      {/* Brand name filter (not the global product search) */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search brand..."
          className="w-full p-3 border rounded-lg outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white p-5 rounded-xl shadow animate-pulse h-32" />
          ))}
        </div>
      ) : filteredBrands.length === 0 ? (
        <p className="text-center text-gray-400 mt-10">No brands found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredBrands.map((brand) => (
            <div
              key={brand._id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg cursor-pointer transition"
              onClick={() => navigate(`/brand/${brand._id}`)}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                loading="lazy"
                className="h-16 mx-auto object-contain"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://via.placeholder.com/150?text=" + encodeURIComponent(brand.name);
                }}
              />
              <h2 className="text-center mt-3 font-semibold">
                {brand.name}
              </h2>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
