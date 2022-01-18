export type ResourcesType = {
  frontMatter: {
    code: string;
    title: string;
    language: string;
    spoiler: string;
    coder: string;
    usage: string;
  };
  slug: string;
};

export type ResourcesInfo = {
  meta: {
    title: string;
    spoiler: string;
    language: string;
    slug: string;
    usage: string;
    coder: string;
  };
  content: string;
};
