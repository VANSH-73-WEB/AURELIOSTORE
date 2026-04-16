import razorpay from "../config/razorpay.js";
export const createOrder = async (req, res) => {
  try {
    if (!req.body || !req.body.amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "order_" + Date.now()
    };

    const order = await razorpay.orders.create(options);

    res.json(order);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
