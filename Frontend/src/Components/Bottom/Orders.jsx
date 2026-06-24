import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config/api";

const statusColor = (status) => {
  switch ((status || "").toLowerCase()) {
    case "paid": return "bg-green-100 text-green-700";
    case "pending": return "bg-amber-100 text-amber-700";
    case "failed": return "bg-red-100 text-red-600";
    default: return "bg-gray-100 text-gray-500";
  }
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/api/orders/myorders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Orders fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center pt-20">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <i className="ri-loader-4-line text-4xl animate-spin" />
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] pt-24 pb-16 px-4 md:px-10 xl:px-20 bg-gray-50">
      <div className="flex items-center gap-3 mb-8">
        <i className="ri-file-list-3-line text-2xl text-blue-950" />
        <h2 className="text-2xl font-light text-gray-800 tracking-wide">My Orders</h2>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-5 py-20 text-center">
          <i className="ri-inbox-2-line text-6xl text-gray-200" />
          <p className="text-gray-400 text-lg">You haven't placed any orders yet</p>
          <button
            onClick={() => navigate("/home")}
            className="bg-blue-950 text-white px-8 py-3 rounded-xl hover:bg-blue-800 transition"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-6 py-4 bg-gray-50 border-b border-gray-100">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Order ID</p>
                  <p className="font-mono text-sm text-gray-700">#{order._id.slice(-10).toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Placed on</p>
                  <p className="text-sm text-gray-700">{new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Total</p>
                  <p className="font-semibold text-gray-800">₹{order.totalPrice?.toLocaleString("en-IN")}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(order.status)}`}>
                  {order.status || "Confirmed"}
                </span>
              </div>

              {/* Products */}
              <div className="px-6 py-4 divide-y divide-gray-50">
                {order.products.map((item) => (
                  <div key={item._id} className="flex items-center gap-4 py-3">
                    <img
                      src={item.product?.image}
                      alt={item.product?.title}
                      className="w-14 h-14 rounded-xl object-cover bg-gray-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-gray-800 line-clamp-1">{item.product?.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        ₹{item.product?.price?.toLocaleString("en-IN")} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-sm text-gray-800 shrink-0">
                      ₹{(item.product?.price * item.quantity)?.toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
