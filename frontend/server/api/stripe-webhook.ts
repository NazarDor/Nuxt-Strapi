import Stripe from 'stripe'
import { defineEventHandler, readRawBody, getHeader, setResponseStatus } from 'h3'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
})

export default defineEventHandler(async (event) => {
  const sig = getHeader(event, 'stripe-signature')
  const rawBody = await readRawBody(event)

  let stripeEvent

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      rawBody!,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error('⚠️ Webhook signature verification failed.', err.message)
    setResponseStatus(event, 400)
    return { error: `Webhook Error: ${err.message}` }
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object as Stripe.Checkout.Session;
    const type = session.metadata?.type;

    if (type === 'product') {
      try {
        await $fetch(`${process.env.STRAPI_URL}/api/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
          },
          body: JSON.stringify({
            data: {
              stripeSessionId: session.id,
              email: session.customer_details.email,
              amount: session.amount_total / 100,
              productTitle: session.metadata.productTitle,
              productId: session.metadata.productId,
            },
          }),
        });
      } catch (err) {
        console.error('❌ Failed to create order in Strapi:', err);
      }
    }
    
    if (type === 'service') {
      try {
        await $fetch(`${process.env.STRAPI_URL}/api/subscriptions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
          },
          body: JSON.stringify({
            data: {
              stripeSessionId: session.id,
              serviceTitle: session.metadata.serviceTitle,
              amount: session.amount_total / 100,
              email: session.customer_details.email,
              serviceId: session.metadata.serviceId,

            },
          }),
        });
      } catch (err) {
        console.error('❌ Failed to create subscription in Strapi:', err);
      }
    }
  }

  return { received: true }
})
