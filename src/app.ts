import express from "express";
import mongoose from "mongoose";

export default class App {
  PORT: number | string;
  app: express.Application;

  constructor() {
    this.PORT = 4000;
    this.app = express();

    this.initializeRoutes();
    this.connectDatabase();
    this.startServer();
  }

  startServer(): void {
    this.app.listen(this.PORT, () => {
      console.log(`Server is running on PORT: ${this.PORT}`);
    });
  }

  async connectDatabase(): Promise<void> {
    try {
      const uri = process.env.MONGODB_URI;
      if (!uri) {
        throw new Error("MongoDB connection uri is not available");
      }
      await mongoose.connect(uri);
      console.log("Database Connected");
    } catch (err) {
      console.log(err);
    }
  }

  initializeRoutes(): void {
    this.app.use(express.json());

    this.app.get("/health", (req, res) => {
      res.status(200).json({ status: "OK", message: "Server is running" });
    });
  }
}
