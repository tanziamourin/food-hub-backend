var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'generator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel User {\n  id              String           @id @default(uuid())\n  name            String\n  email           String           @unique\n  role            Role             @default(CUSTOMER)\n  status          UserStatus       @default(ACTIVE)\n  emailVerified   Boolean          @default(false)\n  createdAt       DateTime         @default(now())\n  updatedAt       DateTime         @updatedAt\n  image           String?\n  phone           String?\n  orders          Order[]\n  providerProfile ProviderProfile?\n  reviews         Review[]\n  accounts        Account[]\n  sessions        Session[]\n\n  @@map("user")\n}\n\nmodel ProviderProfile {\n  id     String @id @default(uuid())\n  userId String @unique\n\n  shopName    String?\n  address     String?\n  phone       String?\n  logo        String?\n  description String?\n\n  meals Meal[]\n\n  user User @relation(fields: [userId], references: [id])\n}\n\nmodel Category {\n  id    String @id @default(uuid())\n  name  String @unique\n  meals Meal[]\n}\n\nmodel Meal {\n  id          String          @id @default(uuid())\n  name        String\n  description String\n  price       Float\n  providerId  String\n  categoryId  String\n  image       String?\n  category    Category        @relation(fields: [categoryId], references: [id])\n  provider    ProviderProfile @relation(fields: [providerId], references: [id])\n  orderItems  OrderItem[]\n  reviews     Review[]\n}\n\nmodel Order {\n  id              String      @id @default(uuid())\n  customerId      String\n  status          OrderStatus @default(PLACED)\n  createdAt       DateTime    @default(now())\n  deliveryAddress String\n\n  paymentStatus   PaymentStatus @default(PENDING)\n  paymentIntentId String?\n  totalAmount     Float\n\n  customer User        @relation(fields: [customerId], references: [id])\n  items    OrderItem[]\n}\n\nmodel OrderItem {\n  id       String @id @default(uuid())\n  orderId  String\n  mealId   String\n  quantity Int\n  price    Float\n  meal     Meal   @relation(fields: [mealId], references: [id])\n  order    Order  @relation(fields: [orderId], references: [id])\n\n  @@unique([orderId, mealId])\n}\n\nmodel Review {\n  id      String @id @default(uuid())\n  rating  Int\n  comment String\n  mealId  String\n  userId  String\n  meal    Meal   @relation(fields: [mealId], references: [id])\n  user    User   @relation(fields: [userId], references: [id])\n\n  @@unique([userId, mealId])\n}\n\nmodel Session {\n  id        String   @id @default(uuid())\n  expiresAt DateTime\n  token     String   @unique\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id @default(uuid())\n  accountId             String\n  providerId            String\n  userId                String\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nenum Role {\n  CUSTOMER\n  PROVIDER\n  ADMIN\n}\n\nenum OrderStatus {\n  PLACED\n  PREPARING\n  READY\n  DELIVERED\n  CANCELLED\n}\n\nenum PaymentStatus {\n  PENDING\n  PAID\n  FAILED\n}\n\nenum UserStatus {\n  ACTIVE\n  SUSPENDED\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"image","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"providerProfile","kind":"object","type":"ProviderProfile","relationName":"ProviderProfileToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"}],"dbName":"user"},"ProviderProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"shopName","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"logo","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"meals","kind":"object","type":"Meal","relationName":"MealToProviderProfile"},{"name":"user","kind":"object","type":"User","relationName":"ProviderProfileToUser"}],"dbName":null},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"meals","kind":"object","type":"Meal","relationName":"CategoryToMeal"}],"dbName":null},"Meal":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMeal"},{"name":"provider","kind":"object","type":"ProviderProfile","relationName":"MealToProviderProfile"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"MealToOrderItem"},{"name":"reviews","kind":"object","type":"Review","relationName":"MealToReview"}],"dbName":null},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"deliveryAddress","kind":"scalar","type":"String"},{"name":"paymentStatus","kind":"enum","type":"PaymentStatus"},{"name":"paymentIntentId","kind":"scalar","type":"String"},{"name":"totalAmount","kind":"scalar","type":"Float"},{"name":"customer","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"}],"dbName":null},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Float"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToOrderItem"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"}],"dbName":null},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToReview"},{"name":"user","kind":"object","type":"User","relationName":"ReviewToUser"}],"dbName":null},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AccountScalarFieldEnum: () => AccountScalarFieldEnum,
  AnyNull: () => AnyNull2,
  CategoryScalarFieldEnum: () => CategoryScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  MealScalarFieldEnum: () => MealScalarFieldEnum,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  OrderItemScalarFieldEnum: () => OrderItemScalarFieldEnum,
  OrderScalarFieldEnum: () => OrderScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  ProviderProfileScalarFieldEnum: () => ProviderProfileScalarFieldEnum,
  QueryMode: () => QueryMode,
  ReviewScalarFieldEnum: () => ReviewScalarFieldEnum,
  SessionScalarFieldEnum: () => SessionScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  VerificationScalarFieldEnum: () => VerificationScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.3.0",
  engine: "9d6ad21cbbceab97458517b147a6a09ff43aa735"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  User: "User",
  ProviderProfile: "ProviderProfile",
  Category: "Category",
  Meal: "Meal",
  Order: "Order",
  OrderItem: "OrderItem",
  Review: "Review",
  Session: "Session",
  Account: "Account",
  Verification: "Verification"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  role: "role",
  status: "status",
  emailVerified: "emailVerified",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  image: "image",
  phone: "phone"
};
var ProviderProfileScalarFieldEnum = {
  id: "id",
  userId: "userId",
  shopName: "shopName",
  address: "address",
  phone: "phone",
  logo: "logo",
  description: "description"
};
var CategoryScalarFieldEnum = {
  id: "id",
  name: "name"
};
var MealScalarFieldEnum = {
  id: "id",
  name: "name",
  description: "description",
  price: "price",
  providerId: "providerId",
  categoryId: "categoryId",
  image: "image"
};
var OrderScalarFieldEnum = {
  id: "id",
  customerId: "customerId",
  status: "status",
  createdAt: "createdAt",
  deliveryAddress: "deliveryAddress",
  paymentStatus: "paymentStatus",
  paymentIntentId: "paymentIntentId",
  totalAmount: "totalAmount"
};
var OrderItemScalarFieldEnum = {
  id: "id",
  orderId: "orderId",
  mealId: "mealId",
  quantity: "quantity",
  price: "price"
};
var ReviewScalarFieldEnum = {
  id: "id",
  rating: "rating",
  comment: "comment",
  mealId: "mealId",
  userId: "userId"
};
var SessionScalarFieldEnum = {
  id: "id",
  expiresAt: "expiresAt",
  token: "token",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  ipAddress: "ipAddress",
  userAgent: "userAgent",
  userId: "userId"
};
var AccountScalarFieldEnum = {
  id: "id",
  accountId: "accountId",
  providerId: "providerId",
  userId: "userId",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  idToken: "idToken",
  accessTokenExpiresAt: "accessTokenExpiresAt",
  refreshTokenExpiresAt: "refreshTokenExpiresAt",
  scope: "scope",
  password: "password",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var VerificationScalarFieldEnum = {
  id: "id",
  identifier: "identifier",
  value: "value",
  expiresAt: "expiresAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/lib/auth.ts
import nodemailer from "nodemailer";
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS
  }
});
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  trustedOrigins: [process.env.APP_URL],
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false
      },
      phone: {
        type: "string",
        required: false
      },
      status: {
        type: "string",
        required: false
      }
    }
  },
  session: {
    additionalFields: {
      role: {
        type: "string"
      }
    }
  },
  // Email and Password Auth
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false
  },
  // email verification
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }) => {
      await transporter.sendMail({
        from: `"Food Hub " <food-hub@gmail.com>`,
        to: user.email,
        subject: "Verify your email address",
        html: `
            <p>Hello ${user.name},</p>
            <p>Please verify your email address:</p>
            <a href="${url}">Verify Email</a>
        `
      });
    }
  },
  socialProviders: {
    google: {
      prompt: "select_account consent",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackUrl: `${process.env.APP_URL}/api/auth/callback/google`
    }
  }
});

