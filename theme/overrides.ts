import { ThemeConfig, ThemeOverride } from "@chakra-ui/react";
import { layerStyles } from "./others/layer-styles";
import { textStyles } from "./others/text-styles";
import { styles } from "./styles";
import { colors } from "./collects/colors";
import { fonts } from "./collects/font";

export const config: ThemeConfig = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

export const overrides: ThemeOverride = {
  config,
  colors,
  fonts,
  styles,
  textStyles,
  layerStyles,
};
