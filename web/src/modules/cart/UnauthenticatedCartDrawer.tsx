import { useLocalCart } from "./hooks/useLocalCart";
import { CartDrawerWrapper } from "./CartDrawerWrapper";
import { useMemo } from "react";
import { CartDrawerList } from "./CartDrawerList";
import { useCartDrawer } from "./store/cart-drawer.store";
import { useProducts } from "../products/api/get-products.api";

export const UnauthenticatedCartDrawer = () => {
  const { isOpen, toggle } = useCartDrawer();
  const { localCart, addProductToLocalCart, removeProductFromLocalCart } =
    useLocalCart();

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

  return (
    <CartDrawerWrapper
      isOpen={isOpen}
      onClose={toggle}
      totalPrice={totalPrice}
      onCheckout={() => console.log("checkout !!!")}
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