// src/middleware/globalErrorHandler.ts
import { ZodError } from "zod";
function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || err.status || 500;
  let message = err.message || "Internal Server Error";
  let details = null;
  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation failed";
    details = err.issues.map((e) => ({
      field: e.path.join("."),
      message: e.message
    }));
  } else if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = 400;
    message = "Invalid request data";
    details = err.message;
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
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
  } else if (err instanceof prismaNamespace_exports.PrismaClientUnknownRequestError) {
    statusCode = 500;
    message = "Unknown database error occurred";
    details = err.message;
  } else if (err instanceof prismaNamespace_exports.PrismaClientRustPanicError) {
    statusCode = 500;
    message = "Critical database error (Rust panic)";
    details = err.message;
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    statusCode = 500;
    message = "Failed to initialize database connection";
    details = err.message;
  }
  res.status(statusCode).json({
    success: false,
    message,
    details,
    stack: process.env.NODE_ENV === "production" ? void 0 : err.stack
  });
}
var globalErrorHandler_default = errorHandler;

// src/middleware/notFound.ts
function notFound(req, res) {
  res.status(404).json({
    success: false,
    message: "Resource not found",
    details: `Cannot ${req.method} ${req.originalUrl}`,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
}

// src/middleware/auth.ts
var UserRole = /* @__PURE__ */ ((UserRole2) => {
  UserRole2["ADMIN"] = "ADMIN";
  UserRole2["PROVIDER"] = "PROVIDER";
  UserRole2["CUSTOMER"] = "CUSTOMER";
  return UserRole2;
})(UserRole || {});
var authorize = (...roles) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session || !session.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const user = session.user;
      if (user.status === "SUSPENDED") {
        return res.status(403).json({ message: "User is SUSPENDED by admin" });
      }
      req.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        emailVerified: user.emailVerified,
        status: user.status
      };
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }
      next();
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        details: error.message
      });
    }
  };
};
var auth_default = authorize;

