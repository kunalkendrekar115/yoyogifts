import React, { useContext } from "react";
import { Flex, Select, Stack } from "@chakra-ui/react";

import { AppContext } from "../../../utils/AppContext";

const CategoryFilter = () => {
  const {
    updateAppData,
    appData: { selectedCategory }
  } = useContext(AppContext);

  const fetchGiftCards = async (query) => {
    try {
      updateAppData({ isGiftCardsLoading: true, giftcards: [] });

      const response = await fetch(`/api/giftcards${query}`);
      const giftcards = await response.json();

      updateAppData({ isGiftCardsLoading: false, giftcards });
    } catch (error) {
      console.log(error);
      updateAppData({ isGiftCardsLoading: false });
    }
  };
  return (
    <Flex flex="1" paddingLeft={10}>
      <Stack spacing={10} direction={["column", "row"]}>
        <Select
          w="180px"
          bg="white"
          placeholder="All Categories"
          overflow="clip"
          value={selectedCategory}
          color="black"
          onChange={({ target: { value } }) => {
            updateAppData({ selectedCategory: value });
            fetchGiftCards(value ? `?category=${value}` : "");
          }}
        >
          <option value="Entertainment">Entertainment</option>
          <option value="Ecommerce">Ecommerce</option>
          <option value="Travel and hospitalit">Travel and hospitality</option>
          <option value="Food and beverages">Food and beverages</option>
          <option value="Health and beaut">Health and beauty</option>
        </Select>
      </Stack>
    </Flex>
  );
};

export default CategoryFilter;
