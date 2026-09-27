import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        },
        quantity: {
          type: Number,
          default: 1
        },
        // Price at the time of purchase, so the order total stays accurate
        // even if the product's price changes later.
        price: {
          type: Number
        }
      }
    ],
    totalPrice: {
      type: Number,
      required: true
    },
    // Razorpay identifiers. paymentId is unique+sparse: it's what duplicate-
    // payment detection keys off in verifyPayment, and previously wasn't even
    // in the schema, so it was silently dropped on save and that check never
    // actually caught a duplicate.
    paymentId: {
      type: String,
      unique: true,
      sparse: true
    },
    orderId: {
      type: String
    },
    status: {
      type: String,
      default: "Pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);