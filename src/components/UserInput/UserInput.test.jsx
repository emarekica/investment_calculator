import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, beforeEach, vi } from "vitest";
import UserInput from "./UserInput";

const initialUserInput = {
  initialInvestment: "",
  annualInvestment: "",
  expectedReturn: "",
  duration: "",
};

describe("UserInput (contract tests)", () => {
  let onChangeMock;
  let user;

  beforeEach(() => {
    onChangeMock = vi.fn();
    user = userEvent.setup();

    render(
      <UserInput
        userInput={initialUserInput}
        onChange={onChangeMock}
      />
    );
  });

  test("renders all input fields", () => {
    expect(screen.getByLabelText(/initial investment/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/annual investment/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/expected return/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/duration/i)).toBeInTheDocument();
  });

  test("calls onChange with correct arguments for duration", async () => {
    const durationInput = screen.getByLabelText(/duration/i);

    await user.type(durationInput, "5");

    expect(onChangeMock).toHaveBeenLastCalledWith(
      "duration",
      "5"
    );
  });

  test("calls onChange with correct arguments for initial investment", async () => {
    const input = screen.getByLabelText(/initial investment/i);

    await user.clear(input);
    await user.type(input, "5");

    expect(onChangeMock).toHaveBeenLastCalledWith(
      "initialInvestment",
      "5"
  );
  });
});
