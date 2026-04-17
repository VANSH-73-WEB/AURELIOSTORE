import razorpay from "../config/razorpay.js";
import crypto from "crypto";
export const createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // ✅ Calculate total safely in backend
    let totalAmount = 0;

    items.forEach(item => {
      totalAmount += item.product.price * item.quantity;
    });

    const options = {
      amount: totalAmount * 100, // convert to paise
      currency: "INR",
      receipt: "order_" + Date.now()
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // ✅ Send BOTH order + razorpay order
    res.json({
      success: true,
      razorpayOrder,
      amount: totalAmount
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const verifyPayment = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    return res.json({
      success: true,
      message: "Payment verified successfully"
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid signature"
    });
  }
};