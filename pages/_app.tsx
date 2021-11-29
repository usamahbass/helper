import type { AppProps } from "next/app";
import { ThemeProvider } from "~/theme";
import "~/lib/_github-markdown.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
