import { Suspense } from "react";
import sleep from "../../../utils/sleep";
import Cart from "/components/Cart";

export async function getCart(userId) {
  const [resUser, resCart, resProducts] = await Promise.all([
    fetch(`https://fakestoreapi.com/users/${userId}`),
    fetch(`https://fakestoreapi.com/carts/user/${userId}`),
    fetch(`https://fakestoreapi.com/products`),
  ]);

  const [user, cartData, products] = await Promise.all([
    resUser.json(),
    resCart.json(),
    resProducts.json(),
  ]);

  // await sleep(2000);

  return {
    ...cartData[0],
    user,
    products: cartData[0].products.map(({ productId, quantity }) => ({
      ...products.find(({ id }) => id === productId),
      quantity,
    })),
  };
}

export default async function CartPage({ params }) {
  const cartPromise = getCart(params.userId);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CartSection cartPromise={cartPromise} />
    </Suspense>
  );
}

async function CartSection({ cartPromise }) {
  const cart = await cartPromise;
  return <Cart {...cart} />;
}
