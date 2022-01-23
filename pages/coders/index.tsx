import { useState } from "react";
import { Box, useColorModeValue, chakra, SimpleGrid } from "@chakra-ui/react";
import { NextSeo as SEO } from "next-seo";
import { useDebounce } from "use-debounce";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { USERS } from "~/data/users";
import { CodersSEO } from "~/seo.config";
import type { ResourcesType } from "~/types/resources";
import CardCoder from "~/components/card-coder";
import Search from "~/components/search";
import Layouts from "~/layouts";
import Head from "~/components/head";

type CodersProps = {
  resources: Array<ResourcesType>;
};

const Coders = ({ resources }: CodersProps) => {
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [searchHasDebounce] = useDebounce(searchValue, 500);

  let filterUserStateBySearch =
    typeof searchHasDebounce === "string"
      ? searchHasDebounce?.includes("@")
        ? USERS.filter((user) =>
            user.username
              .toLowerCase()
              .includes(searchHasDebounce.replace("@", ""))
          )
        : []
      : USERS;

  return (
    <Layouts>
      <SEO {...CodersSEO} />
      <Head url="https://helper-site.vercel.app/coders" />
      <Box py={16} mx="auto">
        <Box mx="auto" display="flex" justifyContent="center">
          <chakra.h1
            mb={3}
            fontSize={{ base: "4xl", md: "5xl" }}
            fontWeight={{ base: "bold", md: "extrabold" }}
            color={useColorModeValue("gray.900", "gray.100")}
            lineHeight="shorter"
          >
            Coders 💻 in&nbsp;
          </chakra.h1>
          <chakra.h1
            mb={3}
            color="primary.500"
            fontSize={{ base: "4xl", md: "5xl" }}
            fontWeight={{ base: "bold", md: "extrabold" }}
            lineHeight="shorter"
          >
            HELPER
          </chakra.h1>
        </Box>

        <chakra.p
          mb={6}
          textAlign="center"
          fontSize={{ base: "lg", md: "xl" }}
          color="gray.500"
          lineHeight="base"
        >
          List of coders who have provided knowledge about utility functions in
          HELPER.
        </chakra.p>

        <Box mt="10">
          <Search
            handleSearch={(event: any) => {
              if (event.target.value !== "") {
                setSearchValue(event.target.value.toLowerCase());
              } else {
                setSearchValue(null);
              }
            }}
            placeholder="@coder..."
          />
        </Box>
      </Box>

      <SimpleGrid gap={7} columns={{ base: 1, sm: 1, md: 2, lg: 3 }}>
        {filterUserStateBySearch?.length > 0
          ? filterUserStateBySearch.map((user, userIndex) => {
              const filterResourceByExistingCoder = resources.filter(
                (resource) => resource.frontMatter.coder === user.username
              );
              return (
                <CardCoder
                  key={`${user.username}-${userIndex + 1}`}
                  resources={filterResourceByExistingCoder}
                  {...user}
                />
              );
            })
          : `no results from search "${searchHasDebounce}""`}
      </SimpleGrid>
    </Layouts>
  );
};

export const getStaticProps = async () => {
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

export default Coders;
