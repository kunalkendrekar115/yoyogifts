import { useContext, useState } from "react";
import { useSession } from "next-auth/client";
import { Flex, Heading, Stack } from "@chakra-ui/layout";
import { useRouter } from "next/router";

import { Button } from "@chakra-ui/button";
import { ArrowForwardIcon } from "@chakra-ui/icons";

import { AppContext } from "../../utils";
import CartTable from "./CartTable";

const Cart = () => {
  const {
    appData: { cart },
    updateAppData
  } = useContext(AppContext);

  const [session] = useSession();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const totalAmount = cart.reduce(
    (acc, { denomination }) => acc + parseInt(denomination),
    0
  );

  const handleSubmit = async () => {
    if (!session) {
      router.replace("/login?redirect=cart");
      return;
    }

    const order = { totalAmount, cart };
    try {
      setLoading(true);
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
      });

      setLoading(false);

      if (response.status === 200) {
        updateAppData({ cart: [] });
        router.replace("/");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleDelete = (index) => {
    console.log(index);
    updateAppData({
      cart: [...cart.slice(0, index), ...cart.slice(index + 1, cart.length)]
    });
  };

  return (
    <Flex padding="10">
      {cart.length === 0 ? (
        <Heading>Cart is empty</Heading>
      ) : (
        <Flex w="80%" direction="column" align="flex-end">
          <Stack direction={["column"]} spacing="10">
            <CartTable cart={cart} onDelete={handleDelete} />

            <Heading size="md" style={{ marginLeft: "auto", marginRight: 10 }}>
              Total Amout:&ensp; &#8377; {totalAmount}
            </Heading>

            <Button
              style={{ marginLeft: "auto" }}
              rightIcon={<ArrowForwardIcon />}
              colorScheme="teal"
              isLoading={loading}
              type="submit"
              onClick={handleSubmit}
            >
              Checkout
            </Button>
          </Stack>
        </Flex>
      )}
    </Flex>
  );
};

export default Cart;
