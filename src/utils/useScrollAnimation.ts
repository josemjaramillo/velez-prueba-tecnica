import { useEffect } from "react";

function useScrollAnimation(
  containerRef: React.RefObject<HTMLDivElement | null>,
  isRunning: boolean,
  isDraggingRef: React.RefObject<boolean>
) {
  useEffect(() => {
    const cont = containerRef?.current;
    if (!cont) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    let accumulated = 0;

    const speedPxPerStep = 1; // cuanto se mueve por "tick"
    const intervalMs = 16; // cada cuánto aplicar el movimiento (32ms ≈ 30fps)

    const animate = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      if (isRunning && !isDraggingRef.current) {
        accumulated += delta;

        while (accumulated >= intervalMs) {
          cont.scrollLeft += speedPxPerStep;

          const half = cont.scrollWidth / 2;
          if (cont.scrollLeft >= half) {
            cont.scrollLeft = cont.scrollLeft % half;
          }

          accumulated -= intervalMs;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isRunning, containerRef, isDraggingRef]);
}

export default useScrollAnimation;
