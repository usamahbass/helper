import { NextSeoProps } from "next-seo";

export const DefaultSEO: NextSeoProps = {
  title: "HELPER - a collection of utility functions.",
  canonical: "https://helper.vercel.app",
  description:
    "A collection of utility functions and APIs packaged to support fast and easy development. Find the function you need here.",
  openGraph: {
    type: "website",
    locale: "id",
    url: "https://helper.vercel.app",
    site_name: "@helper",
    images: [
      {
        url: "https://helper.vercel.app/coders.png",
        width: 800,
        height: 600,
        alt: "HELPER",
      },
    ],
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
};

export const CodersSEO: NextSeoProps = {
  title:
    "Coders - List of coders who have provided knowledge about utility functions in HELPER.",
  canonical: "https://helper.vercel.app/coders",
  description:
    "List of coders who have provided knowledge about utility functions in HELPER.",
  openGraph: {
    type: "website",
    locale: "id",
    url: "https://helper.vercel.app/coders",
    site_name: "@helper",
    images: [
      {
        url: "https://helper.vercel.app/coders.png",
        width: 800,
        height: 600,
        alt: "Coders in HELPER",
      },
    ],
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
};
