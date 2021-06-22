import { useContext } from 'react';
import { Badge, Box, Flex, Heading, HStack, Text } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import Image from 'next/image';

import { AppContext } from '../../utils';
import GiftcardFields from './GiftcardsFields';
import GiftcardReviews from './GiftcardReviews';

const GiftCard = ({ giftcard }) => {
  const { appData, updateAppData } = useContext(AppContext);

  const addGiftCardToCart = (values, { resetForm }) => {
    const { cart } = appData;

    console.log(cart);
    const updatedCart = [...cart, { ...giftcard, ...values }];

    updateAppData({ cart: updatedCart });
    resetForm();
  };

  if (!giftcard) return <Spinner />;

  return (
    <Box>
      <Flex p="5">
        <Image
          alt={giftcard.name}
          src={`/assets/${giftcard.image}.png`}
          width={200}
          height={120}
          layout="fixed"
        />

        <Box ml="5">
          <Heading size="lg">{giftcard.name}</Heading>
          <Text>{giftcard.description}</Text>

          <HStack spacing="4" mt="4">
            {giftcard.keywords &&
              giftcard.keywords.map((keyword, index) => (
                <Badge p="1" key={`key-${index}`}>
                  {keyword}
                </Badge>
              ))}
          </HStack>
        </Box>
      </Flex>

      <Flex mt="5" bg="lightgrey" padding="5" justify="space-around" align="flex-start">
        <GiftcardReviews giftcard={giftcard} />
        <GiftcardFields giftcard={giftcard} addGiftCardToCart={addGiftCardToCart} />
      </Flex>
    </Box>
  );
};

export default GiftCard;
