export const indexArrayOfObject = (array, key, value) => {
  return array.findIndex(
    (element) => element[key].toString() === value.toString()
  );
};

export const AddUniqueObjectToArray = (array, key, item) => {
  let newArray = [...array];
  let index = indexArrayOfObject(newArray, key, item[key]);
  if (index === -1) {
    newArray.push(item);
  }

  return newArray;
};
