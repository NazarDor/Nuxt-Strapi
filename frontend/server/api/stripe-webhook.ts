// server/api/stripe-webhook.ts
import Stripe from 'stripe'
import { defineEventHandler, getRequestHeaders, readRawBody, setResponseStatus } from 'h3'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15',
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export default defineEventHandler(async (event) => {
    const sig = getRequestHeaders(event)['stripe-signature']

    const rawBody = await readRawBody(event)
    let stripeEvent: Stripe.Event

    try {
        stripeEvent = stripe.webhooks.constructEvent(rawBody!, sig!, endpointSecret)
    } catch (err) {
        console.error('Webhook signature verification failed.', err)
        setResponseStatus(event, 400)
        return { error: 'Webhook Error: Invalid signature.' }
    }

    if (stripeEvent.type === 'checkout.session.completed') {
        const session = stripeEvent.data.object as Stripe.Checkout.Session

        // Здесь ты можешь сделать запрос в Strapi для создания заказа
        const order = await $fetch('http://localhost:1337/api/orders', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
            },
            body: {
                data: {
                    stripeSessionId: session.id,
                    email: session.customer_details?.email,
                    amount: session.amount_total / 100,
                    status: 'paid',
                },
            },
        })

        console.log('✅ Order created in Strapi:', order)
    }

    return { received: true }
})
