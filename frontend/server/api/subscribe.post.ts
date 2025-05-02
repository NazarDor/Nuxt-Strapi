import Stripe from 'stripe';
import { defineEventHandler, readBody } from 'h3';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15',
});

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { title, price } = body

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: title,
                    },
                    unit_amount: price * 100,
                },
                quantity: 1,
            },
        ],
        metadata: {
            serviceTitle: title,
            amount: price.toString(),
            serviceId: body.id,
            type: "service",
        },
        success_url: `${process.env.NUXT_URL}/success`,
        cancel_url: `${process.env.NUXT_URL}/cancel`,
    });

    return { id: session.id };
});
