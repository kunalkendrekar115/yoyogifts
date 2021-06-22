import { Provider as AuthProvider } from "next-auth/client";
import { Box } from "@chakra-ui/react";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import Header from "../src/components/Header";
import "../styles/globals.css";
import { AppContextProvider, ChakraUIContainer, ToastMessage, SEOTags } from "../src/utils";

function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <AuthProvider session={pageProps.session}>
        <ChakraUIContainer>
          <ToastMessage></ToastMessage>
          <SEOTags />
          <Header />
          <Box mt="60px">
            <Component {...pageProps} />
          </Box>
        </ChakraUIContainer>
      </AuthProvider>
    </AppContextProvider>
  );
}

export default MyApp;
