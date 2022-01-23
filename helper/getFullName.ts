export const getFullName = (username: string) => {
  const fullName: string = username
    ?.replace(/-g/, " ")
    ?.replace(/_g/, " ")
    ?.toUpperCase();

  return fullName;
};
