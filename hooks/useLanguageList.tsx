import { formatLanguageIcons } from "~/helper/formatLanguageIcons";
import type { ResourcesType } from "~/types/resources";

const useLanguageList = (resources: Array<ResourcesType>) => {
  if (resources) {
    const languageList: Array<string> = resources?.map(
      (resource) => resource.frontMatter.language
    );

    return languageList.map((language) => ({
      name: language,
      image: formatLanguageIcons(language),
    }));
  }

  return [];
};

export default useLanguageList;
