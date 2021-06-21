import { useContext } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import Image from "next/image";

import { AppContext } from "../../utils";
import GiftcardFields from "./GiftcardsFields";

const GiftCard = ({ giftcard }) => {
  if (!giftcard) return <Spinner />;

  const { appData, updateAppData } = useContext(AppContext);

  const addGiftCardToCart = (values, { resetForm }) => {
    const { cart } = appData;

    console.log(cart);
    const updatedCart = [...cart, { ...giftcard, ...values }];

    updateAppData({ cart: updatedCart });
    resetForm();
  };

  return (
    <Box>
      <Box marginLeft="5" marginTop="5">
        <Heading size="lg">{giftcard.name}</Heading>
        <Text>{giftcard.description}</Text>
      </Box>
      <Flex marginTop="5" bg="lightgrey" padding="5">
        <Image
          alt={giftcard.name}
          src={`/assets/${giftcard.image}.png`}
          width={300}
          height={200}
          layout="fixed"
        />

        <GiftcardFields
          giftcard={giftcard}
          addGiftCardToCart={addGiftCardToCart}
        />
      </Flex>
    </Box>
  );
};

export default GiftCard;
