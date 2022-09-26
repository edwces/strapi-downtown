import { useQuery } from "react-query";
import { BaseResponse } from "../../../common/response.model";
import { http } from "../../../lib/http";
import { Product } from "../product.model";

type UseProductsArgs = {
  initialData?: Product[];
  enabled?: boolean;
  query?: any;
};

export const getProducts = (query?: any) => {
  return http
    .get<BaseResponse<Product>>("products", {
      params: { populate: "image", ...query },
    })
    .then((response) => response.data.data);
};

export const useProducts = ({
  initialData,
  enabled,
  query,
}: UseProductsArgs) => {
  return useQuery(["products", query], () => getProducts(query), {
    initialData,
    enabled,
  });
};
