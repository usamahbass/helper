export type ResourcesType = {
  frontMatter: {
    code: string;
    title: string;
    language: string;
    spoiler: string;
  };
  slug: string;
};

export type ResourcesInfo = {
  meta: {
    title: string;
    spoiler: string;
    language: string;
    slug: string;
  };
  content: string;
};
