import Stripe from "stripe";
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const createPaymentIntent = async (amount) => {
    return await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: "usd",
    });
};
//# sourceMappingURL=stripe.service.js.map