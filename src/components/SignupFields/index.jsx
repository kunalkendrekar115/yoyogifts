import { Flex, Stack, Button, Heading } from "@chakra-ui/react";

import FormField from "../FormFields";

const SignUpFields = ({ isSubmitting }) => {
  return (
    <Flex
      bg="lightgray"
      padding="5"
      align="center"
      justify="center"
      direction="column"
    >
      <Heading size="lg">SignUp</Heading>
      <Flex
        padding="8"
        boxShadow="md"
        marginTop="5"
        bg="white"
        w="md"
        flexDirection="column"
        justify="flex-end"
      >
        <Stack spacing={4}>
          <FormField name="firstName" label="First name" />

          <FormField name="lastName" label="Last name" />
          <FormField name="emailId" label="Email address" />
          <FormField name="password" label="Password" type="password" />

          <Button
            style={{ marginLeft: "auto" }}
            w="100px"
            mt={2}
            isLoading={isSubmitting}
            colorScheme="teal"
            type="submit"
          >
            Submit
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default SignUpFields;
