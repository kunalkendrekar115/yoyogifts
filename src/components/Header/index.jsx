import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { Heading, Flex, Text, Box, Badge } from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import { AppContext } from "../../utils/AppContext";
import CategoryFilter from "../FilterGiftCards/CategoryFilter";
import SearchFilter from "../FilterGiftCards/SearchFilter";

const Header = (props) => {
  const router = useRouter();

  const { pathname } = router;

  const [session] = useSession();

  const {
    appData: { cart },
  } = useContext(AppContext);

  const cartCount = cart.length;

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding={3}
      bg="primary.1"
      color="white"
      {...props}
    >
      <Link href="/" passHref={true}>
        <Heading cursor="pointer" as="h2" size="lg" mr="10">
          YoYoGifts
        </Heading>
      </Link>

      {pathname === "/" && <SearchFilter />}

      {pathname === "/" && <CategoryFilter />}

      <Flex>
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
      </Flex>
    </Flex>
  );
};

export default Header;
