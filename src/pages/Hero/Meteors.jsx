import React, { useEffect, useRef } from "react";

const METEOR_COUNT = 2; // Fewer meteors, but always falling

function getRandomMeteorParams() {
  const edge = Math.random() < 0.75 ? "top" : "topleft";
  if (edge === "top") {
    // From anywhere along the *top* edge
    return {
      top: 0,
      left: Math.random() * window.innerWidth,
      duration: 5 + Math.random() * 4, // 5-9s, smooth
      delay: Math.random() * 2,
    };
  } else {
    // From upper left edge
    return {
      top: Math.random() * (window.innerHeight * 0.25),
      left: 0,
      duration: 5 + Math.random() * 4,
      delay: Math.random() * 2,
    };
  }
}

export default function Meteors({ number = METEOR_COUNT }) {
  const meteorRefs = useRef([]);

  // On mount, set up a relaunch for each meteor when its animation ends
  useEffect(() => {
    meteorRefs.current.forEach((ref, idx) => {
      if (!ref) return;
      function relaunch() {
        const { top, left, duration } = getRandomMeteorParams();
        ref.style.top = typeof top === "number" ? `${top}px` : top;
        ref.style.left = typeof left === "number" ? `${left}px` : left;
        ref.style.animationDuration = `${duration}s`;
        ref.style.animationDelay = "0s";
        ref.classList.remove("meteor");
        // Force reflow to restart animation
        void ref.offsetWidth;
        ref.classList.add("meteor");
      }
      ref.addEventListener("animationend", relaunch);
      // Start each with a random initial animation delay
      setTimeout(relaunch, Math.random() * 2000);
      // Cleanup on unmount
      return () => ref.removeEventListener("animationend", relaunch);
    });
  }, []);

  // Initial rendering meteors, parameters will be randomized on mount and restart
  return (
    <div className="meteor-effect-container">
      {Array.from({ length: number }).map((_, i) => (
        <span
          ref={el => meteorRefs.current[i] = el}
          key={i}
          className="meteor"
          style={{
            top: 0,
            left: `${10 + 70 * i}px`, // prevent overlap on load
            animationDuration: `${6 + Math.random() * 3}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
}
