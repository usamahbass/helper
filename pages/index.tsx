import { useState, useEffect, ChangeEvent } from "react";
import type { ResourcesType } from "~/types/resources";
import { SimpleGrid } from "@chakra-ui/layout";
import { useDebounce } from "use-debounce";
import { NextSeo as SEO } from "next-seo";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { DefaultSEO } from "~/seo.config";
import Hero from "~/views/home/hero";
import useLanguageList from "~/hooks/useLanguageList";
import Card from "~/components/card";
import Layouts from "~/layouts";

type HomePagesProps = {
  resources: Array<ResourcesType>;
};

const Home = ({ resources }: HomePagesProps) => {
  let languageList = useLanguageList(resources);

  const [resourcesList, setResourcesList] = useState<ResourcesType[]>([]);

  const [searchValue, setSearchValue] = useState("");

  const [searchHasDebounce] = useDebounce(searchValue, 500);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSelectLanguage = (language: string) => {
    const newResourceListFilterByLanguage = resources.filter(
      (resource) => resource.frontMatter.language === language
    );

    setResourcesList(newResourceListFilterByLanguage);
  };

  useEffect(() => {
    setResourcesList(resources);
  }, []);

  useEffect(() => {
    if (searchHasDebounce) {
      let newResourcesList: Array<ResourcesType> = [];

      newResourcesList = resources.filter(
        (resource) =>
          resource.frontMatter.title
            ?.toLowerCase()
            ?.includes(searchHasDebounce.toLowerCase()) ||
          resource.frontMatter.usage
            ?.toLowerCase()
            ?.includes(searchHasDebounce.toLowerCase()) ||
          resource.frontMatter.coder
            ?.toLowerCase()
            ?.includes(searchHasDebounce.toLowerCase())
      );

      setResourcesList(newResourcesList);
    }

    return () => setResourcesList(resources);
  }, [searchHasDebounce]);

  return (
    <Layouts>
      <SEO {...DefaultSEO} />
      <Hero
        handleSearch={handleSearch}
        languageList={languageList}
        handleSelectLanguage={handleSelectLanguage}
      />

      <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 2 }}>
        {resourcesList?.length > 0
          ? resourcesList.map((resource) => {
              const newResource = {
                ...resource,
                searchResult: searchHasDebounce,
              };
              return <Card {...newResource} />;
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

export default Home;