// src/config/index.ts
import dotenv from "dotenv";
import path2 from "path";
dotenv.config({ path: path2.join(process.cwd(), ".env") });
var config2 = {
  env: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5e3,
  database_url: process.env.DATABASE_URL,
  better_auth: {
    secret: process.env.BETTER_AUTH_SECRET,
    url: process.env.BETTER_AUTH_URL
  },
  app_url: process.env.APP_URL || "http://localhost:3000",
  trusted_origins: [
    process.env.APP_URL,
    "http://localhost:3000",
    "http://localhost:5173",
    // Common Vite port
    ...process.env.TRUSTED_ORIGINS ? process.env.TRUSTED_ORIGINS.split(",") : []
  ].filter(Boolean),
  smtp: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587
  },
  allow_admin_signup: process.env.ALLOW_ADMIN_SIGNUP === "true"
};
var criticalVars = ["DATABASE_URL", "BETTER_AUTH_SECRET"];
criticalVars.forEach((varName) => {
  if (!process.env[varName] && config2.env === "production") {
    console.warn(`\u26A0\uFE0F Warning: Environment variable ${varName} is missing in production!`);
  }
});

// src/modules/customer/user.route.ts
import { Router } from "express";

// src/modules/customer/user.service.ts
var UserService = {
  getProfile: async (id) => {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        image: true,
        phone: true,
        createdAt: true,
        updatedAt: true
      }
    });
  },
  updateProfile: async (id, data) => {
    return prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        image: true,
        phone: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }
};

// src/helper/sendResponse.ts
var sendResponse = (res, data) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data
  });
};
var sendResponse_default = sendResponse;

// src/helper/catchAsync.ts
var catchAsync = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};
var catchAsync_default = catchAsync;

// src/modules/customer/user.controller.ts
var getMyProfile = catchAsync_default(async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  const result = await UserService.getProfile(user.id);
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Profile fetched successfully",
    data: result
  });
});
var updateMyProfile = catchAsync_default(async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  const { name, image, phone } = req.body;
  const result = await UserService.updateProfile(user.id, { name, image, phone });
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Profile updated successfully",
    data: result
  });
});

// src/modules/customer/user.route.ts
var router = Router();
router.get("/me", auth_default(), getMyProfile);
router.patch("/me", auth_default(), updateMyProfile);
var userRouter = router;

// src/modules/provider/meal/meal.routes.ts
import { Router as Router2 } from "express";

