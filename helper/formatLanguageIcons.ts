/**
 *
 * @param languageName
 * @returns {string}
 *
 * use devicon.dev for format languageIcon @see https://devicon.dev/ for more.
 *
 */

export const formatLanguageIcons = (languageName: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${languageName.toLowerCase()}/${languageName.toLowerCase()}-original.svg`;
