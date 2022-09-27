import { Product } from "./product.model";
import { ProductItem } from "./ProductItem";

interface ProductsList {
  products?: Product[];
  onAddProductToCart: (id: number) => void;
}

export const ProductsList = ({
  products = [],
  onAddProductToCart,
}: ProductsList) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      {products.map((product) => (
        <li key={product.id}>
          <ProductItem
            label={product.attributes.label}
            price={product.attributes.price}
            src={product.attributes.image.data.attributes.formats.medium.url}
            alt={product.attributes.image.data.attributes.caption}
            onAddToCart={() => onAddProductToCart(product.id)}
          />
        </li>
      ))}
    </ul>
  );
};
