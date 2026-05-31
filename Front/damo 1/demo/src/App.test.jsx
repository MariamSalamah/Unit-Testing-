/* eslint-disable no-unused-vars */
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import App from "./App";

const typingIntoInputs = ({ email, password, confirmPassword }) => {
  const emailInput = screen.getByLabelText("Email address");
  const passwordInput = screen.getByLabelText("Password");
  const confirmPasswordInput = screen.getByLabelText("Confirm Password");

  if (email) {
    fireEvent.change(emailInput, { target: { value: email } });
  }
  if (password) {
    fireEvent.change(passwordInput, { target: { value: password } });
  }
  if (confirmPassword) {
    fireEvent.change(confirmPasswordInput, {
      target: { value: confirmPassword },
    });
  }
  return {
    emailInput,
    passwordInput,
    confirmPasswordInput,
  };
};

describe("Test App Component", () => {
  test("Test Initial Rendering", () => {
    render(<App />);
    expect(screen.getByLabelText("Email address").value).toBe("");
    expect(screen.getByLabelText("Password").value).toBe("");
    expect(screen.getByLabelText("Confirm Password").value).toBe("");
  });

  test("Test After Typing", () => {
    render(<App />);
    const { emailInput } = typingIntoInputs({ email: "amira@gmail.com" });
    const { passwordInput } = typingIntoInputs({ password: "abc123" });
    expect(emailInput.value).toBe("amira@gmail.com");
    expect(passwordInput.value).toBe("abc123");
  });

  test("Test Error Rendering", () => {
    render(<App />);
    const { emailInput } = typingIntoInputs({ email: "amira@gmail.com" });
    const { passwordInput } = typingIntoInputs({ password: "ab" });
    let btn = screen.getByRole("button", { name: /Submit/i });
    fireEvent.click(btn);
    // expect(screen.getByText(/The email you input is invalid./i)).not.toBeInTheDocument()
    expect(screen.getByText(/The password you entered should contain 5 or more characters./i)).toBeInTheDocument()
  });
});
