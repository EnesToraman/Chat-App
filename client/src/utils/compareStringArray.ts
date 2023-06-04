export const compareStringArray = (a: string[], b: string[]) => {
  if (a.length !== b.length) return false;
  a.sort();
  b.sort();
  return a.every((el, index) => el === b[index]);
}