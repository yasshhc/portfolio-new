import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import JumpMenu from "@/components/JumpMenu";

function setup() {
  const navigate = vi.fn();
  const user = userEvent.setup();
  render(<JumpMenu navigate={navigate} />);
  return { navigate, user, input: screen.getByLabelText("Jump to") };
}

describe("JumpMenu", () => {
  it("focuses on Cmd+K and Ctrl+K", async () => {
    const { user, input } = setup();
    await user.keyboard("{Meta>}k{/Meta}");
    expect(input).toHaveFocus();
    input.blur();
    expect(input).not.toHaveFocus();
    await user.keyboard("{Control>}k{/Control}");
    expect(input).toHaveFocus();
  });

  it("ignores other key combos", async () => {
    const { user, input } = setup();
    await user.keyboard("k");
    expect(input).not.toHaveFocus();
    await user.keyboard("{Control>}{Shift>}k{/Shift}{/Control}");
    expect(input).not.toHaveFocus();
    await user.keyboard("{Alt>}k{/Alt}");
    expect(input).not.toHaveFocus();
  });

  it("moves the active option with arrow keys and follows it on Enter", async () => {
    const { user, input, navigate } = setup();
    await user.type(input, "crs");
    const options = screen.getAllByRole("option");
    expect(input).toHaveAttribute("aria-activedescendant", options[0].id);
    await user.keyboard("{ArrowDown}");
    expect(input).toHaveAttribute("aria-activedescendant", options[1].id);
    await user.keyboard("{Enter}");
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith(options[1].getAttribute("href"));
  });

  it("clears the query on Escape", async () => {
    const { user, input } = setup();
    await user.type(input, "crs");
    await user.keyboard("{Escape}");
    expect(input).toHaveValue("");
  });

  it("shows empty state and ignores Enter", async () => {
    const { user, input, navigate } = setup();
    await user.type(input, "zzz");
    expect(screen.getByText("No matches")).toBeInTheDocument();
    await user.keyboard("{Enter}");
    expect(navigate).not.toHaveBeenCalled();
  });

  it("lists every target as a normal link", () => {
    setup();
    for (const option of screen.getAllByRole("option")) {
      expect(option.tagName).toBe("A");
      expect(option).toHaveAttribute("href");
    }
  });
});
