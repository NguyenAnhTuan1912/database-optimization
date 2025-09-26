import path from "path";

import swaggerJSDoc from "swagger-jsdoc";

// Import constants
import { Configs } from "../../../utils/configs";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cognito Example Application with Typescript",
      version: "1.0.0",
      description:
        "Tài liệu API cho Cognito Example Application with Typescript",
    },
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
    servers: [
      {
        url: `http://${Configs.SwaggerServerConfigHost}:${Configs.Port}`,
      },
    ],
  },
  apis: [path.join(__dirname, "./routes/*.js")], // nơi chứa comment swagger
};

/** Main Swagger Doc */
const swaggerDoc = swaggerJSDoc(options);

export { swaggerDoc };
