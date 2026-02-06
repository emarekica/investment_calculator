import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, beforeEach } from "vitest";
import App from "./App";

describe("App component", () => {
  let container;
  let user;

  beforeEach(() => {
    const rendered = render(<App />);
    container = rendered.container;

    // create a userEvent instance
    user = userEvent.setup();
  });

  test("renders Header component", () => {
    const header = container.querySelector("#header");
    expect(header).toBeInTheDocument();
  });

  test("renders UserInput component", () => {
    const input = container.querySelector("#user-input");
    expect(input).toBeInTheDocument();
  });

  test("shows validation message when duration < 1 on initial render", () => {
    expect(
      screen.getByText(/please enter duration greater than 0/i)
    ).toBeInTheDocument();
  });

  test("does not render Results component when duration < 1", () => {
    expect(screen.queryByRole("table", { name: /result/i })).toBeNull();
  });

  test("renders Results component when duration >= 1", async () => {
    const durationInput = screen.getByLabelText(/duration/i);

    await user.type(durationInput, "5");

    // Validation message should disappear
    expect(
      screen.queryByText(/please enter duration greater than 0/i)
    ).toBeNull();
  });

  test("updates state correctly when user types in inputs", async () => {
    const initialInput = screen.getByLabelText(/initial investment/i);
    const annualInput = screen.getByLabelText(/annual investment/i);
    const returnInput = screen.getByLabelText(/expected return/i);
    const durationInput = screen.getByLabelText(/duration/i);

    await user.type(initialInput, "1000");
    await user.type(annualInput, "100");
    await user.type(returnInput, "5");
    await user.type(durationInput, "2");

    expect(screen.getByRole("table", { id: /result/i })).toBeInTheDocument();
  });

 test("toggles validation message and Results when duration changes", async () => {
  const durationInput = screen.getByLabelText(/duration/i);

  // Helper to set duration
  const setDuration = async (value) => {
    await user.clear(durationInput);
    await user.type(durationInput, value);
  };

  // Start invalid → valid → invalid
  await setDuration("3");
  expect(screen.queryByText(/please enter duration greater than 0/i)).toBeNull();
  expect(screen.getByRole("table")).toBeInTheDocument();

  await setDuration("0");
  expect(screen.getByText(/please enter duration greater than 0/i)).toBeInTheDocument();
  expect(screen.queryByRole("table")).toBeNull();
});
});
