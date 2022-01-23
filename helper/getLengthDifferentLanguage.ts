import { uniqueArray } from "~/helper/uniqueArray";
import type { ResourcesType } from "~/types/resources";

export const getLengthDifferentLanguage = (resources: Array<ResourcesType>) => {
  const showOfOnlyLanguageInResources = resources.map((resource) => ({
    language: resource.frontMatter.language,
  }));

  return uniqueArray(showOfOnlyLanguageInResources)?.length;
};
