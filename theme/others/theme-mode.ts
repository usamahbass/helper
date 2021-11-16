type propsMode = [string, string, string];

export const mode = (...[prop, light, dark]: propsMode) => {
  return {
    [prop]: light,
    ".chakra-ui-dark &": {
      [prop]: dark,
    },
  };
};
