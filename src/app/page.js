import Searchvehicle from "@/components/layout/Searchvehicle";
import Brand from "@/components/layout/brand";
import ShopCategory from "@/components/layout/shopCategory";
import AfterMarketProducts from "@/components/layout/AfterMarketProducts";
import FadeInSection from "@/components/FadeInSection";

export default function Home() {

  return (
    <>
      {/* <Searchvehicle />
      <Brand />
      <ShopCategory />
      <AfterMarketProducts /> */}

      <FadeInSection>
        <Searchvehicle />
      </FadeInSection>

      <FadeInSection>
        <Brand />
      </FadeInSection>

      <FadeInSection>
        <ShopCategory />
      </FadeInSection>

      <FadeInSection>
        <AfterMarketProducts />
      </FadeInSection>
    </>
  );
}
