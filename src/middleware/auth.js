import { auth } from "../lib/auth";
// user roles
export var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["PROVIDER"] = "PROVIDER";
    UserRole["CUSTOMER"] = "CUSTOMER";
})(UserRole || (UserRole = {}));
// Auth Middleware
const authorize = (...roles) => {
    return async (req, res, next) => {
        try {
            // session from Better Auth
            const session = await auth.api.getSession({
                headers: req.headers,
            });
            //  Unauthenticated
            if (!session || !session.user) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            // Email not verified
            // if (!session.user.emailVerified) {
            //     return res.status(403).json({ message: "Email not verified" });
            // }
            const user = session.user;
            // SUSPENDED 
            if (user.status === "SUSPENDED") {
                return res.status(403).json({ message: "User is SUSPENDED by admin" });
            }
            // Attach user to request
            req.user = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                emailVerified: user.emailVerified,
                status: user.status,
            };
            // Role-based  control
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({ message: "Forbidden" });
            }
            next();
        }
        catch (error) {
            return res.status(500).json({
                message: "Internal Server Error",
                details: error.message,
            });
        }
    };
};
export default authorize;
