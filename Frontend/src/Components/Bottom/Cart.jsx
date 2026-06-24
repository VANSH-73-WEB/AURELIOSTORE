import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config/api";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setFetching(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCart(data.products || []);
    } catch (err) {
      console.error(err);
      toast.error("Could not load cart.");
    } finally {
      setFetching(false);
    }
  };

  const removeFromCart = async (productId) => {
    const token = localStorage.getItem("token");
    await fetch(`${BASE_URL}/api/cart/remove`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ productId }),
    });
    fetchCart();
    toast.info("Item removed from cart");
  };

  const increaseQty = async (productId) => {
    const token = localStorage.getItem("token");
    await fetch(`${BASE_URL}/api/cart/increase`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ productId }),
    });
    fetchCart();
  };

  const decreaseQty = async (productId) => {
    const token = localStorage.getItem("token");
    await fetch(`${BASE_URL}/api/cart/decrease`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ productId }),
    });
    fetchCart();
  };

  const total = cart?.reduce((acc, item) => acc + (item.product?.price || 0) * (item.quantity || 0), 0) || 0;
  const itemCount = cart?.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0;

  const placeOrder = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/api/payment/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ items: cart }),
      });

      const data = await res.json();
      if (!data?.razorpayOrder) {
        toast.error("Order creation failed. Please try again.");
        return;
      }

      const options = {
        key: "rzp_test_Se5Te4VnkFenwc",
        amount: data.razorpayOrder.amount,
        currency: "INR",
        name: "Aurelio Store",
        description: "Order Payment",
        order_id: data.razorpayOrder.id,
        handler: async function (response) {
          const verifyRes = await fetch(`${BASE_URL}/api/payment/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify(response),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            toast.success("Payment successful! 🎉");
            setCart([]);
            navigate("/orders");
          } else {
            toast.error("Payment verification failed.");
          }
        },
        prefill: { name: "Customer", email: "", contact: "" },
        theme: { color: "#1e3a5f" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center pt-20">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <i className="ri-loader-4-line text-4xl animate-spin" />
          <p>Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] pt-24 pb-16 px-4 md:px-10 xl:px-20 bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <i className="ri-shopping-cart-2-line text-2xl text-blue-950" />
        <h2 className="text-2xl font-light text-gray-800 tracking-wide">Your Cart</h2>
        {cart.length > 0 && (
          <span className="bg-blue-950 text-white text-xs px-2 py-1 rounded-full">
            {itemCount} item{itemCount !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-5 py-20 text-center">
          <i className="ri-shopping-cart-line text-6xl text-gray-200" />
          <p className="text-gray-400 text-lg">Your cart is empty</p>
          <button
            onClick={() => navigate("/home")}
            className="bg-blue-950 text-white px-8 py-3 rounded-xl hover:bg-blue-800 transition"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            {cart.map((item) => (
              <div
                key={item.product._id}
                className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
              >
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-20 h-20 rounded-xl object-cover bg-gray-50 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-800 text-sm leading-snug line-clamp-2">
                    {item.product.title}
                  </h3>
                  <p className="text-blue-950 font-semibold mt-1">
                    ₹{item.product.price?.toLocaleString("en-IN")}
                  </p>
                </div>

                {/* Qty Controls */}
                <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1 shrink-0">
                  <button
                    onClick={() => decreaseQty(item.product._id)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition text-gray-600 font-bold"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item.product._id)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition text-gray-600 font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right shrink-0 hidden sm:block">
                  <p className="text-xs text-gray-400">Subtotal</p>
                  <p className="font-semibold text-gray-800">
                    ₹{(item.product.price * item.quantity)?.toLocaleString("en-IN")}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.product._id)}
                  className="text-gray-300 hover:text-red-500 transition shrink-0 ml-2"
                  title="Remove"
                >
                  <i className="ri-delete-bin-line text-xl" />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="xl:w-80 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="font-semibold text-gray-800 mb-5 text-lg">Order Summary</h3>

              <div className="space-y-3 text-sm text-gray-600 border-b pb-4 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>₹{total?.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes (18% GST)</span>
                  <span>₹{Math.round(total * 0.18)?.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-gray-900 text-base mb-6">
                <span>Total</span>
                <span>₹{Math.round(total * 1.18)?.toLocaleString("en-IN")}</span>
              </div>

              <button
                onClick={placeOrder}
                disabled={loading}
                className="w-full bg-blue-950 text-white py-3 rounded-xl font-medium hover:bg-blue-800 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><i className="ri-loader-4-line animate-spin" /> Processing...</>
                ) : (
                  <><i className="ri-secure-payment-line" /> Checkout Securely</>
                )}
              </button>

              <button
                onClick={() => navigate("/home")}
                className="w-full mt-3 text-sm text-gray-400 hover:text-gray-600 transition"
              >
                ← Continue Shopping
              </button>

              {/* Trust badges */}
              <div className="mt-5 pt-4 border-t flex justify-center gap-5 text-gray-300 text-xs text-center">
                <div className="flex flex-col items-center gap-1">
                  <i className="ri-shield-check-line text-lg" />
                  <span>Secure</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <i className="ri-truck-line text-lg" />
                  <span>Free Ship</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <i className="ri-refresh-line text-lg" />
                  <span>Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
