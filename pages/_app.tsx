import type { AppProps } from "next/app";
import { Store } from "~/context";
import { ThemeProvider } from "~/theme";
import "~/lib/_github-markdown.css";

const HelperApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <Store>
        <Component {...pageProps} />
      </Store>
    </ThemeProvider>
  );
};

export default HelperApp;
