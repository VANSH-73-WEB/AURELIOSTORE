import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

// 🧾 Place Order
export const placeOrder = async (req, res) => {
  const { userId } = req.body;

  const cart = await Cart.findOne({ userId }).populate("products.product");

  if (!cart || cart.products.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  // 💰 Calculate total
  const total = cart.products.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  //Create order
  const order = await Order.create({
    userId,
    products: cart.products,
    totalPrice: total
  });

  //Clear cart
  cart.products = [];
  await cart.save();

  res.json({
    message: "Order placed successfully",
    order
  });
};

//Get User Orders
export const getOrders = async (req, res) => {
  const { userId } = req.params;

  const orders = await Order.find({ userId }).populate("products.product");

  res.json(orders);
};