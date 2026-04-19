

import Razorpay from "razorpay";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import dotenv from "dotenv";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});

// Place Order
export const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId }).populate("products.product");

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // ✅ Calculate total price
    const totalAmount = cart.products.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);

    // ✅ Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: totalAmount * 100, // convert to paisa
      currency: "INR"
    });

    // ✅ Save order in DB
    const order = await Order.create({
      user: userId,
      products: cart.products,
      totalPrice: totalAmount,
      status: "Pending"
    });

    // ✅ Send response (IMPORTANT 🔥)
    res.status(200).json({
      message: "Order created successfully",
      order,
      razorpayOrder
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//Get User Orders
export const getOrders = async (req, res) => {
  const { userId } = req.params;

  const orders = await Order.find({ user: userId }).populate("products.product");

  res.json(orders);
};
//order history
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("products.product")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};