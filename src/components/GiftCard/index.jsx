import { useContext } from "react";
import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, HStack, Stack, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { Form, Formik } from "formik";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";

import { AppContext } from "../../utils";
import { giftcardSchema } from "../../utils/validators";
import FormField from "../FormFields";

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

        <Box w="md" marginLeft="20" boxShadow="lg" padding="5" bg="white">
          <Formik
            initialValues={{
              denomination: "",
              recipientName: "",
              recipientEmail: ""
            }}
            validationSchema={giftcardSchema}
            onSubmit={addGiftCardToCart}
          >
            <Form>
              <Stack spacing={5}>
                <FormField
                  name="denomination"
                  label="Enter Denomination"
                  leftAddon="&#8377;"
                />

                <FormField
                  name="recipientName"
                  label="Recipient name"
                  leftAddon={<FontAwesomeIcon icon={faUser} />}
                />
                <FormField
                  name="recipientEmail"
                  label="Recepient Email address"
                  leftAddon={<FontAwesomeIcon icon={faEnvelope} />}
                />

                <Button
                  style={{ marginLeft: "auto" }}
                  w="100px"
                  mt={2}
                  colorScheme="teal"
                  type="submit"
                >
                  Add to Cart
                </Button>
              </Stack>
            </Form>
          </Formik>
        </Box>
      </Flex>
    </Box>
  );
};

export default GiftCard;
