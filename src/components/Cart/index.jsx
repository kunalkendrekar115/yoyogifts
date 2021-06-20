import { useContext } from "react";
import { Flex, Heading, Stack } from "@chakra-ui/layout";
import { AppContext } from "../../utils";
import { Button } from "@chakra-ui/button";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import CartTable from "./CartTable";

const Cart = () => {
  const {
    appData: { cart },
    updateAppData
  } = useContext(AppContext);

  const totalAmount = cart.reduce(
    (acc, { denomination }) => acc + parseInt(denomination),
    0
  );

  const handleSubmit = async () => {
    const order = { totalAmount, cart };
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
      });

      const res = await response.json();
      if (res.status === 200) {
        updateAppData({ cart: [] });
        window.location.href = "/login";
      }
    } catch (error) {
      console.log(error);
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
              type="submit"
              onClick={handleSubmit}
            >
              Proceed To Checkout
            </Button>
          </Stack>
        </Flex>
      )}
    </Flex>
  );
};

export default Cart;
