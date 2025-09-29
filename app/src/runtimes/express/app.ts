import express from "express";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

// Import configs
import { Configs } from "../../utils/configs/index.js";

// Import Swagger
import { swaggerDoc } from "../../core/docs/swagger/index.js";
import { registerRoutes } from "../../core/docs/swagger/helpers.js";

// Import routes
import { quotesRoutes } from "./routes/quotes/index.js";
import { usersRoutes } from "./routes/users/index.js";
// import { authRoutes } from "./routes/auth/index.js";
// import { pcustomersRoutes } from "./routes/pcustomer-management";

import { LoggerBuilder } from "../../utils/logger/index.js";

const app = express();
const reqLogger = new LoggerBuilder().to("requests").build();

// Add global middlewares
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inject global middleware for logging
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const msg = `[${req.method}] ${req.originalUrl} - ${res.statusCode} (${duration}ms)`;

    reqLogger.info(
      LoggerBuilder.buildNormalLog(msg, {
        userAgent: req.headers["user-agent"] || "Unknown",
        duration,
      })
    );
  });

  next();
});

// Register routes
registerRoutes(app, quotesRoutes, swaggerDoc);
registerRoutes(app, usersRoutes, swaggerDoc);
// registerRoutes(app, authRoutes, swaggerDoc);
// registerRoutes(app, pcustomersRoutes, swaggerDoc);

// Route swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use("/", (req, res) => {
  return res.json({
    data: { message: "Welcome to Cognito Example Application API" },
  });
});

app.listen(Configs.Port, Configs.Host, () => {
  const baseUrl = `http://${Configs.Host}:${Configs.Port}`;

  console.log(`✅ Server chạy tại ${baseUrl}`);
  console.log(`📖 Swagger UI tại ${baseUrl}/api-docs`);
});
