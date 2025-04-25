import Stripe from 'stripe'
import { defineEventHandler, readBody } from 'h3'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15',
})

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

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
                    unit_amount: price * 100, // Stripe требует цену в центах
                },
                quantity: 1,
            },
        ],
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
    })

    return {
        id: session.id,
    }
})
