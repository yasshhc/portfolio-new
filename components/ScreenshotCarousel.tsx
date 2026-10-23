"use client";

import { useState } from "react";

type Shot = { src: string; caption: string };

// Story-style: each bar fills over 3.5s, then the next screenshot fades in. Hovering or
// touching the phone pauses the fill. With reduced motion the bars don't animate, so it
// only moves when a bar is clicked.
export default function ScreenshotCarousel({ shots }: { shots: Shot[] }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const next = () => setCurrent((current + 1) % shots.length);

  return (
    <section aria-label="Screenshots" className="phone-shots">
      <div className="mb-3 flex gap-1.5">
        {shots.map((shot, i) => (
          <button
            key={shot.src}
            type="button"
            aria-label={`Screenshot ${i + 1}`}
            aria-current={i === current}
            onClick={() => setCurrent(i)}
            className="h-1 flex-1 cursor-pointer overflow-hidden rounded-full bg-tile-alt"
          >
            <span
              key={i === current ? `on-${current}` : "off"}
              onAnimationEnd={next}
              className={`block h-full bg-green ${
                i < current ? "w-full" : i === current ? "story-fill w-0" : "w-0"
              }`}
              style={{ animationPlayState: paused ? "paused" : "running" }}
            />
          </button>
        ))}
      </div>
      <div
        className="rounded-[38px] bg-ink p-2.5"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <div className="relative aspect-[390/844] overflow-hidden rounded-[30px] bg-tile-alt">
          {shots.map((shot, i) => (
            // eslint-disable-next-line @next/next/no-img-element -- static export, no image optimiser
            <img
              key={shot.src}
              src={shot.src}
              alt={shot.caption}
              aria-hidden={i !== current}
              className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 motion-reduce:transition-none ${
                i === current ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
      <p className="mt-3 text-center text-[15px]">
        {current + 1} · {shots[current].caption}
      </p>
    </section>
  );
}
