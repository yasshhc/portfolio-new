import fs from "node:fs";
import path from "node:path";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CountUp from "@/components/CountUp";
import Nav from "@/components/Nav";
import ReleaseNotes from "@/components/ReleaseNotes";
import { releases } from "@/content/releases";

describe("release note previews", () => {
  it("links the shipped products to their case studies, with a preview image", () => {
    const { container } = render(<ReleaseNotes />);
    const log = within(screen.getByRole("list"));
    expect(log.getByRole("link", { name: /Bill Splitter/ })).toHaveAttribute(
      "href",
      "/work/bill-splitter",
    );
    expect(log.getByRole("link", { name: /CRS Calculator/ })).toHaveAttribute(
      "href",
      "/work/crs-calculator",
    );
    expect(container.querySelectorAll("img")).toHaveLength(2);
  });

  it("only points at preview images that exist", () => {
    for (const { preview } of releases) {
      if (preview) expect(fs.existsSync(path.join("public", preview))).toBe(true);
    }
  });
});

describe("CountUp", () => {
  it("renders the real value before anything animates", () => {
    render(<CountUp value="100+" />);
    expect(screen.getByText("100+")).toBeInTheDocument();
  });

  it("does not animate with reduced motion", () => {
    const observe = vi.fn();
    vi.stubGlobal("matchMedia", () => ({ matches: true }));
    vi.stubGlobal("IntersectionObserver", class { observe = observe; disconnect() {} });
    render(<CountUp value="146" />);
    expect(observe).not.toHaveBeenCalled();
  });

  it("counts up once in view and lands on the value, keeping the suffix", () => {
    let enter = () => {};
    const frames: FrameRequestCallback[] = [];
    vi.stubGlobal("IntersectionObserver", class {
      constructor(cb: IntersectionObserverCallback) {
        enter = () => cb([{ isIntersecting: true }] as IntersectionObserverEntry[], this as never);
      }
      observe() {}
      disconnect() {}
    });
    vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => frames.push(cb));
    vi.spyOn(performance, "now").mockReturnValue(0);
    render(<CountUp value="100+" />);
    act(() => enter());
    act(() => frames.shift()!(100));
    expect(screen.queryByText("100+")).toBeNull();
    act(() => frames.shift()!(5000));
    expect(screen.getByText("100+")).toBeInTheDocument();
  });
});

describe("nav highlight", () => {
  it("appears on hover and fades on leave", () => {
    render(<Nav />);
    expect(screen.queryByTestId("nav-glide")).toBeNull();
    const link = screen.getByRole("link", { name: "tickets" });
    fireEvent.mouseEnter(link);
    expect(screen.getByTestId("nav-glide")).toHaveClass("opacity-100");
    fireEvent.mouseLeave(link.parentElement!);
    expect(screen.getByTestId("nav-glide")).toHaveClass("opacity-0");
  });
});
