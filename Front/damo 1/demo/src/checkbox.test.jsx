import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import CheckboxWithLabel from "./CheckboxWithLabel";

describe("Test Checkbox component", () => {
  test("Test initial Rendering", () => {
    render(<CheckboxWithLabel labelOff='OFF' labelOn='ON'/>)
    expect(screen.getByLabelText(/OFF/i)).toBeInTheDocument()
  });
   test('Test after user Event',()=>{
    render(<CheckboxWithLabel labelOff='OFF' labelOn='ON'/>)
    fireEvent.click(screen.getByLabelText(/OFF/i))
    expect(screen.getByLabelText(/ON/i)).toBeInTheDocument()
   })

});
