"use strict";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = {
  async checkout(ctx) {
    const { productId } = ctx.request.body;

    const product = await strapi.entityService.findOne(
      "api::product.product",
      productId
    );

    if (!product) return ctx.badRequest("Product not found");

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.title,
              description: product.description || "",
            },
            unit_amount: Math.round(product.price * 100), // cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    ctx.send({ id: session.id });
  },
};
