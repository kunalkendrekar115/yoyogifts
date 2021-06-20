import { Flex, Stack, Button, Heading } from "@chakra-ui/react";
import Link from "next/link";

import FormField from "../FormFields";

const LoginFields = ({ isSubmitting }) => {
  return (
    <Flex
      padding="5"
      align="center"
      justify="center"
      direction="column"
      bg="lightgray"
    >
      <Heading size="lg">Login</Heading>
      <Flex
        padding="8"
        boxShadow="md"
        marginTop="5"
        bg="white"
        w="md"
        flexDirection="column"
        justify="flex-end"
      >
        <Stack spacing={8}>
          <FormField name="emailId" label="Email address" />

          <FormField name="password" label="Password" type="password" />

          <Button
            style={{ marginLeft: "auto" }}
            w="100px"
            mt={2}
            colorScheme="teal"
            type="submit"
            isLoading={isSubmitting}
          >
            Submit
          </Button>
        </Stack>
      </Flex>

      <Flex marginTop="5" justify="flex-start" w="md">
        <Heading size="sm">Don't have account?</Heading>
        <Link href="/signup">
          <Heading size="sm" marginLeft="2" cursor="pointer">
            Sign Up
          </Heading>
        </Link>
      </Flex>
    </Flex>
  );
};

export default LoginFields;
