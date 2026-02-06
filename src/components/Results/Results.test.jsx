import { render, screen } from "@testing-library/react";
import { describe, test, expect, beforeEach } from "vitest";
import Results from "./Results.jsx";
import * as investment from "../../util/investment.js"; // import to mock if needed

describe("Results component", () => {
  const dummyInput = {
    initialInvestment: 1000,
    annualInvestment: 500,
    expectedReturn: 10,
    duration: 3,
  };

  beforeEach(() => {
    render(<Results input={dummyInput} />);
  })

  test("renders the table", () => {
    const table = screen.getByRole("table", { id: /result/i });
    expect(table).toBeInTheDocument();
  });

  test("renders the correct table headers", () => {
    expect(screen.getByText("Year")).toBeInTheDocument();
    expect(screen.getByText("Investment Value")).toBeInTheDocument();
    expect(screen.getByText("Interest (Year)")).toBeInTheDocument();
    expect(screen.getByText("Total Interest")).toBeInTheDocument();
    expect(screen.getByText("Invested Capital")).toBeInTheDocument();
  });

  test("renders a row for each year of investment", () => {
    const resultsData = investment.calculateInvestmentResults(dummyInput);
    const rows = screen.getAllByRole("row");

    // rows include the header row, so subtract 1
    expect(rows).toHaveLength(resultsData.length + 1);
  });

  test("renders correct values in the first row", () => {
    const resultsData = investment.calculateInvestmentResults(dummyInput);

    const firstRowCells = screen.getAllByRole("row")[1].querySelectorAll("td");
    expect(firstRowCells[0].textContent).toBe(resultsData[0].year.toString());
    expect(firstRowCells[1].textContent).toBe(investment.formatter.format(resultsData[0].valueEndOfYear));
    expect(firstRowCells[2].textContent).toBe(investment.formatter.format(resultsData[0].interest));
  });
});
