import mongoose from "mongoose";
import * as dotenv from "dotenv";

const initMongoose = async () => {
  dotenv.config();
  const connectionString = process.env.CONNECTION_STRING;

  if (connectionString) {
    mongoose.connect(connectionString, {
      autoIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (error) => {
      console.log("MongoDB connection error:", error);
    });

    return connection;
  }

  throw "No connection string";
};

export default initMongoose;
