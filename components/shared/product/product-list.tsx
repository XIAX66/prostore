import ProductCard from "./product-card";
import { Product } from "@/types";

const ProductLisk = ({
  data,
  title,
  limit,
}: {
  data: Product[];
  title?: string;
  limit?: number;
}) => {
  const limitData = limit ? data.slice(0, limit) : data;

  return (
    <div className="my-10 ">
      <h2 className="h2-bold mb-4">{title}</h2>
      {data.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {limitData.map((item: Product, index: number) => (
            <ProductCard key={index} product={item} />
          ))}
        </div>
      ) : (
        <div>
          <p>暂无数据</p>
        </div>
      )}
    </div>
  );
};

export default ProductLisk;
