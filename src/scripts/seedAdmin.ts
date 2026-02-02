import "dotenv/config";
import { prisma } from "../lib/prisma";
import { auth } from "../lib/auth";

async function seedAdmin() {
    console.log("Admin Seeding Started ");

    const adminEmail = process.env.ADMIN_EMAIL || "admin@foodhub.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin@12345";
    const adminName = process.env.ADMIN_NAME || "Admin ";

    try {
        //  if admin already exists
        const existingAdmin = await prisma.user.findUnique({
            where: { email: adminEmail },
        });

        // DELETE 
        if (existingAdmin) {
            console.log("Admin already exists. Deleting existing admin...");
            await prisma.user.delete({
                where: { email: adminEmail },
            });
        }

        await auth.api.signUpEmail({
            body: {
                email: adminEmail,
                password: adminPassword,
                name: adminName,
                role: "ADMIN",
                status: "ACTIVE",
            }
        });

       await auth.api.signUpEmail({
    body: {
        email: adminEmail,
        password: adminPassword,
        name: adminName,
    }
});

await prisma.user.update({
    where: { email: adminEmail },
    data: { 
        role: "ADMIN",
        status: "ACTIVE",
        emailVerified: true 
    }
});
        await prisma.user.update({
            where: { email: adminEmail },
            data: { emailVerified: true }
        });

        console.log("Admin user created successfully via Better Auth API");
        console.log(`Email: ${adminEmail}`);
        console.log(`Password: ${adminPassword}`);
    } catch (error) {
        console.error(" Error seeding admin:", error);
    }
}

seedAdmin();