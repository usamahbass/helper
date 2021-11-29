import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { ResourcesType } from "~/types/resources";

type ListPagesProps = {
  resources: Array<ResourcesType>;
};

const ListPages = ({ resources }: ListPagesProps) => {
  console.log(resources, "HERE");
  return <></>;
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

export default ListPages;
