import {
  chakra,
  Box,
  useColorModeValue,
  SimpleGrid,
  GridItem,
  Avatar,
  Text,
} from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { uniqueArray } from "~/helper/uniqueArray";
import Search from "~/components/search";

type HeroProps = {
  handleSearch?: (e: any) => void;
  handleSelectLanguage?: (e: any) => void;
  languageList?: Array<{
    name: string;
    image: string;
  }>;
};

const Hero = ({
  languageList,
  handleSearch,
  handleSelectLanguage,
}: HeroProps) => {
  return (
    <Box py={16} mx="auto">
      <Box textAlign={{ base: "left", md: "center" }} mx="auto">
        <chakra.h1
          mb={3}
          fontSize={{ base: "4xl", md: "5xl" }}
          fontWeight={{ base: "bold", md: "extrabold" }}
          color={useColorModeValue("gray.900", "gray.100")}
          lineHeight="shorter"
        >
          HELPER
        </chakra.h1>
        <chakra.p
          mb={6}
          fontSize={{ base: "lg", md: "xl" }}
          color="gray.500"
          lineHeight="base"
        >
          A collection of utility functions and APIs packaged to support fast
          and easy development. Find the function you need here.
        </chakra.p>
        <SimpleGrid
          as="form"
          columns={{ base: 1, lg: 6 }}
          spacing={3}
          pt={1}
          mx="auto"
          mb={8}
          mt={20}
        >
          <GridItem as="label" colSpan={{ base: "auto", lg: 4 }}>
            <Search
              placeholder="find anything here..."
              handleSearch={handleSearch}
            />
          </GridItem>

          <AutoComplete
            onChange={handleSelectLanguage}
            emptyState="Bahasa tidak ditemukan"
            w="full"
            variant="solid"
            as={GridItem}
            openOnFocus
          >
            <AutoCompleteInput
              width="60"
              placeholder="Language or Frameworks"
              h="12"
            />
            <AutoCompleteList w={{ base: "90%", lg: "60" }}>
              {uniqueArray(languageList)?.map((language: any, i: number) => (
                <AutoCompleteItem
                  key={`language-${i}`}
                  value={language.name}
                  textTransform="capitalize"
                  align="center"
                >
                  <Avatar
                    size="sm"
                    bg="transparent"
                    name={language.name}
                    src={language.image}
                  />
                  <Text ml="4">{language.name}</Text>
                </AutoCompleteItem>
              ))}
            </AutoCompleteList>
          </AutoComplete>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Hero;
