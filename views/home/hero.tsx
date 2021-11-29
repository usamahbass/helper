import { useRef } from "react";
import {
  chakra,
  Box,
  useColorModeValue,
  SimpleGrid,
  GridItem,
  VisuallyHidden,
  Input,
  Avatar,
  Text,
  InputGroup,
  InputLeftElement,
  Icon,
  Kbd,
  InputRightElement,
} from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { useHotkeys } from "react-hotkeys-hook";
import { Search as SearchIcon } from "react-feather";
import { uniqueArray } from "~/helper/uniqueArray";

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
  const inputRef = useRef<HTMLInputElement | null>(null);

  useHotkeys("ctrl+b", () => inputRef.current?.focus());

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
          Kumpulan fungsi utilitas dan API yang dikemas untuk mendukung
          pengembangan yang cepat dan mudah. Cari fungsi yang anda butuhkan
          disini
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
            <VisuallyHidden>Cari disini</VisuallyHidden>
            <InputGroup>
              <InputLeftElement>
                <Icon
                  top="3%"
                  position="relative"
                  fontSize="lg"
                  as={SearchIcon}
                />
              </InputLeftElement>
              <Input
                mt={0}
                ref={inputRef}
                size="lg"
                type="text"
                placeholder="Cari disini"
                onChange={handleSearch}
              />

              <InputRightElement
                display={{ base: "none", lg: "flex" }}
                position="relative"
                right="12%"
                top="3px"
              >
                <Kbd>ctrl</Kbd> + <Kbd>B</Kbd>
              </InputRightElement>
            </InputGroup>
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
              placeholder="Cari dengan bahasa"
              h="12"
            />
            <AutoCompleteList w={{ base: "90%", lg: "60" }}>
              {uniqueArray(languageList)?.map((language, i) => (
                <AutoCompleteItem
                  key={`language-${i}`}
                  value={language.name}
                  textTransform="capitalize"
                  align="center"
                >
                  <Avatar size="sm" name={language.name} src={language.image} />
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
