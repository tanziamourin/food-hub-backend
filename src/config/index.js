"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var dotenv_1 = require("dotenv");
var path_1 = require("path");
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.config = {
    env: process.env.NODE_ENV || "development",
    port: Number(process.env.PORT) || 5000,
    database_url: process.env.DATABASE_URL,
    better_auth: {
        secret: process.env.BETTER_AUTH_SECRET,
        url: process.env.BETTER_AUTH_URL,
    },
    app_url: process.env.APP_URL || "http://localhost:3000",
    trusted_origins: __spreadArray([
        process.env.APP_URL,
        "http://localhost:3000",
        "http://localhost:5173"
    ], (process.env.TRUSTED_ORIGINS ? process.env.TRUSTED_ORIGINS.split(",") : []), true).filter(Boolean),
    smtp: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT) || 587,
    },
    allow_admin_signup: process.env.ALLOW_ADMIN_SIGNUP === "true",
};
// Simple validation to warn if critical variables are missing
var criticalVars = ["DATABASE_URL", "BETTER_AUTH_SECRET"];
criticalVars.forEach(function (varName) {
    if (!process.env[varName] && exports.config.env === "production") {
        console.warn("\u26A0\uFE0F Warning: Environment variable ".concat(varName, " is missing in production!"));
    }
});
