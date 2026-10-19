import { describe, expect, it } from "vitest";

const colors = {
  bg: "#F1F4EF",
  ink: "#1B2421",
  muted: "#44514C",
  green: "#2F6B4F",
  lime: "#D9F99D",
  tile: "#FFFFFF",
  tileAlt: "#E4ECE6",
  white: "#FFFFFF",
  onDarkSoft: "#C9D5CF",
  onDarkSub: "#B5C3BC",
  onDarkHint: "#9FB0A8",
  pausedText: "#7C2D12",
  pausedBar: "#FFEDD5",
};

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

describe("text contrast is at least 4.5:1", () => {
  const pairs: [string, string, string][] = [
    ["ink", "bg", "body text"],
    ["muted", "bg", "secondary text"],
    ["green", "bg", "command labels and links"],
    ["ink", "lime", "status pill, footer, TL;DR"],
    ["ink", "tile", "card text"],
    ["muted", "tile", "card secondary text"],
    ["bg", "ink", "text on dark panels"],
    ["ink", "tileAlt", "text on board columns"],
    ["muted", "tileAlt", "secondary text on board columns"],
    ["green", "tile", "links on cards"],
    ["lime", "ink", "release hashes and kind tags"],
    ["white", "green", "live timeline bar"],
    ["pausedText", "pausedBar", "paused timeline bar"],
    ["onDarkSoft", "ink", "summary on the dark next card"],
    ["onDarkSub", "ink", "jump menu sub text"],
    ["onDarkHint", "ink", "jump menu placeholder and shortcut chip"],
  ];

  for (const [fg, bgName, use] of pairs) {
    it(`${fg} on ${bgName} (${use})`, () => {
      const ratio = contrast(colors[fg as keyof typeof colors], colors[bgName as keyof typeof colors]);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });
  }
});
