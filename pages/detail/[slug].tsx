import { FunctionComponent } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  Box,
  Heading,
  Text,
  Link,
  Divider,
  Image,
  Stack,
} from "@chakra-ui/react";
import { Edit as EditIcon } from "react-feather";
import type { ResourcesInfo } from "~/types/resources";
import { unified } from "unified";
import fs from "fs";
import matter from "gray-matter";
import html from "remark-html";
import highlight from "remark-highlight.js";
import markdown from "remark-parse";
import { formatLanguageIcons } from "~/helper/formatLanguageIcons";
import Layouts from "~/layouts";
import Markdown from "~/components/markdown";

interface ResourceDetailsProps {
  resource: ResourcesInfo;
}

const ResourceDetails: FunctionComponent<ResourceDetailsProps> = ({
  resource,
}) => {
  const {
    meta: { title, language, slug },
    content,
  } = resource;

  return (
    <Layouts>
      <Box mt={20} textAlign="center" mb={10}>
        <Heading mb="5">{title}</Heading>
        <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
          <Stack
            justifyContent="center"
            alignItems="center"
            mr="5"
            spacing={2}
            direction="row"
            flexWrap="wrap"
          >
            <Image
              w={6}
              h={6}
              borderRadius="50%"
              src={formatLanguageIcons(language)}
              alt={language}
            />
            <Text position="relative" top="3px">
              {language}
            </Text>
          </Stack>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
          >
            <EditIcon style={{ marginRight: 5 }} />
            <Link
              target="_blank"
              href={`https://github.com/usamahbass/helper/${slug}.md`}
              position="relative"
              top="3px"
            >
              Ubah di Github
            </Link>
          </Box>
        </Box>
      </Box>
      <Divider mb={10} />
      <Markdown content={content} />
    </Layouts>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const { slug } = params;

  const path = `${process.cwd()}/resources/${slug}.md`;

  const rawContent = fs.readFileSync(path, {
    encoding: "utf-8",
  });

  const { data, content } = matter(rawContent);

  const result = await unified()
    .use(markdown)
    .use(highlight)
    .use(html)
    .process(content);

  const resource = {
    meta: {
      ...data,
      slug,
    },
    content: result.toString(),
  };

  return {
    props: {
      resource,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const path = `${process.cwd()}/resources`;
  const files = fs.readdirSync(path, "utf-8");

  const markdownFileNames = files
    .filter((fn) => fn.endsWith(".md"))
    .map((fn) => fn.replace(".md", ""));

  return {
    paths: markdownFileNames.map((fileName) => {
      return {
        params: {
          slug: fileName,
        },
      };
    }),
    fallback: false,
  };
};

export default ResourceDetails;
