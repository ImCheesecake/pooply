// MUST be first to load environment variables before other imports
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { getLocalIp } from "./utils/localIp";
import authRoutes from "./routes/auth";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

// Swagger Setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pooply API",
      version: "1.0.0",
      description: "API for Pooply Health Tracker",
    },
    servers: [
      {
        url: `http://${getLocalIp()}:${PORT}`,
        description: "Local Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Basic Route
app.get("/", (req, res) => {
  res.send("Pooply API is running 💩");
});

// Start Server
app.listen(PORT, "0.0.0.0", () => {
  const localIp = getLocalIp();
  console.log(`\n🚀 Server running at: http://localhost:${PORT}`);
  console.log(`📡 LAN Access: http://${localIp}:${PORT}`);
  console.log(`📄 API Docs: http://${localIp}:${PORT}/api-docs\n`);
});
