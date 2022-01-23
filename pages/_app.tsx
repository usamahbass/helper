import type { AppProps } from "next/app";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Store } from "~/context";
import { ThemeProvider } from "~/theme";
import "nprogress/nprogress.css";
import "~/lib/_custom-nprogress.css";
import "~/lib/_github-markdown.css";

const TopProgress = dynamic(() => import("~/components/top-progress"), {
  ssr: false,
});

const HelperApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <Store>
        <Head>
          <link rel="shortcut icon" href="/icons/favicon.ico" />
          <link rel="manifest" href="/icons/manifest.json" />
        </Head>

        <TopProgress />
        <Component {...pageProps} />
      </Store>
    </ThemeProvider>
  );
};

export default HelperApp;
