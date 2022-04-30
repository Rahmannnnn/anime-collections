import { indexArrayOfObject, AddUniqueObjectToArray } from "./Array";

describe("Utils: Array.js", () => {
  it("test function indexArrayOfObject", () => {
    let array = [{ id: 1 }];
    let id = 1;
    let index = indexArrayOfObject(array, "id", id);
    expect(index).toBe(0);
  });

  it("test function AddUniqueObjectToArray, the item is already in the array", () => {
    let array = [{ id: 1 }];
    let id = 1;
    let newArray = AddUniqueObjectToArray(array, "id", { id });

    expect(newArray.length).toBe(1);
  });

  it("test function AddUniqueObjectToArray, The item is not in the array yet", () => {
    let array = [{ id: 1 }];
    let id = 2;
    let newArray = AddUniqueObjectToArray(array, "id", { id });

    expect(newArray.length).toBe(2);
  });
});
