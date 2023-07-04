import Product from "/components/Product";

export default function Home({ products }) {
  return (
    <div className="w-full flex flex-row flex-wrap gap-4">
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  return {
    props: { products },
  };
}
