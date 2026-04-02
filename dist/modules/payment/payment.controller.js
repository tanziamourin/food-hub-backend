import { createPaymentIntent } from "../../stripe/stripe.service.js";
export const createPayment = async (req, res) => {
    const { amount } = req.body;
    const paymentIntent = await createPaymentIntent(amount);
    res.json({
        clientSecret: paymentIntent.client_secret
    });
};
//# sourceMappingURL=payment.controller.js.map