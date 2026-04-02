import { createPaymentIntent } from "../../stripe/stripe.service";
export const createPayment = async (req, res) => {
    const { amount } = req.body;
    const paymentIntent = await createPaymentIntent(amount);
    res.json({
        clientSecret: paymentIntent.client_secret
    });
};
