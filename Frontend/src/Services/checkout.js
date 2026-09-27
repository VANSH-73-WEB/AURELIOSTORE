import BASE_URL from "../config/api";

// "Buy Now" checkout for a single product - opens the Razorpay payment
// gateway directly, without adding the item to the cart first. Cart.jsx has
// its own version of this same flow for a full cart; keep both in sync if
// the payment API changes.
export const buyNow = async (product, { navigate, toast }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Please log in to continue.");
    navigate("/login");
    return;
  }

  const items = [{ product: product._id, quantity: 1 }];

  try {
    const res = await fetch(`${BASE_URL}/api/payment/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ items }),
    });
    const data = await res.json();

    if (!data?.razorpayOrder) {
      toast.error("Could not start checkout. Please try again.");
      return;
    }

    const options = {
      key: "rzp_test_Se5Te4VnkFenwc",
      amount: data.razorpayOrder.amount,
      currency: "INR",
      name: "Aurelio Store",
      description: product.title,
      order_id: data.razorpayOrder.id,
      handler: async function (response) {
        const verifyRes = await fetch(`${BASE_URL}/api/payment/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          // fromCart is omitted (false) - this purchase didn't come from the
          // cart, so nothing there should be touched.
          body: JSON.stringify({ ...response, items }),
        });
        const verifyData = await verifyRes.json();
        if (verifyData.success) {
          toast.success("Payment successful! 🎉");
          navigate("/orders");
        } else {
          toast.error("Payment verification failed.");
        }
      },
      prefill: { name: "Customer", email: "", contact: "" },
      theme: { color: "#1e3a5f" },
    };

    if (!window.Razorpay) {
      toast.error("Payment gateway failed to load. Check your connection and try again.");
      return;
    }

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong. Please try again.");
  }
};
