import {
  Box,
  Container,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";

const Footer = () => {
  return (
    <Box mt={20} color={useColorModeValue("gray.700", "gray.200")}>
      <Container
        as={Stack}
        maxW="6xl"
        py={4}
        spacing={4}
        justify="center"
        align="center"
      >
        <Text>&copy; 2021 Helper</Text>
        <Text>
          Built with{" "}
          <Link
            href="https://nextjs.org/"
            target="_blank"
            _hover={{
              color: "#333",
              textDecoration: "underline",
            }}
          >
            NextJS
          </Link>{" "}
          and{" "}
          <Link
            href="https://chakra-ui.com/"
            target="_blank"
            _hover={{
              color: "#4ED0C5",
              textDecoration: "underline",
            }}
          >
            ChakraUI
          </Link>
        </Text>
        <Stack direction="row" mt={3} spacing={6}>
          <Link target="_blank" href="https://github.com/usamahbass/helper">
            Github
          </Link>
          <Link
            target="_blank"
            href="https://github.com/usamahbass/helper/issues"
          >
            Issues
          </Link>
          <NextLink href="/coders?ref=footer">
            <Link>Coders</Link>
          </NextLink>
          <Link
            target="_blank"
            href="https://github.com/usamahbass/helper#contribute"
          >
            How to Add New Helper
          </Link>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
