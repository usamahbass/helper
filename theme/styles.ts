import { mode } from "@chakra-ui/theme-tools";

export const styles = {
  global: (props: any) => ({
    body: {
      fontFamily: "body",
      bg: mode("white", "gray.800")(props),
      minH: "100%",
    },
    html: {
      minH: "100%",
    },
  }),
};
