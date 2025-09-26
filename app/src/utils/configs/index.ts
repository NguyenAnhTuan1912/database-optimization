import dotenv from "dotenv";

dotenv.config();

export const Configs = {
  Host: process.env.HOST || "localhost",
  Port: parseInt(process.env.PORT || "7800"),
  DBOPDatabase: process.env.DBOP_DATABASE,
  DBOPHost: process.env.DBOP_HOST,
  DPOPPort: process.env.DBOP_PORT,
  DBOPUser: process.env.DBOP_USER,
  DBOPPassword: process.env.DBOP_PASSWORD,
  DBOPConnectionLimit: parseInt(process.env.DBOP_CONNECTION_LIMIT || "10"),
  SwaggerServerConfigHost:
    process.env.SWAGGER_SERVER_CONFIG_HOST || "localhost",
  SrcPath: process.env.SRC_PATH || "./src/logs",
  LogRoot: process.env.LOG_ROOT || "./",
};
