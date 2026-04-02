import { stripe } from "../stripe/stripe.service.js";
import { prisma } from "../lib/prisma.js";
export const stripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    }
    catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object;
        await prisma.order.updateMany({
            where: {
                paymentIntentId: paymentIntent.id,
            },
            data: {
                paymentStatus: "PAID",
            },
        });
    }
    res.json({ received: true });
};
//# sourceMappingURL=stripeWebhook.js.map