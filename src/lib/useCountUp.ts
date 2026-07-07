import { useEffect, useState, useRef } from "react";

export function useCountUp(target: number, duration: number = 1.5, delay: number = 0) {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const el = elementRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, []);

  useEffect(() => {
    if (!inView) return;

    let startTimestamp: number | null = null;
    let timer: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      // Easing function: easeOutQuad
      const easedProgress = progress * (2 - progress);
      
      setCount(Math.floor(easedProgress * target));

      if (progress < 1) {
        timer = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    const delayTimeout = setTimeout(() => {
      timer = requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(delayTimeout);
      if (timer) cancelAnimationFrame(timer);
    };
  }, [inView, target, duration, delay]);

  return { count, elementRef };
}
