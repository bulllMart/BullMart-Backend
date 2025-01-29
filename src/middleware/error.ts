import { NextFunction, Request, Response } from "express";

//404 handler
const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found Endpoint - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

//common catch error handler
const errorHandler = (
  err: any,
  req: any,
  res: Response,
  next: NextFunction
) => {
  let statusCode;
  if (err?.isJoi === true) {
    statusCode = 422;
  } else {
    statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  }
  res.status(statusCode);
  res.json({
    message: err.message,
    statusMessage: "Error",
    stack: process.env.NODE_ENV === "PRODUCTION" ? null : err.stack,
  });
};

export { notFound, errorHandler };
