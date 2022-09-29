import { Context } from "koa";

interface CheckoutBody {
  items: {
    quantity: number;
    id: number;
  }[];
}

/**
 * A set of functions called "actions" for `checkout`
 */

export default ({ strapi }: { strapi: Strapi.Strapi }) => ({
  checkout: async (ctx: Context) => {
    // @ts-ignore
    const items = (ctx.request.body as CheckoutBody).items;
    const ids = items.map((item) => item.id);

    const products = await strapi.entityService.findMany(
      "api::product.product",
      {
        filters: { id: ids },
        populate: { image: true },
      }
    );

    const orders = items.map((item) => ({
      quantity: item.quantity,
      product: (products as any).find((product) => product.id === item.id),
    }));

    const session = await strapi
      .service("api::checkout.checkout")
      .createSession(orders);

    return { url: session.url };
  },
});
