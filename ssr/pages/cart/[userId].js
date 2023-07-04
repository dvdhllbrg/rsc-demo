import Cart from "/components/Cart";

export default function CartPage({ cart }) {
  return <Cart {...cart} />;
}

export async function getServerSideProps({ query }) {
  const [resUser, resCart, resProducts] = await Promise.all([
    fetch(`https://fakestoreapi.com/users/${query.userId}`),
    fetch(`https://fakestoreapi.com/carts/user/${query.userId}`),
    fetch(`https://fakestoreapi.com/products`),
  ]);

  const [user, cartData, products] = await Promise.all([
    resUser.json(),
    resCart.json(),
    resProducts.json(),
  ]);

  const cart = {
    ...cartData[0],
    user,
    products: cartData[0].products.map(({ productId, quantity }) => ({
      ...products.find(({ id }) => id === productId),
      quantity,
    })),
  };

  return {
    props: { cart },
  };
}
