import { FC } from "react";
import { Box, Container } from "@chakra-ui/layout";
import Footer from "./footer";
import ThemeToggle from "~/components/theme-toggle";

const Layouts: FC = ({ children }) => {
  return (
    <Box>
      <Box as="main">
        <Container maxW="4xl">{children}</Container>
      </Box>
      <ThemeToggle />
      <Footer />
    </Box>
  );
};

export default Layouts;
