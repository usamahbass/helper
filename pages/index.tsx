import { useState, useEffect } from "react";
import type { ResourcesType } from "~/types/resources";
import { SimpleGrid } from "@chakra-ui/layout";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
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

  const handleSearch = (e: InputEvent | any) => {
    const newResourcesList = resources.filter((resource) =>
      resource.frontMatter.title
        .toLowerCase()
        .startsWith(e.target.value.toLowerCase())
    );

    setResourcesList(newResourcesList);
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

  return (
    <Layouts>
      <Hero
        handleSearch={handleSearch}
        languageList={languageList}
        handleSelectLanguage={handleSelectLanguage}
      />

      <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 2 }}>
        {resourcesList.map((resource) => (
          <Card {...resource} />
        ))}
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
