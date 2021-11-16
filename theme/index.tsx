import {
  extendTheme,
  ChakraProvider,
  ChakraProviderProps,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { overrides } from "./overrides";
import Fonts from "./collects/font";

const theme = extendTheme(overrides);

export const ThemeProvider = ({ children }: ChakraProviderProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      {children}
    </ChakraProvider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
