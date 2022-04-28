export const indexArrayOfObject = (array, key, value) => {
  return array.findIndex((element) => element[key] === value);
};
