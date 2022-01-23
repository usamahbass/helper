import { useRef } from "react";
import {
  VisuallyHidden,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Kbd,
  InputRightElement,
} from "@chakra-ui/react";
import { useHotkeys } from "react-hotkeys-hook";
import { Search as SearchIcon } from "react-feather";

type SearchProps = {
  handleSearch?: Function | any;
  placeholder?: string;
};

const Search = ({ handleSearch, placeholder }: SearchProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useHotkeys("ctrl+b", () => inputRef.current?.focus());
  return (
    <>
      <VisuallyHidden>Cari disini</VisuallyHidden>
      <InputGroup>
        <InputLeftElement>
          <Icon top="3%" position="relative" fontSize="lg" as={SearchIcon} />
        </InputLeftElement>
        <Input
          mt={0}
          ref={inputRef}
          size="lg"
          type="text"
          fontSize="md"
          placeholder={placeholder}
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
    </>
  );
};

export default Search;
