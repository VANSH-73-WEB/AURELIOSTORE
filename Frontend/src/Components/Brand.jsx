import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000"; // change if deployed

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [search, setSearch] = useState("");
  
  const fetchBrands = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/brands`);
      setBrands(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  const filteredBrands = brands.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
);

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#f5f5f5] p-6">

      {/* 🔹 Hero Section */}
      <div className="bg-black text-white p-10 rounded-2xl mb-8">
        <h1 className="text-3xl font-bold">Shop by Brands</h1>
        <p className="text-sm mt-2">Explore products from top brands</p>
      </div>

      {/* 🔹 Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search brand..."
          className="w-full p-3 border rounded-lg outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 🔹 Brands Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filteredBrands.map((brand) => (
          <div
            key={brand._id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg cursor-pointer transition"
            onClick={() => window.location.href = `/brand/${brand._id}`}
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-16 mx-auto object-contain"
            />
            <h2 className="text-center mt-3 font-semibold">
              {brand.name}
            </h2>
          </div>
        ))}
      </div>

    </div>
  );
}