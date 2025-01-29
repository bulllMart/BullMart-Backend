import dotenv from "dotenv";
dotenv.config({
  path: process.env.NODE_ENV === "PRODUCTION" ? ".env.prod" : ".env.dev",
});

export const PORT = process.env.PORT || 3000;
