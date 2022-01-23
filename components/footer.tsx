import {
  Box,
  Container,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

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
        <Text fontSize="lg">&copy; 2021 Dibuat dengan penuh cinta.</Text>
        <Stack direction="row" mt={3} spacing={6}>
          <Link href="#">Github</Link>
          <Link href="#">Issues</Link>
          <Link href="#">New Feature</Link>
          <Link href="#">Contact</Link>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
