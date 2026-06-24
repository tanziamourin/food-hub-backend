export declare const auth: import("better-auth").Auth<{
    secret: string | undefined;
    database: (options: import("better-auth").BetterAuthOptions) => import("better-auth").DBAdapter<import("better-auth").BetterAuthOptions>;
    logger: {
        level: "debug";
    };
    trustedOrigins: string[];
    advanced: {
        defaultCookieAttributes: {
            httpOnly: true;
            sameSite: "none";
            secure: true;
            path: string;
        };
    };
    user: {
        additionalFields: {
            role: {
                type: "string";
            };
            phone: {
                type: "string";
            };
            status: {
                type: "string";
            };
        };
    };
    emailAndPassword: {
        enabled: true;
        autoSignIn: true;
        requireEmailVerification: false;
    };
    emailVerification: {
        sendOnSignUp: false;
        autoSignInAfterVerification: true;
        sendVerificationEmail: ({ user, url }: {
            user: import("better-auth").User;
            url: string;
            token: string;
        }) => Promise<void>;
    };
}>;
//# sourceMappingURL=auth.d.ts.map