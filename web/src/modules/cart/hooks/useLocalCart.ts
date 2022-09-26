import { useJSONStorage } from "../../../common/hooks/useJSONStorage";

export interface CheckoutItem {
  id: number;
  quantity: number;
}

export const useLocalCart = () => {
  const [localCart, setLocalCart] = useJSONStorage({
    key: "local_cart",
    initial: [] as CheckoutItem[],
  });

  const addProductToLocalCart = (id: number) => {
    const copy = [...localCart];
    // Get index of product in cart if it exists
    const index = localCart.findIndex((item) => item.id === id);

    if (!copy[index]) {
      copy.push({ id, quantity: 1 });
    } else if (copy[index]) {
      copy[index]!.quantity += 1;
    }

    setLocalCart(copy);
  };

  const removeProductFromLocalCart = (id: number) => {
    const copy = [...localCart];
    // Get index of product in cart if it exists
    const index = localCart.findIndex((item) => item.id === id);

    if (!copy[index]) throw new Error("Id of product does not exist");
    copy[index]!.quantity -= 1;
    if (localCart[index]!.quantity <= 0) copy.splice(index, 1);

    setLocalCart(copy);
  };

  return { localCart, addProductToLocalCart, removeProductFromLocalCart };
};
