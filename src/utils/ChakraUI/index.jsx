// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { colors } from "./variables";
import { buttonStyle } from "./styles";

export default function ChakraUIContainer({ children }) {
  const theme = extendTheme({
    components: {
      ...buttonStyle
    },
    colors: {
      primary: {
        1: colors["primary-1"],
        2: colors["primary-2"],
        3: colors["primary-3"],
        4: colors["primary-4"]
      }
    }
  });

  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
