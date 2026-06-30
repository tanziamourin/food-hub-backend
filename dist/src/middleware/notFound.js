export function notFound(req, res) {
    res.status(404).json({
        success: false,
        message: "Resource not found",
        details: `Cannot ${req.method} ${req.originalUrl}`,
        timestamp: new Date().toISOString(),
    });
}
//# sourceMappingURL=notFound.js.map