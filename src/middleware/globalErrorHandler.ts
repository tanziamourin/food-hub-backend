import { NextFunction, Request, Response } from "express";
// import { Prisma } from "../../generated/prisma/client";
import { ZodError } from "zod";
import { Prisma } from "../generated/client/client";
// import { Prisma } from "../generated/client";

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode = err.statusCode || err.status || 500;
  let message = err.message || "Internal Server Error";
  let details: any = null;

  //  ZOD VALIDATION ERROR
  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation failed";

    details = err.issues.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));
  }

  // Prisma Validation Error
  else if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = "Invalid request data";
    details = err.message;
  }

  //  Prisma Known Errors
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        statusCode = 409;
        message = "Duplicate value violates unique constraint";
        details = err.meta;
        break;

      case "P2025":
        statusCode = 404;
        message = "Requested record not found";
        details = err.meta;
        break;

      case "P2003":
        statusCode = 400;
        message = "Invalid foreign key reference";
        details = err.meta;
        break;

      default:
        statusCode = 400;
        message = "Database request error";
        details = err.meta;
    }
  }

  //  Unknown DB Error
  else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    statusCode = 500;
    message = "Unknown database error occurred";
    details = err.message;
  }

  //  Rust Panic
  else if (err instanceof Prisma.PrismaClientRustPanicError) {
    statusCode = 500;
    message = "Critical database error (Rust panic)";
    details = err.message;
  }

  //  Initialization Error
  else if (err instanceof Prisma.PrismaClientInitializationError) {
    statusCode = 500;
    message = "Failed to initialize database connection";
    details = err.message;
  }

  // ✅ Final Response
  res.status(statusCode).json({
    success: false,
    message,
    details,
    stack:
      process.env.NODE_ENV === "production"
        ? undefined
        : err.stack,
  });
}

export default errorHandler;