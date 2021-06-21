import { Form, Formik } from "formik";
import { Button } from "@chakra-ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Stack } from "@chakra-ui/layout";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";

import { giftcardSchema } from "../../../utils/validators";
import FormField from "../../FormFields";

const GiftcardFields = ({ addGiftCardToCart, giftcard }) => {
  return (
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
          <Stack spacing={3}>
            <FormField
              name="denomination"
              label="Select Denomination"
              mode="select"
              items={giftcard.denominations}
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
  );
};

export default GiftcardFields;
