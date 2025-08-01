import { useEffect, useRef, useState } from "react";
import { services } from "@/lib/data";

export function useServiceCarousel(cardWidth = 272) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [totalDots, setTotalDots] = useState(1);
  const [showArrows, setShowArrows] = useState(false);

  useEffect(() => {
    const updateDots = () => {
      if (!scrollRef.current) return;
      const container = scrollRef.current;
      const isMobile = window.innerWidth < 768;
      let dots;
      if (isMobile) {
        const visibleCards = Math.floor(container.clientWidth / cardWidth) || 1;
        dots = Math.max(1, services.length - visibleCards + 1);
      } else {
        const maxScroll = container.scrollWidth - container.clientWidth;
        dots = Math.max(1, Math.ceil(maxScroll / cardWidth) + 1);
      }
      setTotalDots(dots);
    };
    updateDots();
    window.addEventListener("resize", updateDots);
    return () => window.removeEventListener("resize", updateDots);
  }, []);

  useEffect(() => {
    const checkArrows = () => {
      if (!scrollRef.current) return;
      setShowArrows(scrollRef.current.scrollWidth > scrollRef.current.clientWidth);
    };
    checkArrows();
    window.addEventListener("resize", checkArrows);
    return () => window.removeEventListener("resize", checkArrows);
  }, []);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    let idx = Math.round(scrollLeft / cardWidth);
    if (window.innerWidth < 768) {
      idx = Math.min(idx, totalDots - 1);
    }
    setScrollIndex(idx);
  };

  const scrollToCard = (idx: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      left: idx * cardWidth,
      behavior: "smooth",
    });
  };

  const handleArrow = (dir: "left" | "right") => {
    let newIdx = scrollIndex + (dir === "left" ? -1 : 1);
    if (newIdx < 0) newIdx = 0;
    if (newIdx > totalDots - 1) newIdx = totalDots - 1;
    scrollToCard(newIdx);
  };

  return {
    scrollRef,
    scrollIndex,
    totalDots,
    showArrows,
    handleScroll,
    scrollToCard,
    handleArrow,
  };
}