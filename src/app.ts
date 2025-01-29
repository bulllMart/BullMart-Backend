import express, { Application, Request, Response } from "express";
import morgan from "morgan";

import { PORT } from "./config";
import { errorHandler, notFound } from "./middleware/error";
import router from "./router";

const app: Application = express();

app.use(express.json());

// setup morgan
app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json("Server is up and running 🚀🚀");
});

app.use("/v1/api", router);

// error handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is up and running : ${PORT} 🚀`);
});
