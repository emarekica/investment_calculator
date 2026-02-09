// correct number of years returned
// correct interest calculation
// correct accumulation over time
// zero / edge cases
// immutability (no mutation of inputs)


import { describe, test, expect } from "vitest";
import { calculateInvestmentResults, formatter } from "./investment";

describe("calculateInvestmentResults", () => {
  test("returns an empty array when duration is 0", () => {
    const result = calculateInvestmentResults({
      initialInvestment: 1000,
      annualInvestment: 100,
      expectedReturn: 5,
      duration: 0,
    });

    expect(result).toEqual([]);
  });

  test("returns one result entry per investment year", () => {
    const result = calculateInvestmentResults({
      initialInvestment: 1000,
      annualInvestment: 100,
      expectedReturn: 5,
      duration: 3,
    });

    expect(result).toHaveLength(3);
    expect(result.map(r => r.year)).toEqual([1, 2, 3]);
  });

  test("calculates first year investment values correctly", () => {
    const result = calculateInvestmentResults({
      initialInvestment: 1000,
      annualInvestment: 100,
      expectedReturn: 10,
      duration: 1,
    });

    expect(result[0]).toEqual({
      year: 1,
      interest: 100,              // 10% of 1000
      annualInvestment: 100,
      valueEndOfYear: 1200,       // 1000 + 100 interest + 100 annual investment
    });
  });

  test("accumulates investment value correctly across multiple years", () => {
    // Confirms that each year builds on the previous year's value.

    const result = calculateInvestmentResults({
      initialInvestment: 1000,
      annualInvestment: 100,
      expectedReturn: 10,
      duration: 2,
    });

    // Using toBeCloseTo to guard against floating-point precision issues
    expect(result[1].valueEndOfYear).toBeCloseTo(1420);
    // Year 1: 1000 → 1200
    // Year 2: 1200 + 120 interest + 100 = 1420
  });

  test("does not mutate the input object", () => {
    const input = {
      initialInvestment: 1000,
      annualInvestment: 100,
      expectedReturn: 5,
      duration: 2,
    };

    calculateInvestmentResults(input);

    expect(input).toEqual({
      initialInvestment: 1000,
      annualInvestment: 100,
      expectedReturn: 5,
      duration: 2,
    });
  });
});

describe("formatter", () => {
  test("formats numbers as USD currency without decimals", () => {
    // currency, locale, precision

    expect(formatter.format(1000)).toBe("$1,000");
    expect(formatter.format(0)).toBe("$0");
    expect(formatter.format(123456)).toBe("$123,456");
  });
});
