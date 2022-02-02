"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
exports.default = config;
