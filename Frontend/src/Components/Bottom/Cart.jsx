import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BASE_URL = "https://aurelio-backend-ztel.onrender.com";

const Cart = () => {
  const [cart, setCart] = useState([]);



  useEffect(() => {
    fetchCart();
  }, []);

const fetchCart = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/cart`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();
  setCart(data.products || []);
};
  // Remove
  const removeFromCart = async (productId) => {
    const token = localStorage.getItem("token");
    await fetch(`${BASE_URL}/api/cart/remove`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" ,
         Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ productId })
    });

    fetchCart();
  };

  // Increase
  const increaseQty = async (productId) => {
    const token = localStorage.getItem("token");
    await fetch(`${BASE_URL}/api/cart/increase`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" ,
         Authorization: `Bearer ${token}`
       },
      body: JSON.stringify({ productId })
    });

    fetchCart();
  };

  // Decrease
  const decreaseQty = async (productId) => {
    const token = localStorage.getItem("token");
    await fetch(`${BASE_URL}/api/cart/decrease`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" ,
         Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ productId })
    });

    fetchCart();
  };

  // Total
 const total = cart?.reduce(
  (acc, item) => acc + (item.product?.price || 0) * (item.quantity || 0),
  0 ) || 0;

//place order
const [loading, setLoading] = useState(false);
const placeOrder = async () => {
  try {
    const token = localStorage.getItem("token");
    setLoading(true);

 const res = await fetch(`${BASE_URL}/api/payment/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        items: cart
      })
    });

  
    const data = await res.json();
console.log("DATA:", data);

if (!data?.razorpayOrder) {
  console.error("Invalid response:", data);
  toast.error("Order creation failed ❌");
  return;
}

    // 🔥 IMPORTANT PART STARTS HERE
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
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(response)
  });

  const verifyData = await verifyRes.json();
console.log("VERIFY RESPONSE:", verifyData);
  if (verifyData.success) {
    toast.success("Payment successful 🎉");
    setCart([]);
    // optionally redirect
    // navigate("/orders");
  } else {
    toast.error("Payment verification failed ❌");
  }

      },

      prefill: {
        name: "Vansh",
        email: "vansh@gmail.com",
        contact: "9999999999"
      },

      theme: {
        color: "#3399cc"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (error) {
    console.error(error);
    toast.error("Something went wrong ❌");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-[70vh] px-20 pt-30">
      <h2 className="text-2xl font-semibold mb-6 bg-blue-900 rounded-2xl px-6 py-2 text-white text-center">
        Your Cart
      </h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.product._id}
              className="flex items-center justify-between mb-5 p-4 border rounded-xl"
            >
              {/* Product */}
              <div className="flex items-center gap-4">
                <img
                  src={item.product.image}
                  className="w-16 h-16 rounded"
                />
                <div>
                  <h3>{item.product.title}</h3>
                  <p>₹{item.product.price}</p>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => decreaseQty(item.product._id)}
                  className="px-2 bg-gray-200 cursor-pointer"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => increaseQty(item.product._id)}
                  className="px-2 bg-gray-200 cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Subtotal */}
              <h2>
                ₹{item.product.price * item.quantity}
              </h2>

              {/* Remove */}
              <button
                onClick={() => removeFromCart(item.product._id)}
                className="text-red-500 cursor-pointer"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total */}
          <h2 className="text-2xl mt-5 text-right">
            Total: ₹{total}
          </h2>
          <button
  onClick={placeOrder}
  disabled={loading}
  className="bg-green-600 text-white px-6 py-2 rounded mt-5 float-right cursor-pointer">
  {loading ? "Placing..." : "Checkout"}
</button>
        </>
      )}
    </div>
  );
};

export default Cart;