"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sendResponse = function (res, data) {
    res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        data: data.data,
    });
};
exports.default = sendResponse;
