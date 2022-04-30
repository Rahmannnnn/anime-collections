import { MONTH_SHORT } from "./date";

describe("date constant", () => {
  it("MONTH_SHORT get item value index 0", () => {
    expect(MONTH_SHORT[0]).toBe("Jan");
  });
});
