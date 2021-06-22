import { useContext } from "react";
import { Flex, Box, Divider, Grid, Heading, Stack } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { AppContext } from "../../utils";

export default function GiftcardsList({ featuredGiftcards }) {
  const {
    appData: { giftcards: filteredGiftCards, selectedCategory, isGiftCardsLoading }
  } = useContext(AppContext);

  const giftcards = filteredGiftCards ? filteredGiftCards : featuredGiftcards;

  const router = useRouter();

  const renderGiftCarditem = (giftcard) => (
    <Box
      cursor="pointer"
      key={giftcard.name}
      onClick={() => router.push(`/${giftcard.name}`)}
      p="2"
      boxShadow="md"
    >
      <Image alt={giftcard.image} src={`/assets/${giftcard.image}.png`} width={250} height={150} />

      <Heading mt="2" ml="2" size="sm">
        {giftcard.name}
      </Heading>
    </Box>
  );

  return (
    <Box padding="10">
      {isGiftCardsLoading || giftcards.length === 0 ? (
        <Flex h="80vh" padding="10" alignItems="center" justifyContent="center">
          {isGiftCardsLoading ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          ) : (
            <Heading size="lg">No Giftcards Found</Heading>
          )}
        </Flex>
      ) : (
        <Stack spacing={5} direction="column">
          <Heading size="lg">{`${
            selectedCategory ? selectedCategory : "Featured"
          } GiftCards`}</Heading>

          <Divider />

          <Grid templateColumns="repeat(4, 1fr)" gap={10}>
            {giftcards.map((giftcard) => renderGiftCarditem(giftcard))}
          </Grid>
        </Stack>
      )}
    </Box>
  );
}