// src/modules/provider/meal/meal.service.ts
var createMeal = async (userId, data) => {
  let provider = await prisma.providerProfile.findUnique({
    where: { userId }
  });
  if (!provider) {
    provider = await prisma.providerProfile.create({
      data: {
        userId,
        shopName: "My Shop",
        address: "Update your address"
      }
    });
  }
  return prisma.meal.create({
    data: {
      name: data.name,
      price: parseFloat(data.price),
      description: data.description,
      providerId: provider.id,
      categoryId: data.categoryId
    }
  });
};
var getMeals = () => {
  return prisma.meal.findMany({
    include: {
      category: true,
      provider: true
    }
  });
};
var getMealById = (id) => {
  return prisma.meal.findUnique({
    where: { id },
    include: {
      reviews: true,
      provider: true
    }
  });
};
var updateMeal = async (mealId, userId, data) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { userId }
  });
  return prisma.meal.updateMany({
    where: {
      id: mealId,
      providerId: provider?.id
    },
    data
  });
};
var deleteMeal = async (mealId, userId) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { userId }
  });
  return prisma.meal.deleteMany({
    where: {
      id: mealId,
      providerId: provider?.id
    }
  });
};
var MealService = {
  createMeal,
  getMeals,
  getMealById,
  updateMeal,
  deleteMeal
};

// src/modules/provider/meal/meal.controller.ts
var getMeals2 = async (_req, res) => {
  const meals = await MealService.getMeals();
  res.json(meals);
};
var getMeal = async (req, res) => {
  const id = req.params.id;
  const meal = await MealService.getMealById(id);
  res.json(meal);
};
var createMeal2 = async (req, res) => {
  try {
    const meal = await MealService.createMeal(req.user.id, req.body);
    res.status(201).json(meal);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var updateMeal2 = async (req, res) => {
  const id = req.params.id;
  const result = await MealService.updateMeal(
    id,
    req.user.id,
    req.body
  );
  if (result.count === 0) {
    return res.status(403).json({ message: "Not allowed" });
  }
  res.json({ success: true });
};
var deleteMeal2 = async (req, res) => {
  const id = req.params.id;
  const result = await MealService.deleteMeal(id, req.user.id);
  if (result.count === 0) {
    return res.status(403).json({ message: "Not allowed" });
  }
  res.status(204).send();
};

// src/modules/provider/meal/meal.routes.ts
var router2 = Router2();
router2.get("/", getMeals2);
router2.get("/:id", getMeal);
router2.post("/", auth_default("PROVIDER" /* PROVIDER */), createMeal2);
router2.patch("/:id", auth_default("PROVIDER" /* PROVIDER */), updateMeal2);
router2.delete("/:id", auth_default("PROVIDER" /* PROVIDER */), deleteMeal2);
var mealsRouter = router2;

// src/modules/provider/order/provider.order.routes.ts
import { Router as Router3 } from "express";

// src/modules/provider/order/provider.order.service.ts
var getProviderOrders = async (userId) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { userId }
  });
  if (!provider) throw new Error("Provider profile not found");
  return prisma.order.findMany({
    where: {
      items: {
        some: {
          meal: { providerId: provider.id }
        }
      }
    },
    include: {
      customer: true,
      items: {
        include: { meal: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });
};
var updateOrderStatus = async (orderId, userId, status) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { userId }
  });
  if (!provider) throw new Error("Provider profile not found");
  const result = await prisma.order.updateMany({
    where: {
      id: orderId,
      items: {
        some: {
          meal: { providerId: provider.id }
        }
      }
    },
    data: { status }
  });
  if (result.count === 0) {
    throw new Error("Unauthorized or order not found");
  }
  return result;
};
var ProviderOrderService = {
  getProviderOrders,
  updateOrderStatus
};

// src/modules/provider/order/provider.order.controller.ts
var getProviderOrders2 = async (req, res) => {
  const providerId = req.user.id;
  const orders = await ProviderOrderService.getProviderOrders(providerId);
  res.json(orders);
};
var updateOrderStatus2 = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }
  await ProviderOrderService.updateOrderStatus(
    id,
    req.user.id,
    status
  );
  res.json({ message: "Order status updated" });
};

// src/modules/provider/order/provider.order.routes.ts
var router3 = Router3();
router3.get(
  "/orders",
  auth_default("PROVIDER" /* PROVIDER */),
  getProviderOrders2
);
router3.patch(
  "/orders/:id",
  auth_default("PROVIDER" /* PROVIDER */),
  updateOrderStatus2
);
var providerOrderRouter = router3;

