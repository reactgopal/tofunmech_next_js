import Searchvehicle from "@/components/layout/Searchvehicle";
import Brand from "@/components/layout/brand";
import ShopCategory from "@/components/layout/shopCategory";
import AfterMarketProducts from "@/components/layout/AfterMarketProducts";

export default function Home() {
  return (
    <>
      <Searchvehicle />
      <Brand />
      <ShopCategory />
      <AfterMarketProducts />
    </>
  );
}
