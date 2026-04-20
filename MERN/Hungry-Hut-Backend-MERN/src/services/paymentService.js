import Stripe from "stripe";
import Order from "../models/order.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createPaymentLink(order) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `http://localhost:3000/payment/success/${order._id}`,
      cancel_url: "http://localhost:3000/payment/fail",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "inr",
            unit_amount: Math.round(order.totalAmount * 100 + 5800), // convert to paise
            product_data: {
              name: "hungry hut",
            },
          },
        },
      ],
    });
    return { payment_url: session.url };
  } catch (error) {
    throw new Error(`Failed to create payment link: ${error.message}`);
  }
}
