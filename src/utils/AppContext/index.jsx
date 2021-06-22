import React, { useState, createContext } from "react";
import PropTypes from "prop-types";

const initialValues = {
  giftcards: null,
  isGiftCardsLoading: false,
  selectedCategory: "",
  cart: []
};

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [appData, setAppData] = useState(initialValues);

  const updateAppData = (data) => {
    setAppData((prev) => ({ ...prev, ...data }));
  };

  return <AppContext.Provider value={{ appData, updateAppData }}>{children}</AppContext.Provider>;
};

AppContextProvider.propTypes = {
  children: PropTypes.element.isRequired
};
