export const uniqueArray = (array: [] | any) => {
  const results = array?.filter((thing: any, index: number) => {
    const _thing = JSON.stringify(thing);
    return (
      index ===
      array.findIndex((obj) => {
        return JSON.stringify(obj) === _thing;
      })
    );
  });

  return results;
};