// src/modules/customer/order/order.routes.ts
import { Router as Router4 } from "express";

// src/stripe/stripe.service.ts
import Stripe from "stripe";
var stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
var createPaymentIntent = async (amount) => {
  return await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency: "usd"
  });
};

// src/modules/customer/order/order.service.ts
var createOrderIntoDB = async (userId, payload) => {
  const meals = await prisma.meal.findMany({
    where: { id: { in: payload.items.map((i) => i.mealId) } }
  });
  let totalAmount = 0;
  const orderItems = payload.items.map((item) => {
    const meal = meals.find((m) => m.id === item.mealId);
    if (!meal) throw new Error("Meal not found");
    totalAmount += meal.price * item.quantity;
    return {
      mealId: item.mealId,
      quantity: item.quantity,
      price: meal.price
    };
  });
  const paymentIntent = await createPaymentIntent(totalAmount);
  const order = await prisma.order.create({
    data: {
      customerId: userId,
      deliveryAddress: payload.deliveryAddress,
      totalAmount,
      paymentIntentId: paymentIntent.id,
      paymentStatus: "PENDING",
      items: { create: orderItems }
    }
  });
  return {
    order,
    clientSecret: paymentIntent.client_secret
  };
};
var getMyOrdersFromDB = async (userId) => {
  return prisma.order.findMany({
    where: { customerId: userId },
    include: {
      items: { include: { meal: true } }
    },
    orderBy: { createdAt: "desc" }
  });
};

// src/modules/customer/order/order.controller.ts
var createOrder = async (req, res) => {
  const userId = req.user.id;
  const result = await createOrderIntoDB(userId, req.body);
  res.json({
    success: true,
    data: result
  });
};
var getMyOrders = async (req, res) => {
  const result = await getMyOrdersFromDB(req.user.id);
  res.json({ success: true, data: result });
};

// src/modules/customer/order/order.routes.ts
var router4 = Router4();
router4.post("/", auth_default("CUSTOMER" /* CUSTOMER */), createOrder);
router4.get("/me", auth_default("CUSTOMER" /* CUSTOMER */), getMyOrders);
var orderRouter = router4;

// src/modules/admin/admin.route.ts
import { Router as Router5 } from "express";

// src/modules/admin/admin.service.ts
var AdminService = {
  getAllUsers: async () => {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  },
  getAllProviders: async () => {
    return prisma.providerProfile.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        shopName: "asc"
      }
    });
  },
  updateUserStatus: async (id, status) => {
    return prisma.user.update({
      where: { id },
      data: { status }
    });
  },
  getDashboardStats: async () => {
    const [
      totalUsers,
      totalProviders,
      totalMeals,
      totalOrders
    ] = await Promise.all([
      prisma.user.count(),
      prisma.providerProfile.count(),
      prisma.meal.count(),
      prisma.order.count()
    ]);
    return {
      users: totalUsers,
      providers: totalProviders,
      meals: totalMeals,
      orders: totalOrders
    };
  },
  updateUserRole: async (userId, role) => {
    return prisma.user.update({
      where: { id: userId },
      data: { role }
    });
  }
};

// src/modules/admin/admin.controller.ts
var getUsers = async (_req, res) => {
  try {
    const users = await AdminService.getAllUsers();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users"
    });
  }
};
var getProviders = async (_req, res) => {
  try {
    const providers = await AdminService.getAllProviders();
    res.status(200).json({
      success: true,
      data: providers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch providers"
    });
  }
};
var updateUserStatus = async (req, res) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const { status } = req.body;
    if (!id || !status) {
      return res.status(400).json({
        success: false,
        message: "User id and status are required"
      });
    }
    if (!["ACTIVE", "SUSPENDED"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value"
      });
    }
    const user = await AdminService.updateUserStatus(
      id,
      status
    );
    res.status(200).json({
      success: true,
      message: "User status updated successfully",
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update user status"
    });
  }
};
var getDashboardStats = async (_req, res) => {
  try {
    const stats = await AdminService.getDashboardStats();
    res.status(200).json({
      success: true,
      message: "Dashboard stats fetched successfully",
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats"
    });
  }
};
var updateUserRole = async (req, res) => {
  try {
    const userId = req.params.id;
    const { role } = req.body;
    if (!userId || !role) {
      return res.status(400).json({
        success: false,
        message: "User id and role are required"
      });
    }
    if (!Object.values(UserRole).includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role value"
      });
    }
    if (req.user.id === userId) {
      return res.status(400).json({
        success: false,
        message: "You cannot change your own role"
      });
    }
    const updatedUser = await AdminService.updateUserRole(
      userId,
      role
    );
    res.json({
      success: true,
      message: "User role updated",
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update role"
    });
  }
};

