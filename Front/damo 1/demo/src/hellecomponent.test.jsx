import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Hello from "./hello";

describe("Test Hello Component", () => {
  test("Test Rendering", () => {
    render(<Hello name="Amira" />); //dom elements,screen
    expect(screen.getByText('Hello, Amira!')).toBeInTheDocument()
  });
});
