import { Suspense } from "react";
import sleep from "../../utils/sleep";
import Product from "/components/Product";

export async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  // await sleep(2000);
  return res.json();
}

export default async function SuspendedProducts() {
  const productsPromise = getProducts();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ProductsSection productsPromise={productsPromise} />
    </Suspense>
  );
}

async function ProductsSection({ productsPromise }) {
  const products = await productsPromise;
  return (
    <div className="w-full flex flex-row flex-wrap gap-4">
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  );
}
