import { Box } from "@chakra-ui/layout";

type MarkdownProps = {
  content: string;
};

const Markdown = ({ content }: MarkdownProps) => {
  return (
    <Box
      as="article"
      className="markdown-body"
      marginBottom="50px"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default Markdown;
