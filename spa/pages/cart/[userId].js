import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cart from "/components/Cart";

export default function CartPage() {
  const router = useRouter();
  const userId = router.query.userId;

  const [cart, setCart] = useState();

  useEffect(() => {
    const getCart = async () => {
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

      const enrichedCart = {
        ...cartData[0],
        user,
        products: cartData[0].products.map(({ productId, quantity }) => ({
          ...products.find(({ id }) => id === productId),
          quantity,
        })),
      };
      setCart(enrichedCart);
    };
    if (userId) {
      getCart();
    }
  }, [userId]);

  if (!cart) {
    return <p>Loading ...</p>;
  }

  return <Cart {...cart} />;
}
