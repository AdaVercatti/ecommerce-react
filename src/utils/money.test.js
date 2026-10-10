import moneyFormat from "./money";
import { it, expect, describe } from "vitest";

describe("formatMoney", () => {
  it("formats 1999 cents as 19.99", () => {
    expect(moneyFormat(1999)).toBe("19.99");
  });

  it("display 2 decimals", () => {
    expect(moneyFormat(1090)).toBe("10.90");
    expect(moneyFormat(100)).toBe("1.00");
  });
});
