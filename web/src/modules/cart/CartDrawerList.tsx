import { Product } from "../products/product.model";
import { CartDrawerItem } from "./CartDrawerItem";

interface CartDrawerListProps {
  products?: Product[];
  quantityFn: (id: number) => number;
  onIncrementProductQuantity?: (id: number) => void;
  onDecrementProductQuantity?: (id: number) => void;
}

export const CartDrawerList = ({
  products = [],
  quantityFn,
  onDecrementProductQuantity = () => {},
  onIncrementProductQuantity = () => {},
}: CartDrawerListProps) => {
  return (
    <ul className="flex flex-grow flex-col gap-10">
      {products.map((product) => (
        <li key={product.id}>
          <CartDrawerItem
            label={product.attributes.label}
            price={product.attributes.price}
            src={product.attributes.image.data.attributes.formats.small.url}
            alt={product.attributes.image.data.attributes.caption}
            quantity={quantityFn(product.id)}
            onIncrementQuantity={() => onIncrementProductQuantity(product.id)}
            onDecrementQuantity={() => onDecrementProductQuantity(product.id)}
          />
        </li>
      ))}
    </ul>
  );
};
