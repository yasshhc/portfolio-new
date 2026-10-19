import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotFound from "@/app/not-found";

describe("404 page", () => {
  it("has one h1 and a link back to the roadmap", () => {
    render(<NotFound />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Page not found");
    expect(screen.getByRole("link", { name: "Back to the roadmap" })).toHaveAttribute("href", "/");
  });

  it("uses the site's page shell, command label and button style", () => {
    const { container } = render(<NotFound />);
    expect(container.querySelector("main")?.parentElement).toHaveClass("max-w-[1120px]");
    expect(screen.getByText(/^\$\s*cd/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to the roadmap" })).toHaveClass("rounded-full");
  });
});
