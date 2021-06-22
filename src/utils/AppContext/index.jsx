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
  const [toastMessage, setToastMessage] = useState({});

  const updateAppData = (data) => {
    setAppData((prev) => ({ ...prev, ...data }));
  };

  const showToastMessage = (data) => {
    setToastMessage(data);
  };

  return (
    <AppContext.Provider value={{ appData, updateAppData, showToastMessage, toastMessage }}>
      {children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.element.isRequired
};
