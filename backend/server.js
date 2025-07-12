import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import urlRoutes from "./routes/url.js";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import fs from "fs";
import authRoutes from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api/", limiter);


app.use(
  cors({
    origin: '*', // Allow all origins
    credentials: true // No cookies needed for API key auth
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Backend running on Render!");
});

mongoose
  .connect(
    process.env.DATABASE_URI || "mongodb://localhost:27017/urlshortener",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));



const swaggerDefinition = JSON.parse(
  fs.readFileSync("./config/swagger.json", "utf-8")
);

const swaggerOptions = {
  definition: swaggerDefinition,
  apis: ["./routes/url.js"],
};

if (process.env.NODE_ENV === "production") {
  swaggerOptions.definition.servers = [
    {
      url: "https://linfy.onrender.com/api",
      description: "Deployed Server",
    },
  ];
} else {
  swaggerOptions.definition.servers = [
    {
      url: `http://localhost:${PORT}/api`,
      description: "Local Development Server",
    },
  ];
}

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/auth", authRoutes);
app.use("/api", urlRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
  });
});

app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
