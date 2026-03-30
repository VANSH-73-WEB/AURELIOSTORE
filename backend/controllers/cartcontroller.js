import Cart from "../models/Cart.js";

// ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }

    const index = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );

    if (index > -1) {
      cart.products[index].quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET CART
export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId })
      .populate("products.product");

    res.json({
      products: cart?.products || []
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Increase Quantity
export const increaseQty = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId });

  const item = cart.products.find(
    (p) => p.product.toString() === productId
  );

  if (item) item.quantity += 1;

  await cart.save();
  res.json(cart);
};

//Decrease Quantity
export const decreaseQty = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId });

  const item = cart.products.find(
    (p) => p.product.toString() === productId
  );

  if (item && item.quantity > 1) {
    item.quantity -= 1;
  }

  await cart.save();
  res.json(cart);
};

//Remove Item
export const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId });

  cart.products = cart.products.filter(
    (p) => p.product.toString() !== productId
  );

  await cart.save();
  res.json(cart);
};