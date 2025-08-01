import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ReviewCard } from "./ReviewCard";

export function ReviewsCarousel({
  reviews,
  loading,
}: {
  reviews: any[];
  loading: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [totalDots, setTotalDots] = useState(1);
  const cardWidth = 340;

  useEffect(() => {
    const updateDots = () => {
      if (!scrollRef.current) return;
      const container = scrollRef.current;
      if (window.innerWidth < 768) {
        const visibleCards = Math.floor(container.clientWidth / cardWidth) || 1;
        setTotalDots(Math.max(1, reviews.length - visibleCards + 1));
      } else {
        const maxScroll = container.scrollWidth - container.clientWidth;
        setTotalDots(Math.max(1, Math.ceil(maxScroll / cardWidth) + 1));
      }
    };
    updateDots();
    window.addEventListener("resize", updateDots);
    return () => window.removeEventListener("resize", updateDots);
  }, [reviews.length]);

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

  return (
    <div className="relative">
      {/* Arrow left (desktop/tablet only) */}
      <button
        type="button"
        aria-label="Scroll left"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full shadow p-1 hidden md:flex items-center justify-center"
        onClick={() => handleArrow("left")}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      {/* Arrow right (desktop/tablet only) */}
      <button
        type="button"
        aria-label="Scroll right"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full shadow p-1 hidden md:flex items-center justify-center"
        onClick={() => handleArrow("right")}
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto no-scrollbar pb-2 scroll-smooth"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="min-w-[340px] max-w-xs w-full flex-shrink-0"
              >
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-20 w-full" />
              </div>
            ))
          : reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
      </div>
      {/* Dot pagination for all screens */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalDots }).map((_, idx) => (
          <button
            key={idx}
            className={`h-2 w-2 rounded-full mx-1 transition-all ${
              scrollIndex === idx ? "bg-primary scale-125" : "bg-gray-300"
            }`}
            aria-label={`Go to review card ${idx + 1}`}
            onClick={() => scrollToCard(idx)}
            style={{ outline: "none", border: "none" }}
          />
        ))}
      </div>
    </div>
  );
}
