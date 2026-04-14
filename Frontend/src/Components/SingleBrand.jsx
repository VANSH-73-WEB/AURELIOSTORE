import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

export default function SingleBrand() {
  const { id } = useParams();
  const [brand, setBrand] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchBrand();
    fetchProducts();
  }, [id]);

  const fetchBrand = async () => {
    const res = await axios.get(`${BASE_URL}/api/brands/${id}`);
    setBrand(res.data);
  };

  const fetchProducts = async () => {
    const res = await axios.get(`${BASE_URL}/api/products?brand=${id}`);
    setProducts(res.data);
  };

  return (
    <div className="p-6">

      {/* 🔹 Brand Header */}
      {brand && (
        <div className="bg-gray-100 p-6 rounded-xl mb-6 text-center">
          <img src={brand.logo} className="h-20 mx-auto" />
          <h1 className="text-2xl font-bold mt-2">{brand.name}</h1>
          <p className="text-sm text-gray-600">{brand.description}</p>
        </div>
      )}

      {/* 🔹 Products */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p._id} className="border p-4 rounded-xl">
            <img src={p.image} className="h-40 mx-auto" />
            <h2 className="text-sm font-semibold mt-2">{p.name}</h2>
            <p className="text-green-600">₹{p.price}</p>
          </div>
        ))}
      </div>

    </div>
  );
}