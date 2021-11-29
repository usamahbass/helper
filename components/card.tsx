import { useEffect, useState } from "react";
import { Box, Text, Divider, Image } from "@chakra-ui/react";
import NextLink from "next/link";
import type { ResourcesType } from "~/types/resources";
import { formatLanguageIcons } from "~/helper/formatLanguageIcons";

const Card = ({ frontMatter, slug }: ResourcesType) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(!open);
  }, []);

  const { title, language, spoiler } = frontMatter;

  return (
    <Box
      transition=".25s ease,transform .25s ease,-webkit-transform .25s ease"
      maxW="sm"
      w="full"
      mb="10"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      _hover={{
        boxShadow:
          "0 1.5rem 2.5rem rgba(22,28,45,.1),0 .3rem 0.5rem -.50rem rgba(22,28,45,.05) !important",
      }}
    >
      <Box display="block" float="right" ml="auto">
        <Image
          w="10"
          h="10"
          roundedTopRight="5"
          src={formatLanguageIcons(language)}
        />
      </Box>
      <Box p="6">
        <NextLink href={`/detail/${slug}`}>
          <Box
            mt="3"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            _hover={{
              color: "blue.500",
              cursor: "pointer",
              transition: "linear 0.3s",
            }}
            isTruncated
          >
            {title}
          </Box>
        </NextLink>

        <Divider mt="3" />

        <Text mt="3" as="p" color="gray.500" isTruncated>
          {spoiler}
        </Text>
      </Box>
    </Box>
  );
};

export default Card;
