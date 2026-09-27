import mongoose from "mongoose";
import process from "process";

// Perf notes:
// - serverSelectionTimeoutMS: fail fast (10s) instead of mongoose's 30s default
//   if Atlas is unreachable, so a bad connection doesn't quietly eat 30s per request.
// - maxPoolSize: reuse up to 10 sockets instead of opening a new one per request.
// - autoIndex: keep default in dev, but this is where you'd flip it off in prod
//   once indexes are established, since index builds can briefly block writes.
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
