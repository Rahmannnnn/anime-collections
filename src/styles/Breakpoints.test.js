import { mq } from "./Breakpoints";

describe("Breakpoints.js", () => {
  it("get return 'xs' size", () => {
    let text = mq("xs");
    expect(text).toBe("@media screen and (min-width: 0px)");
  });

  it("get return 'sm' size", () => {
    let text = mq("sm");
    expect(text).toBe("@media screen and (min-width: 576px)");
  });

  it("get return 'md' size", () => {
    let text = mq("md");
    expect(text).toBe("@media screen and (min-width: 768px)");
  });

  it("get return 'lg' size", () => {
    let text = mq("lg");
    expect(text).toBe("@media screen and (min-width: 992px)");
  });

  it("get return 'xl' size", () => {
    let text = mq("xl");
    expect(text).toBe("@media screen and (min-width: 1200px)");
  });

  it("get return 'xxl' size", () => {
    let text = mq("xxl");
    expect(text).toBe("@media screen and (min-width: 1400px)");
  });

  it("get return 'xxxl' size", () => {
    let text = mq("xxxl");
    expect(text).toBe("@media screen and (min-width: 1920px)");
  });

  it("get return default size", () => {
    let text = mq("");
    expect(text).toBe("@media screen and (min-width: 0px)");
  });
});
