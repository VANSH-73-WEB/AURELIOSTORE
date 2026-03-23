import Cart from "../models/Cart.js";

// ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

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
      cart.products.push({ product: productId });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET CART
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId })
      .populate("products.product");

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};