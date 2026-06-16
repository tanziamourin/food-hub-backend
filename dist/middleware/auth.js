import { auth } from "../lib/auth.js";
export var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["PROVIDER"] = "PROVIDER";
    UserRole["CUSTOMER"] = "CUSTOMER";
})(UserRole || (UserRole = {}));
const authorize = (...roles) => {
    return async (req, res, next) => {
        try {
            // ✅ FIX: correct headers format
            const session = await auth.api.getSession({ headers: req.headers });
            if (!session || !session.user) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const user = session.user;
            if (user.status === "SUSPENDED") {
                return res.status(403).json({ message: "User is SUSPENDED" });
            }
            req.user = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                emailVerified: user.emailVerified,
                status: user.status,
            };
            // Role check
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({ message: "Forbidden" });
            }
            next();
        }
        catch (error) {
            console.error("AUTH ERROR:", error); // ✅ important for debugging
            return res.status(500).json({
                message: "Auth failed",
                details: error.message,
            });
        }
    };
};
export default authorize;
//# sourceMappingURL=auth.js.map