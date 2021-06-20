import { useState, createContext } from "react";

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

  return (
    <AppContext.Provider value={{ appData, updateAppData }}>
      {children}
    </AppContext.Provider>
  );
};