// src/modules/admin/admin.route.ts
var router5 = Router5();
router5.use(auth_default("ADMIN" /* ADMIN */));
router5.get("/users", getUsers);
router5.get("/providers", getProviders);
router5.patch("/users/:id/status", updateUserStatus);
router5.patch(
  "/users/:id/role",
  auth_default("ADMIN" /* ADMIN */),
  updateUserRole
);
router5.get("/stats", getDashboardStats);
var adminRouter = router5;

// src/modules/category/category.routes.ts
import { Router as Router6 } from "express";

// src/modules/category/category.service.ts
var create = async (payload) => {
  return prisma.category.create({ data: payload });
};
var getAll = async () => {
  return prisma.category.findMany();
};
var getById = async (id) => {
  return prisma.category.findUnique({ where: { id } });
};
var update = async (id, payload) => {
  return prisma.category.update({
    where: { id },
    data: payload
  });
};
var remove = async (id) => {
  return prisma.category.delete({ where: { id } });
};
var CategoryService = {
  create,
  getAll,
  getById,
  update,
  remove
};

// src/modules/category/category.controller.ts
var create2 = async (req, res) => {
  const result = await CategoryService.create(req.body);
  res.status(201).json(result);
};
var getAll2 = async (_req, res) => {
  const result = await CategoryService.getAll();
  res.json(result);
};
var getById2 = async (req, res) => {
  const result = await CategoryService.getById(req.params.id);
  if (!result) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.json(result);
};
var update2 = async (req, res) => {
  const result = await CategoryService.update(req.params.id, req.body);
  res.json(result);
};
var remove2 = async (req, res) => {
  await CategoryService.remove(req.params.id);
  res.status(204).send();
};
var CategoryController = {
  create: create2,
  getAll: getAll2,
  getById: getById2,
  update: update2,
  remove: remove2
};

// src/modules/category/category.routes.ts
var router6 = Router6();
router6.post(
  "/",
  auth_default("ADMIN" /* ADMIN */),
  CategoryController.create
);
router6.get("/", CategoryController.getAll);
router6.get("/:id", CategoryController.getById);
router6.patch(
  "/:id",
  auth_default("ADMIN" /* ADMIN */),
  CategoryController.update
);
router6.delete(
  "/:id",
  auth_default("ADMIN" /* ADMIN */),
  CategoryController.remove
);
var categoryRouter = router6;

// src/modules/provider/profile/provider.profile.router.ts
import { Router as Router7 } from "express";

// src/modules/provider/profile/provider.profile.service.ts
var getProfile = async (userId) => {
  const profile = await prisma.providerProfile.findUnique({
    where: { userId },
    include: {
      user: true
    }
  });
  if (!profile) throw new Error("Provider profile not found");
  return profile;
};
var getAllProviders = async () => {
  return prisma.providerProfile.findMany({
    include: {
      user: true,
      meals: {
        include: {
          category: true
        }
      }
    }
  });
};
var getProviderById = async (id) => {
  return prisma.providerProfile.findUnique({
    where: { id },
    include: {
      user: true,
      meals: {
        include: {
          category: true
        }
      }
    }
  });
};
var updateProfile = async (userId, data) => {
  const cleanData = {};
  if (data.shopName) cleanData.shopName = data.shopName;
  if (data.address) cleanData.address = data.address;
  if (data.phone) cleanData.phone = data.phone;
  if (data.description) cleanData.description = data.description;
  if (data.logo) cleanData.logo = data.logo;
  return prisma.providerProfile.upsert({
    where: { userId },
    // ⚠️ MUST BE UNIQUE IN PRISMA
    update: cleanData,
    create: {
      userId,
      shopName: cleanData.shopName || "Default Shop",
      address: cleanData.address || "Default Address",
      phone: cleanData.phone,
      description: cleanData.description,
      logo: cleanData.logo
    }
  });
};
var ProviderProfileService = {
  getProfile,
  getAllProviders,
  getProviderById,
  updateProfile
};

