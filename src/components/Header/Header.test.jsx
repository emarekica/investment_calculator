import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header component", () => {
  test("renders 'React investment calculator' as text", () => {
    render(<Header />);

    const headerElement = screen.getByText("React investment calculator", { exact: false });
    expect(headerElement).toBeInTheDocument();
  })
});
