import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { Heading, Flex, Text, Box, Badge, HStack } from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import { AppContext } from "../../utils/AppContext";
import CategoryFilter from "../FilterGiftCards/CategoryFilter";
import SearchFilter from "../FilterGiftCards/SearchFilter";

import { header } from "./index.module.css";

const Header = (props) => {
  const router = useRouter();

  const { pathname } = router;

  const [session] = useSession();

  const {
    appData: { cart }
  } = useContext(AppContext);

  const cartCount = cart.length;

  return (
    <Box as="nav" className={header} h="60px" p="4">
      <Link href="/" passHref={true}>
        <Heading cursor="pointer" as="h2" size="lg" mr="10">
          YoYoGifts
        </Heading>
      </Link>

      {pathname === "/" && <SearchFilter />}

      {pathname === "/" && <CategoryFilter />}

      <Flex pr="5">
        <HStack spacing="8">
          <Link href="/" passHref={true}>
            <Text cursor="pointer" marginLeft={8} colorScheme="whiteAlpha">
              Dashboard
            </Text>
          </Link>

          {!session && (
            <Link href="login" passHref={true}>
              <Text cursor="pointer" colorScheme="whiteAlpha">
                Login
              </Text>
            </Link>
          )}

          {session && (
            <Link href="/profile" passHref={true}>
              <Text cursor="pointer" marginLeft={8} colorScheme="whiteAlpha">
                Profile
              </Text>
            </Link>
          )}
          {cartCount > 0 && (
            <Flex
              cursor="pointer"
              marginLeft={10}
              align="center"
              onClick={() => router.push("/cart")}
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              <Badge marginLeft={1}>{cartCount}</Badge>
            </Flex>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