// src/modules/provider/profile/provider.profile.validation.ts
import { z } from "zod";
var updateProviderProfileSchema = z.object({
  shopName: z.string().min(2).optional(),
  address: z.string().min(5).optional(),
  phone: z.string().optional(),
  description: z.string().optional(),
  logo: z.string().optional()
  // ❗ NO .url()
});

// src/modules/provider/profile/provider.profile.controller.ts
var getProviderProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    const profile = await ProviderProfileService.getProfile(req.user.id);
    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var getAllProviders2 = async (req, res) => {
  try {
    const providers = await ProviderProfileService.getAllProviders();
    res.json({
      success: true,
      data: providers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var getProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const provider = await ProviderProfileService.getProviderById(id);
    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider not found"
      });
    }
    res.json({
      success: true,
      data: provider
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var updateProviderProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    const parsed = updateProviderProfileSchema.parse({
      ...req.body,
      logo: req.file ? req.file.path : req.body.logo
    });
    const profile = await ProviderProfileService.updateProfile(
      req.user.id,
      parsed
    );
    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      details: error.errors
    });
  }
};

// src/cloudinary/upload.middleware.ts
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// src/cloudinary/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
var cloudinary_default = cloudinary;

// src/cloudinary/upload.middleware.ts
var storage = new CloudinaryStorage({
  cloudinary: cloudinary_default,
  params: async (req, file) => {
    return {
      folder: "foodhub/providers",
      public_id: Date.now() + "-" + file.originalname
    };
  }
});
var upload = multer({ storage });

// src/modules/provider/profile/provider.profile.router.ts
var router7 = Router7();
router7.get("/", getAllProviders2);
router7.get("/:id", getProvider);
router7.get(
  "/profile",
  auth_default("PROVIDER" /* PROVIDER */),
  getProviderProfile
);
router7.patch(
  "/profile",
  auth_default("PROVIDER" /* PROVIDER */),
  upload.single("logo"),
  updateProviderProfile
);
var providerProfileRouter = router7;

// src/app.ts
var app = express();
var allowedOrigins = [
  config2.app_url,
  "http://localhost:3000"
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.get("/api/auth/me", auth_default(), getMyProfile);
app.use("/api/auth", toNodeHandler(auth));
app.post("/api/auth/register", async (req, res) => {
  console.log(">>> [REG_PROXY] START:", req.body?.email);
  res.setHeader("Content-Type", "application/json");
  try {
    const result = await auth.api.signUpEmail({
      body: req.body
    });
    const data = result;
    if (data?.error) {
      return res.status(200).json({ error: data.error });
    }
    if (data?.user) {
      console.log(">>> [REG_PROXY] User created. Verifying email...");
      await prisma.user.update({
        where: { email: data.user.email },
        data: { emailVerified: true }
      }).catch((e) => console.error(">>> [REG_PROXY] Auto-verify failed:", e.message));
      return res.status(201).json({
        success: true,
        message: "Account created successfully",
        user: { ...data.user, emailVerified: true },
        session: data.session || null
      });
    }
    return res.status(200).json(result);
  } catch (err) {
    console.error(">>> [REG_PROXY] FATAL:", err);
    return res.status(500).json({
      error: { message: err.message || "Internal Server Error" }
    });
  }
});
app.post("/api/auth/login", async (req, res) => {
  try {
    const result = await auth.api.signInEmail({ body: req.body });
    const data = result;
    if (data?.user?.email) {
      console.log(" User logged in. Ensuring emailVerified: true");
      await prisma.user.update({
        where: { email: data.user.email },
        data: { emailVerified: true }
      }).catch((e) => console.error(" Auto-verify failed:", e.message));
    }
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: { message: err.message || "Internal Server Error" }
    });
  }
});
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/meals", mealsRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/providers", providerProfileRouter);
app.use("/api/provider/meals", mealsRouter);
app.use("/api/provider/orders", providerOrderRouter);
app.use("/api/admin", adminRouter);
app.get("/", (_req, res) => res.send("Food Hub Backend is running!"));
app.use(notFound);
app.use(globalErrorHandler_default);
var app_default = app;

// src/index.ts
var PORT = process.env.PORT || 5e3;
async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully.");
    app_default.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("An error occurred:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}
main();
