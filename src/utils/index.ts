export const getInitials = (name: string) => {
  const initials = name
    .trim()
    .split(/\s+/)
    .reduce((acc, subname) => acc + subname[0], "");
  return initials.substring(0, 3).toUpperCase();
};
