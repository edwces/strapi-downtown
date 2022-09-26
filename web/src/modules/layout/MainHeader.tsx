import { ShoppingBag } from "react-feather";
import { BrandLogo } from "../../common/components/BrandLogo";
import { Button } from "../../common/components/Button";
import { useCartDrawer } from "../cart/store/cart-drawer.store";

export const MainHeader = () => {
  const toggle = useCartDrawer((state) => state.toggle);

  return (
    <header className=" p-5">
      <div className="flex justify-between items-center">
        <BrandLogo />
        <Button variant="unstyled" onClick={toggle}>
          <ShoppingBag />
        </Button>
      </div>
    </header>
  );
};
