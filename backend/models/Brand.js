import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  name: String,
  logo: String,
  description: String,
});

export default mongoose.model("Brand", brandSchema);