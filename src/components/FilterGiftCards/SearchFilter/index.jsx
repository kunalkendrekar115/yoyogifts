import React, { useState } from "react";
import {
  InputLeftElement,
  Input,
  InputGroup,
  Stack,
  InputRightElement,
  Box,
  Container,
  Spinner,
  List,
  ListItem,
  Divider,
  Text
} from "@chakra-ui/react";
import { SearchIcon, SmallCloseIcon } from "@chakra-ui/icons";

const SearchFilter = () => {
  const [text, setText] = useState("");
  const [giftcards, setGiftcards] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const fetchGiftCards = async () => {
    try {
      setGiftcards([]);
      setLoading(true);

      const response = await fetch(`/api/giftcards?search=${text}`);
      const giftcards = await response.json();

      setGiftcards(giftcards);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Box width="xs" position="relative">
      <Stack spacing={1}>
        <InputGroup width="xs">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            bg="white"
            value={text}
            onChange={({ target: { value } }) => {
              setText(value);
              fetchGiftCards();
            }}
            style={{ color: "black" }}
            placeholder="Search Gift Cards"
            colorScheme="blackAlpha"
          />

          {text && !isLoading && (
            <InputRightElement
              cursor="pointer"
              onClick={() => {
                setText("");
                setGiftcards([]);
              }}
            >
              <SmallCloseIcon color="gray.600" />
            </InputRightElement>
          )}

          {text && isLoading && (
            <InputRightElement>
              <Spinner size="sm" color="gray.300" />
            </InputRightElement>
          )}
        </InputGroup>

        {giftcards.length > 0 && text && (
          <Container
            w="xs"
            maxH="200"
            borderRadius="4"
            zIndex="10"
            bg="white"
            overflowY="auto"
            boxShadow="md"
            position="absolute"
            top="40px"
          >
            <List>
              {giftcards.map((giftcard) => (
                <ListItem color="black" cursor="pointer">
                  <Stack spacing="3">
                    <Text marginLeft="2">{giftcard.name}</Text>
                    <Divider color="grey.500"></Divider>
                  </Stack>
                </ListItem>
              ))}
            </List>
          </Container>
        )}
      </Stack>
    </Box>
  );
};

export default SearchFilter;
