import dotenv from "dotenv";

dotenv.config();

export const Configs = {
  // Setup server
  Host: process.env.HOST || "localhost",
  Port: parseInt(process.env.PORT || "7800"),

  // Setup Main Database
  DBOPDatabase: process.env.DBOP_DATABASE,
  DBOPHost: process.env.DBOP_HOST,
  DPOPPort: process.env.DBOP_PORT,
  DBOPUser: process.env.DBOP_USER,
  DBOPPassword: process.env.DBOP_PASSWORD,
  DBOPConnectionLimit: parseInt(process.env.DBOP_CONNECTION_LIMIT || "10"),

  // Setup Memory Database
  DBOPMemDBHost: process.env.DBOP_MEMDB_HOST,
  DBOPMemDBPort: process.env.DBOP_MEMDB_PORT,

  // Setup Swagger
  SwaggerServerConfigHost:
    process.env.SWAGGER_SERVER_CONFIG_HOST || "localhost",

  // Setup Paths
  SrcPath: process.env.SRC_PATH || "./src/logs",
  LogRoot: process.env.LOG_ROOT || "./",
};
