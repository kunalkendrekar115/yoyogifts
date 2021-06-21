import { Flex, Stack, Button, Heading } from "@chakra-ui/react";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        p="5"
        boxShadow="md"
        mt="5"
        bg="white"
        w="md"
        flexDirection="column"
        justify="flex-end"
      >
        <Stack spacing={4}>
          <FormField
            name="emailId"
            label="Email address"
            leftAddon={<FontAwesomeIcon icon={faEnvelope} />}
          />

          <FormField
            name="password"
            label="Password"
            type="password"
            leftAddon={<FontAwesomeIcon icon={faKey} />}
          />

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

      <Flex mt="5" justify="flex-start" w="md">
        <Heading size="sm">Don't have account?</Heading>
        <Link href={`/signup`}>
          <Heading size="sm" ml="2" cursor="pointer">
            Sign Up
          </Heading>
        </Link>
      </Flex>
    </Flex>
  );
};

export default LoginFields;
