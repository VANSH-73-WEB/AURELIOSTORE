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
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    // ✅ Verify signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.json({ success: false, message: "Invalid signature" });
    }

    // ✅ Get user
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // ✅ CREATE ORDER
    const newOrder = await Order.create({
      userId: user._id,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      status: "paid",
      items: user.cart,
    });

    // ✅ CLEAR CART
    user.cart = [];
    await user.save();

    res.json({ success: true, order: newOrder });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err.message });
  }
};