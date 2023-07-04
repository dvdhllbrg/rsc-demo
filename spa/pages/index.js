import { useEffect, useState } from "react";
import Product from "/components/Product";

export default function Home() {
  const [products, setProducts] = useState();

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const prods = await res.json();
      setProducts(prods);
    };
    getProducts();
  }, []);

  if (!products) {
    return <p>Loading ...</p>;
  }

  return (
    <div className="w-full flex flex-row flex-wrap gap-4">
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  );
}
