import { useEffect, useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);

  const userId = "69c1986155ef2a5b74c037d0"; 

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
  try {
    const res = await fetch(`http://localhost:5000/api/cart/${userId}`);
    const data = await res.json();

    setCart(data.products || []); 
  } catch (error) {
    console.error(error);
    setCart([]); 
  }
};
  // Remove
  const removeFromCart = async (productId) => {
    await fetch("http://localhost:5000/api/cart/remove", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId })
    });

    fetchCart();
  };

  // Increase
  const increaseQty = async (productId) => {
    await fetch("http://localhost:5000/api/cart/increase", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId })
    });

    fetchCart();
  };

  // Decrease
  const decreaseQty = async (productId) => {
    await fetch("http://localhost:5000/api/cart/decrease", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId })
    });

    fetchCart();
  };

  // Total
 const total = cart?.reduce(
  (acc, item) => acc + (item.product?.price || 0) * (item.quantity || 0),
  0
) || 0;

//place order
const [loading, setLoading] = useState(false);


const placeOrder = async () => {
  try {
    setLoading(true);

    const res = await fetch("http://localhost:5000/api/orders/place", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Order failed");
    }

    alert("Order Placed ✅");

   
    setCart([]);

  } catch (error) {
    console.error(error);
    alert("Something went wrong ❌");
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