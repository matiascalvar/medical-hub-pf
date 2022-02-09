import dotenv from "dotenv";

dotenv.config();

const config = {
  dbUser: process.env.DB_USER || "yytgfamu",
  dbPassword: process.env.DB_PASSWORD || "o7PCNaSN1dGtgQVIPHEUYsMmmcdloHQm",
  dbHost: process.env.DB_HOST || "kesavan.db.elephantsql.com",
  dbName: process.env.DB_NAME || "yytgfamu",
  dbPort: process.env.DB_PORT || "5432",
  dev: process.env.NODE_ENV !== "production",
  port: process.env.API_PORT || "3001",
  host: process.env.API_host || "localhost",
  cors: process.env.CORS || "http://localhost:3000",
};
// LOCAL || DEPLOY

export default config;
