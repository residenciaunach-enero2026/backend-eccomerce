"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

const Stripe = require("stripe");

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    // ✅ Inicializa Stripe dentro del request (y valida la key)
    const stripeKey = process.env.STRIPE_KEY;

    if (!stripeKey) {
      ctx.response.status = 500;
      return { error: "Falta STRIPE_KEY en variables de entorno." };
    }

    const stripe = new Stripe(stripeKey);

    const { products } = ctx.request.body;

    try {
      const lineItems = await Promise.all(
        products.map(async (product) => {
          const docId = product.documentId || product.id;

          const item = await strapi
            .documents("api::product.product")
            .findOne({ documentId: docId });

          if (!item) {
            throw new Error(`Producto no encontrado (documentId/id: ${docId})`);
          }

          return {
            price_data: {
              currency: "eur",
              product_data: { name: item.productName },
              unit_amount: Math.round(item.price * 100),
            },
            quantity: product.quantity || 1,
          };
        })
      );

      const session = await stripe.checkout.sessions.create({
        shipping_address_collection: { allowed_countries: ["ES", "MX", "US"] },
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${process.env.CLIENT_HOST}/success`,
        cancel_url: `${process.env.CLIENT_HOST}/error`,
        line_items: lineItems,
      });

      await strapi.documents("api::order.order").create({
        data: {
          products,
          stripeId: session.id,
          total: session.amount_total ? session.amount_total / 100 : 0,
        },
      });

      return { stripeSession: session };
    } catch (error) {
      ctx.response.status = 500;
      return { error: error.message };
    }
  },
}));
