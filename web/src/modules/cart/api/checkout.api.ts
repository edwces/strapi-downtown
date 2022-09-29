import { useMutation } from "react-query";
import { http } from "../../../lib/http";
import { CheckoutItem } from "../cart.types";

type CheckoutBody = {
  items: CheckoutItem[];
};

const checkout = (data: CheckoutBody) => {
  return http.post("checkout", data).then((response) => response.data);
};

export const useCheckout = () => {
  return useMutation((data: CheckoutBody) => checkout(data));
};
