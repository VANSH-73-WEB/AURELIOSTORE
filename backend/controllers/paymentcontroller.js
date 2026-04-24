import crypto from "crypto";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import razorpay from "../config/razorpay.js";
import User from "../models/User.js";

export const createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "No items provided" });
    }

    // ✅ Calculate total
    const totalAmountArr = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) throw new Error("Product not found");
        return product.price * item.quantity;
      })
    );

    const finalAmount = totalAmountArr.reduce((a, b) => a + b, 0);

    // ✅ Create Razorpay order
    const order = await razorpay.orders.create({
      amount: finalAmount * 100,
      currency: "INR",
      receipt: "order_" + Date.now(),
    });

    res.json({
      success: true,
      razorpayOrder: order,
    });

  } catch (err) {
    console.log("CREATE ORDER ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    console.log("verify api hit");

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    // ✅ Validate input
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid payment data" });
    }

    // ✅ Check auth
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // ✅ Prevent duplicate orders
    const existingOrder = await Order.findOne({
      paymentId: razorpay_payment_id
    });

    if (existingOrder) {
      return res.json({ success: true, order: existingOrder });
    }

    // ✅ Verify signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.json({ success: false, message: "Invalid signature" });
    }

    // ✅ Get cart
    const cart = await Cart.findOne({ user: req.user._id }).populate("products.product");

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // ✅ Calculate total
    const total = cart.products.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    // ✅ Create order
    const order = await Order.create({
      user: req.user._id,
      products: cart.products,
      totalPrice: total,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      status: "paid",
    });

    // ✅ Clear cart
    cart.products = [];
    await cart.save();

    res.json({ success: true, order });

  } catch (err) {
    console.log("VERIFY ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};