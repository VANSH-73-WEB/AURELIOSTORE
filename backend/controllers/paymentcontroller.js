import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import Product from "../models/Product.js"; 

export const createOrder = async (req, res) => {
  try {
    
    const { items } = req.body;

const totalAmount = await Promise.all(
  items.map(async (item) => {
    const product = await Product.findById(item.product);
    return product.price * item.quantity;
  })
);

const finalAmount = totalAmount.reduce((a, b) => a + b, 0);

    const options = {
      amount: finalAmount * 100,
      currency: "INR",
      receipt: "order_" + Date.now()
    };

    const order = await razorpay.orders.create(options);

    // ✅ FIX HERE
    res.json({
      success: true,
      razorpayOrder: order
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