import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../config/api";

// NOTE: this page intentionally has no search bar / suggestion dropdown -
// it's a focused "here's the brand logo + only its products" view.
export default function SingleBrand() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [brand, setBrand] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    setLoading(true);

    Promise.all([
      axios.get(`${BASE_URL}/api/brands/${id}`),
      axios.get(`${BASE_URL}/api/products?brand=${id}&limit=100`),
    ])
      .then(([brandRes, productsRes]) => {
        if (ignore) return;
        setBrand(brandRes.data);
        // getProducts now returns { products, total, page, pages }
        setProducts(productsRes.data.products ?? productsRes.data);
      })
      .catch((err) => console.error(err))
      .finally(() => { if (!ignore) setLoading(false); });

    return () => { ignore = true; };
  }, [id]);

  return (
    <div className="p-6 pt-28 min-h-screen">
      <button
        onClick={() => navigate("/brands")}
        className="text-sm text-blue-950 mb-4 hover:underline"
      >
        ← All Brands
      </button>

      {/* Brand Header - logo appears here after clicking the brand */}
      {brand && (
        <div className="bg-gray-100 p-6 rounded-xl mb-6 text-center">
          <img
            src={brand.logo}
            alt={brand.name}
            className="h-20 mx-auto object-contain"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://via.placeholder.com/150?text=" + encodeURIComponent(brand.name || "Brand");
            }}
          />
          <h1 className="text-2xl font-bold mt-2">{brand.name}</h1>
          {brand.description && <p className="text-sm text-gray-600">{brand.description}</p>}
        </div>
      )}

      {/* Products for this brand */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border p-4 rounded-xl animate-pulse h-52" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-400 mt-10">No products found for this brand yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p._id} className="border p-4 rounded-xl bg-white">
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                className="h-40 w-full object-cover rounded-lg mx-auto"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://via.placeholder.com/300?text=" + encodeURIComponent(p.title || "Product");
                }}
              />
              <h2 className="text-sm font-semibold mt-2 line-clamp-2">{p.title}</h2>
              <p className="text-green-600 font-medium">₹{p.price?.toLocaleString("en-IN")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
