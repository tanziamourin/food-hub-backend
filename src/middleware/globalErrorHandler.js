"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("../../generated/prisma/client");
// Global Error Handler
function errorHandler(err, req, res, next) {
    var statusCode = err.statusCode || err.status || 500;
    var message = err.message || "Internal Server Error";
    var details = null;
    // Prisma Errors Handling 
    //  Validation Error
    if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        statusCode = 400;
        message = "Invalid request data";
        details = err.message;
    }
    //  Known Request Errors
    else if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
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
    //  Unknown Error
    else if (err instanceof client_1.Prisma.PrismaClientUnknownRequestError) {
        statusCode = 500;
        message = "Unknown database error occurred";
        details = err.message;
    }
    //  Rust Panic Error
    else if (err instanceof client_1.Prisma.PrismaClientRustPanicError) {
        statusCode = 500;
        message = "Critical database error (Rust panic)";
        details = err.message;
    }
    //  Initialization Error
    else if (err instanceof client_1.Prisma.PrismaClientInitializationError) {
        statusCode = 500;
        message = "Failed to initialize database connection";
        details = err.message;
    }
    // Response
    res.status(statusCode).json({
        success: false,
        message: message,
        details: details,
        stack: process.env.NODE_ENV === "production"
            ? undefined
            : err.stack,
    });
}
exports.default = errorHandler;
