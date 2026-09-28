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
      items,     // [{ product, quantity }] - same list sent to /order. Present for
                 // both "Buy Now" (one product) and cart checkout.
      fromCart,  // true only for a cart checkout, so we know to clear those lines
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

    let orderProducts;
    let total;

    if (Array.isArray(items) && items.length > 0) {
      // Build the order from exactly what was paid for, whether that's a
      // single "Buy Now" item or a cart's worth of items - not from whatever
      // happens to be in the cart right now.
      orderProducts = await Promise.all(
        items.map(async (item) => {
          const product = await Product.findById(item.product).select("price title image").lean();
          if (!product) throw new Error("Product not found");
          return {
            product: item.product,
            quantity: item.quantity || 1,
            price: product.price,
            title: product.title,
            image: product.image,
          };
        })
      );
      total = orderProducts.reduce((acc, i) => acc + i.price * i.quantity, 0);

      if (fromCart) {
        const cart = await Cart.findOne({ user: req.user._id });
        if (cart) {
          const purchasedIds = new Set(items.map((i) => String(i.product)));
          cart.products = cart.products.filter((p) => !purchasedIds.has(String(p.product)));
          await cart.save();
        }
      }
    } else {
      // Backward-compatible fallback if no items were sent: use the cart as-is.
      const cart = await Cart.findOne({ user: req.user._id }).populate("products.product");

      if (!cart || cart.products.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }

      orderProducts = cart.products.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
        title: item.product.title,
        image: item.product.image,
      }));
      total = orderProducts.reduce((acc, i) => acc + i.price * i.quantity, 0);

      cart.products = [];
      await cart.save();
    }

    // ✅ Create order
    const order = await Order.create({
      user: req.user._id,
      products: orderProducts,
      totalPrice: total,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      status: "paid",
    });

    res.json({ success: true, order });

  } catch (err) {
    console.log("VERIFY ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};