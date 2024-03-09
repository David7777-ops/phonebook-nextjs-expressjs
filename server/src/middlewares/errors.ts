import { Request, Response, NextFunction } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

class CustomError {
  message: string;
  status: number;
  constructor(message: string, status: number) {
    this.message = message;
    this.status = status;
  }
}

const handlePrismaError = (err: PrismaClientKnownRequestError) => {
  console.log(err.code);

  switch (err.code) {
    case "P2002":
      // handling duplicate key errors
      return new CustomError(
        `Uninque constraint failed on field value: ${err?.meta?.target}`,
        409
      );
    case "P2014":
      // handling invalid id errors
      return new CustomError(`Invalid ID: ${err?.meta?.target}`, 400);
    case "P2003":
      // handling invalid data errors
      return new CustomError(`Invalid input data: ${err?.meta?.target}`, 400);
    case "P2025":
      // handling not found error
      return new CustomError(`Resource not found.`, 404);
    default:
      // handling all other errors
      return new CustomError(`Something went wrong: ${err.message}`, 500);
  }
};

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500; //default status code for an error
  err.status = err.status || "error"; //default status

  let error = { ...err };

  error.message = err.message;
  if (err instanceof PrismaClientKnownRequestError) {
    console.log("handlePrismaError");
    error = handlePrismaError(err);
  }
  console.log({ status: err.status, message: err.message });
  return res
    .status(error.status)
    .json({ status: error.status, message: error.message });
};

export default errorHandler;
