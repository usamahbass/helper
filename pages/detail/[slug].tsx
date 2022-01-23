import { FunctionComponent } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  Box,
  Heading,
  Text,
  Link,
  Divider,
  Image,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { NextSeo as SEO, NextSeoProps } from "next-seo";
import { Edit as EditIcon } from "react-feather";
import type { ResourcesInfo } from "~/types/resources";
import fs from "fs";
import matter from "gray-matter";
import NextLink from "next/link";
import { formatLanguageIcons } from "~/helper/formatLanguageIcons";
import Layouts from "~/layouts";
import Markdown from "~/components/markdown";

interface ResourceDetailsProps {
  resource: ResourcesInfo;
}

const ResourceDetails: FunctionComponent<ResourceDetailsProps> = ({
  resource,
}) => {
  const { asPath } = useRouter();

  const {
    meta: { title, language, slug, coder, usage },
    content,
  } = resource;

  const DetailSEO: NextSeoProps = {
    title: `${title} - @${coder}`,
    description: `${usage}, see more in https://helper.vercel.app${asPath}`,
    canonical: `https://helper.vercel.app${asPath}`,
    openGraph: {
      type: "website",
      locale: "id",
      url: `https://helper.vercel.app${asPath}`,
      site_name: "@helper",
      images: [
        {
          url: formatLanguageIcons(language),
          width: 800,
          height: 600,
          alt: `${title} - @${coder}`,
        },
      ],
    },
    twitter: {
      handle: "@handle",
      site: "@site",
      cardType: "summary_large_image",
    },
  };

  return (
    <Layouts>
      <SEO {...DetailSEO} />
      <Box mt={20} textAlign="center" mb={10}>
        <Heading mb="5">
          {title} {coder && "-"}
          {coder && (
            <NextLink href={`/coders/${coder}`}>
              <Box
                as="a"
                _hover={{
                  cursor: "pointer",
                  color: "primary.500",
                }}
              >
                &nbsp;@{coder}
              </Box>
            </NextLink>
          )}
        </Heading>

        <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
          <Stack
            justifyContent="center"
            alignItems="center"
            mr="5"
            spacing={2}
            direction="row"
            flexWrap="wrap"
          >
            <Image
              w={6}
              h={6}
              borderRadius="50%"
              src={formatLanguageIcons(language)}
              alt={language}
            />
            <Text position="relative" top="3px">
              {language}
            </Text>
          </Stack>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
          >
            <EditIcon style={{ marginRight: 5 }} />
            <Link
              target="_blank"
              href={`https://github.com/usamahbass/helper/resources/${slug}.md`}
              position="relative"
              top="3px"
            >
              Ubah di Github
            </Link>
          </Box>
        </Box>
      </Box>

      <Box mb={3}>
        <Stack direction="row" spacing={3}>
          <Text width="15%">Usage for</Text>
          <Text>:</Text>
          <Text wordBreak="break-word">{usage}</Text>
        </Stack>
      </Box>

      <Divider mb={10} />
      <Markdown content={content} />
    </Layouts>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const { slug } = params;

  const path = `${process.cwd()}/resources/${slug}.md`;

  const rawContent = fs.readFileSync(path, {
    encoding: "utf-8",
  });

  const { data, content } = matter(rawContent);

  const resource = {
    meta: {
      ...data,
      slug,
    },
    content: content.toString(),
  };

  return {
    props: {
      resource,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const path = `${process.cwd()}/resources`;
  const files = fs.readdirSync(path, "utf-8");

  const markdownFileNames = files
    .filter((fn) => fn.endsWith(".md"))
    .map((fn) => fn.replace(".md", ""));

  return {
    paths: markdownFileNames.map((fileName) => {
      return {
        params: {
          slug: fileName,
        },
      };
    }),
    fallback: false,
  };
};

export default ResourceDetails;
