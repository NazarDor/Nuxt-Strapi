import Stripe from 'stripe'
import { defineEventHandler, readBody } from 'h3'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15',
})

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const lineItems = body.items.map((item: { title: any; price: number; quantity: any }) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: 1,
      }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: lineItems,
        metadata: {
          cart: JSON.stringify(body.items),
          type: 'cart-checkout',
        },
        success_url: `${process.env.NUXT_URL}/success`,
        cancel_url: `${process.env.NUXT_URL}/cancel`,
      });

    return {
        id: session.id,
    }
})
