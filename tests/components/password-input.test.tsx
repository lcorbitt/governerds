import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { PasswordInput } from "@/components/shared/password-input";

describe("PasswordInput", () => {
  it("hides the value by default and exposes an accessible toggle", () => {
    render(<PasswordInput aria-label="Password" defaultValue="secret" />);

    const input = screen.getByLabelText("Password") as HTMLInputElement;
    expect(input.type).toBe("password");
    expect(
      screen.getByRole("button", { name: /show password/i }),
    ).toBeInTheDocument();
  });

  it("reveals and hides the value when the toggle is used", async () => {
    const user = userEvent.setup();
    render(<PasswordInput aria-label="Password" defaultValue="secret" />);

    const input = screen.getByLabelText("Password") as HTMLInputElement;
    await user.click(screen.getByRole("button", { name: /show password/i }));
    expect(input.type).toBe("text");

    await user.click(screen.getByRole("button", { name: /hide password/i }));
    expect(input.type).toBe("password");
  });
});
