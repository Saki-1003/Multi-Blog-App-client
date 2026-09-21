"use client";
import { useEffect, useRef } from "react";

const ScrollReveal = ({
  children,
  move = "bottom",
  delay = 200,
  duration = 1400,
  className,
}) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    async function animate() {
      if (sectionRef.current) {
        const sr = (await import("scrollreveal")).default;

        sr().reveal(sectionRef.current, {
          duration,
          delay,
          opacity: 0,
          origin: move,
          distance: "20px",
          easing: "ease-out",
          cleanup: true,
        });
      }
    }
    animate();
  }, []);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;
