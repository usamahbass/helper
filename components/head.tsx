import NextHead from "next/head";

type HeadProps = {
  url: string;
};

const Head = ({ url }: HeadProps) => (
  <NextHead>
    <meta name="url" content={url} />
  </NextHead>
);

export default Head;
