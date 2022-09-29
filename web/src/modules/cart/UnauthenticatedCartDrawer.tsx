import { useLocalCart } from "./hooks/useLocalCart";
import { CartDrawerWrapper } from "./CartDrawerWrapper";
import { useMemo } from "react";
import { CartDrawerList } from "./CartDrawerList";
import { useCartDrawer } from "./store/cart-drawer.store";
import { useProducts } from "../products/api/get-products.api";
import { useCheckout } from "./api/checkout.api";

export const UnauthenticatedCartDrawer = () => {
  const { isOpen, toggle } = useCartDrawer();
  const { localCart, addProductToLocalCart, removeProductFromLocalCart } =
    useLocalCart();
  const checkout = useCheckout();

  const { data } = useProducts({
    query: {
      filters: { id: { $in: localCart.map((item) => item.id.toString()) } },
    },
    enabled: !!localCart.length,
  });

  const totalPrice = useMemo(() => {
    if (!data) return;
    return data.reduce((last, current) => {
      const quantity = localCart.find(
        (item) => item.id === current.id
      )!.quantity;
      return last + Number(current.attributes.price) * Number(quantity);
    }, 0);
  }, [localCart, data]);

  const handleCheckout = async () => {
    const response = await checkout.mutateAsync({ items: localCart });
    window.location.href = response.url;
  };

  return (
    <CartDrawerWrapper
      isOpen={isOpen}
      onClose={toggle}
      totalPrice={totalPrice}
      onCheckout={handleCheckout}
    >
      <CartDrawerList
        products={data}
        quantityFn={(id) => localCart.find((item) => item.id === id)!.quantity}
        onIncrementProductQuantity={(id) => addProductToLocalCart(id)}
        onDecrementProductQuantity={(id) => removeProductFromLocalCart(id)}
      />
    </CartDrawerWrapper>
  );
};
