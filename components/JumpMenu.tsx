"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { buildJumpItems, filterJumpItems } from "@/lib/jump";

const goTo = (href: string) => window.location.assign(href);

export default function JumpMenu({ navigate = goTo }: { navigate?: (href: string) => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const items = useMemo(() => buildJumpItems(), []);
  const results = filterJumpItems(items, query);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const isShortcut =
        (e.metaKey || e.ctrlKey) && !e.shiftKey && !e.altKey && e.key.toLowerCase() === "k";
      if (!isShortcut) return;
      e.preventDefault();
      inputRef.current?.focus();
      inputRef.current?.select();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setQuery("");
      setActive(0);
    } else if (results.length === 0) {
      return;
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((active + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((active - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      navigate(results[active].href);
    }
  }

  return (
    <div role="search" className="overflow-hidden rounded-2xl bg-ink">
      <div className="flex items-center gap-3 border-b border-[#2F3B37] px-5 py-[18px]">
        <svg
          aria-hidden="true"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#9FB0A8"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <label htmlFor="jump-input" className="sr-only">
          Jump to
        </label>
        <input
          ref={inputRef}
          id="jump-input"
          type="text"
          role="combobox"
          aria-expanded={results.length > 0}
          aria-controls="jump-list"
          aria-autocomplete="list"
          aria-activedescendant={results.length ? `jump-opt-${active}` : undefined}
          value={query}
          placeholder="Jump to a product, the resume, or contact…"
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onInputKeyDown}
          className="min-w-0 flex-1 bg-transparent focus-visible:outline-lime font-[inherit] text-[17px] text-bg placeholder:text-[#9FB0A8]"
        />
        <span
          aria-hidden="true"
          className="rounded-md border border-[#3B4A45] px-2 py-0.5 font-mono text-xs text-[#9FB0A8]"
        >
          ⌘K
        </span>
      </div>
      <div id="jump-list" role="listbox" aria-label="Jump targets" className="p-2">
        {results.length === 0 && <p className="p-3.5 text-[#B5C3BC]">No matches</p>}
        {results.map((item, i) => (
          <a
            key={item.href + item.kind}
            id={`jump-opt-${i}`}
            role="option"
            aria-selected={i === active}
            href={item.href}
            className={`flex items-center justify-between gap-4 rounded-[10px] p-3.5 text-bg no-underline focus-visible:outline-lime ${
              i === active ? "bg-[#2A3632]" : ""
            }`}
          >
            <span className="flex flex-col gap-0.5">
              <span className="font-semibold">{item.title}</span>
              <span className="text-sm text-[#B5C3BC]">{item.sub}</span>
            </span>
            <span className="font-mono text-xs text-lime">{item.kind}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
