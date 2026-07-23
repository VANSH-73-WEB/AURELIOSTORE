import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  brand: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Brand",
  required: true 
}
}, { timestamps: true });

// Compound + text indexes so search/filter/list queries don't scan the whole collection
productSchema.index({ title: "text", description: "text" });
productSchema.index({ brand: 1, createdAt: -1 });
productSchema.index({ category: 1 });

export default  mongoose.model("Product", productSchema);