import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

// Place Order
export const placeOrder = async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId }).populate("products.product");

  if (!cart || cart.products.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  // Calculate total
  const total = cart.products.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  //Create order
  const order = await Order.create({
  user: req.user._id,  
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