import ProductLisk from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.action";

const HomePage = async () => {
  const latestProducts = await getLatestProducts();
  return (
    <>
      <ProductLisk data={latestProducts} title="热门商品" />
    </>
  );
};

export default HomePage;
