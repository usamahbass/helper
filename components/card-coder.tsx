import { useEffect, useState } from "react";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  AvatarGroup,
  useColorModeValue,
  ScaleFade,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { UserProps } from "~/data/users";
import { formatLanguageIcons } from "~/helper/formatLanguageIcons";
import { getFullName } from "~/helper/getFullName";
import type { ResourcesType } from "~/types/resources";

type CardCoderProps = {
  resources: Array<ResourcesType>;
} & UserProps;

const CardCoder = ({ username, avatar, bio, resources }: CardCoderProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);

    return () => setOpen(false);
  }, []);

  return (
    <ScaleFade in={open} initialScale={0.8}>
      <Center py={6}>
        <Box
          maxW="320px"
          transition=".25s ease,transform .25s ease,-webkit-transform .25s ease"
          w="full"
          bg={useColorModeValue("white", "gray.800")}
          boxShadow="xl"
          rounded="sm"
          p={6}
          textAlign="center"
        >
          <Avatar size="xl" src={avatar} alt={username} mb={4} pos="relative" />
          <Heading fontSize="2xl" fontFamily="body">
            {getFullName(username)}
          </Heading>
          <Text fontWeight={600} color="gray.500" mb={4}>
            @{username}
          </Text>
          <Text
            textAlign="center"
            color={useColorModeValue("gray.700", "gray.400")}
            px={3}
          >
            {bio}
          </Text>

          <AvatarGroup justifyContent="center" mt="3" max={8} size="sm">
            {resources.map((resource, idx) => (
              <Avatar
                bg="transparent"
                name={resource.frontMatter.language}
                key={`${resource.frontMatter.language}-${idx + 1}`}
                src={formatLanguageIcons(resource.frontMatter.language)}
              />
            ))}
          </AvatarGroup>

          <Stack mt={8} direction="row" spacing={4}>
            <NextLink href={`/coders/${username}`}>
              <Button
                flex={1}
                fontSize="sm"
                rounded="full"
                _focus={{
                  bg: "gray.200",
                }}
              >
                See Profile
              </Button>
            </NextLink>
          </Stack>
        </Box>
      </Center>
    </ScaleFade>
  );
};

export default CardCoder;
