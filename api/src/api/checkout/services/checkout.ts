import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_KEY, {
  apiVersion: "2022-08-01",
});

interface SessionItem {
  quantity: number;
  product: any;
}

/**
 * checkout service
 */

export default () => ({
  createSession: (items: SessionItem[]) => {
    const params = {
      line_items: items.map((item) => ({
        price_data: {
          currency: "USD",
          unit_amount_decimal: item.product.price * 100,
          product_data: {
            name: item.product.label,
            images: [item.product.image.formats.small.url],
          },
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: process.env.WEB_CLIENT_URL,
      cancel_url: process.env.WEB_CLIENT_URL,
    };
    console.log(params.line_items);

    return stripe.checkout.sessions.create(params as any);
  },
});
