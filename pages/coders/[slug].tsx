import { useState, ChangeEvent } from "react";
import {
  Avatar,
  Center,
  chakra,
  Stack,
  Box,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useDebounce } from "use-debounce";
import { useRouter } from "next/router";
import { NextSeo as SEO, NextSeoProps } from "next-seo";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { UserProps, USERS } from "~/data/users";
import { ResourcesType } from "~/types/resources";
import { getLengthDifferentLanguage } from "~/helper/getLengthDifferentLanguage";
import Layouts from "~/layouts";
import Search from "~/components/search";
import Card from "~/components/card";
import Head from "~/components/head";

type CoderSlugProps = {
  resources: Array<ResourcesType>;
};

const CoderSlug = ({ resources }: CoderSlugProps) => {
  const { query, isReady, push, asPath } = useRouter();

  const [searchValue, setSearchValue] = useState<string>("");

  const [searchHasDebounce] = useDebounce(searchValue, 500);

  const slug: string | any = query?.slug;

  const colorValue = useColorModeValue("gray.900", "gray.100");

  const findCoderExistInUsers: UserProps | undefined = USERS.find(
    (user) => user.username === slug?.replace("@", "")
  );

  const filterResourcesByExistingCoders = resources?.filter(
    (resource) =>
      resource?.frontMatter?.coder === findCoderExistInUsers?.username
  );

  let resourcesListExistingCoders = filterResourcesByExistingCoders.filter(
    (resource) =>
      resource.frontMatter.title
        ?.toLowerCase()
        ?.includes(searchHasDebounce.toLowerCase())
  );

  const findDifferentLanguageLength = getLengthDifferentLanguage(
    filterResourcesByExistingCoders
  );

  if (!isReady) {
    return <div>loading...</div>;
  }

  if (!findCoderExistInUsers) {
    return push("/404");
  }

  const CoderSEO: NextSeoProps = {
    title: `@${slug} - Coder in HELPER`,
    description: `@${slug} has ${resources?.length} Helper Published with ${findDifferentLanguageLength} Different Language or Frameworks.`,
    canonical: `https://helper-site.vercel.app${asPath}`,
    openGraph: {
      type: "website",
      locale: "id",
      url: `https://helper-site.vercel.app${asPath}`,
      site_name: "@helper",
      images: [
        {
          url: findCoderExistInUsers?.avatar,
          width: 800,
          height: 600,
          alt: `@${slug} Coder in HELPER`,
        },
        {
          url: findCoderExistInUsers?.avatar,
          width: 400,
          height: 200,
          alt: `@${slug} Coder in HELPER`,
        },
        {
          url: findCoderExistInUsers?.avatar,
          width: 200,
          height: 100,
          alt: `@${slug} Coder in HELPER`,
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
      <SEO {...CoderSEO} />
      <Head url={`https://helper-site.vercel.app${asPath}`} />
      <Center flexDirection="column" py="10" spacing={3} as={Stack}>
        <Avatar
          size="5xl"
          src={findCoderExistInUsers?.avatar}
          name={`@${findCoderExistInUsers?.username}`}
        />
        <chakra.h1
          mb={3}
          fontSize="4xl"
          lineHeight="shorter"
          fontWeight={{ base: "bold", md: "extrabold" }}
          color={colorValue}
        >
          {`@${findCoderExistInUsers?.username}`}
        </chakra.h1>
        <chakra.blockquote
          mb={6}
          textAlign={{ base: "center" }}
          fontSize={{ base: "lg", md: "xl" }}
          color="gray.500"
          lineHeight="base"
        >
          {findCoderExistInUsers?.bio}
        </chakra.blockquote>

        <Stack
          justifyContent="center"
          alignItems="center"
          spacing={50}
          direction="row"
          mt="3"
        >
          <Stack alignItems="center">
            <chakra.h1
              fontSize="4xl"
              lineHeight="shorter"
              fontWeight={{ base: "bold", md: "extrabold" }}
              color={colorValue}
            >
              {resources?.length}
            </chakra.h1>

            <chakra.p
              mb={6}
              textAlign={{ base: "center" }}
              fontSize={{ base: "lg", md: "xl" }}
              color="gray.500"
              lineHeight="base"
            >
              Helper
              <br />
              Published
            </chakra.p>
          </Stack>

          <Stack>
            <Box width="1px" bg="#ccc" h="110px" />
          </Stack>

          <Stack alignItems="center">
            <chakra.h1
              fontSize="4xl"
              lineHeight="shorter"
              fontWeight={{ base: "bold", md: "extrabold" }}
              color={colorValue}
            >
              {findDifferentLanguageLength}
            </chakra.h1>

            <chakra.p
              mb={6}
              textAlign={{ base: "center" }}
              fontSize={{ base: "lg", md: "xl" }}
              color="gray.500"
              lineHeight="base"
            >
              Different Language
              <br />
              or Frameworks
            </chakra.p>
          </Stack>
        </Stack>
      </Center>

      <Stack spacing={10} mt="5">
        <Search
          placeholder={`Search helper by @${slug}`}
          handleSearch={({
            target: { value },
          }: ChangeEvent<HTMLInputElement>) => setSearchValue(value)}
        />

        <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 2 }}>
          {resourcesListExistingCoders?.length <= 0
            ? searchHasDebounce !== ""
              ? `no results from search "${searchHasDebounce}""`
              : "no helper from this coder"
            : resourcesListExistingCoders.map((resource, idx) => (
                <Card
                  key={`${resource.frontMatter.title}-${idx + 1}`}
                  {...resource}
                />
              ))}
        </SimpleGrid>
      </Stack>
    </Layouts>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const pathResources = fs.readdirSync(path.join("resources"));
  const resources = pathResources.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("resources", filename),
      "utf-8"
    );
    const { data: frontMatter } = matter(markdownWithMeta);
    return {
      frontMatter,
      slug: filename.split(".")[0],
    };
  });

  return {
    props: {
      resources,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: USERS.map((user) => {
      return {
        params: {
          slug: user.username,
        },
      };
    }),
    fallback: false,
  };
};

export default CoderSlug;
