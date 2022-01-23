import { useEffect, useState } from "react";
import { Button, Box, useClipboard } from "@chakra-ui/react";
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import ReactMarkdown from "react-markdown";

type MarkdownProps = {
  content: string;
};

const Markdown = ({ content }: MarkdownProps) => {
  const [codeValue, setCodeValue] = useState<string>("");

  const { hasCopied, onCopy } = useClipboard(codeValue);

  useEffect(() => {
    if (codeValue !== "") {
      onCopy();
    }

    return () => setCodeValue("");
  }, [codeValue]);

  return (
    <ReactMarkdown
      className="markdown-body"
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <Box width="100%">
              <Button
                float="right"
                onClick={() => setCodeValue(String(children))}
              >
                {hasCopied || codeValue === String(children)
                  ? "copied 🎉"
                  : "copy"}
              </Button>

              <SyntaxHighlighter
                PreTag="div"
                style={atomOneDark}
                language={match[1]}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            </Box>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default Markdown;
