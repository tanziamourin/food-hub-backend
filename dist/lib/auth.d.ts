export declare const auth: import("better-auth").Auth<{
    secret: string | undefined;
    database: (options: import("better-auth").BetterAuthOptions) => import("better-auth").DBAdapter<import("better-auth").BetterAuthOptions>;
    baseURL: string | undefined;
    trustedOrigins: string[];
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
        sendOnSignUp: true;
        autoSignInAfterVerification: true;
        sendVerificationEmail: ({ user, url }: {
            user: import("better-auth").User;
            url: string;
            token: string;
        }) => Promise<void>;
    };
    socialProviders: {
        google: {
            clientId: string;
            clientSecret: string;
            callbackUrl: string;
        };
    };
    advanced: {};
    plugins: [];
}>;
//# sourceMappingURL=auth.d.ts.map