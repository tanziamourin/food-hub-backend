"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = notFound;
function notFound(req, res) {
    res.status(404).json({
        success: false,
        message: "Resource not found",
        details: "Cannot ".concat(req.method, " ").concat(req.originalUrl),
        timestamp: new Date().toISOString(),
    });
}
