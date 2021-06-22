import { Provider as AuthProvider } from "next-auth/client";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import Header from "../src/components/Header";
import "../styles/globals.css";
import { AppContextProvider, ChakraUIContainer } from "../src/utils";
import SEOTags from "../src/utils/SEOTags";
import ToastMessage from "../src/utils/ToastMessage";

function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <AuthProvider session={pageProps.session}>
        <ChakraUIContainer>
          <ToastMessage></ToastMessage>
          <SEOTags />
          <Header />
          <Component {...pageProps} />
        </ChakraUIContainer>
      </AuthProvider>
    </AppContextProvider>
  );
}

export default MyApp;
