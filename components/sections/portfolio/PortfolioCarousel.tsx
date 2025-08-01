import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function PortfolioCarousel({
  items,
  loading,
  onCardClick,
}: {
  items: any[];
  loading: boolean;
  onCardClick: (item: any) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [totalDots, setTotalDots] = useState(1);

  // Card width for scroll calculations (should match min-w-[250px] + gap)
  const cardWidth = 272; // 250px card + 22px gap

  useEffect(() => {
    const updateDots = () => {
      if (!scrollRef.current) return;
      const container = scrollRef.current;
      if (window.innerWidth < 768) {
        const visibleCards = Math.floor(container.clientWidth / cardWidth) || 1;
        setTotalDots(Math.max(1, items.length - visibleCards + 1));
      } else {
        const maxScroll = container.scrollWidth - container.clientWidth;
        setTotalDots(Math.max(1, Math.ceil(maxScroll / cardWidth) + 1));
      }
    };
    updateDots();
    window.addEventListener("resize", updateDots);
    return () => window.removeEventListener("resize", updateDots);
  }, [items.length]);

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
        className={cn(
          "gap-6",
          "flex",
          "overflow-x-auto",
          "pb-2",
          "scroll-smooth",
          "no-scrollbar"
        )}
        style={{
          WebkitOverflowScrolling: "touch",
        }}
      >
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg overflow-hidden min-w-[250px] max-w-xs w-full flex-shrink-0"
              >
                <Skeleton className="aspect-square w-full mb-2" />
                <Skeleton className="h-6 w-2/3 mb-1" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          : items.map((item) => (
              <div
                key={item.id}
                className="relative group cursor-pointer overflow-hidden rounded-lg bg-white shadow min-w-[250px] max-w-xs w-full flex-shrink-0"
                onClick={() => onCardClick(item)}
                tabIndex={0}
                aria-label={`View details for ${item.title}`}
              >
                <div className="aspect-square relative">
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1 truncate">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 capitalize">
                    {item.category}
                  </p>
                </div>
              </div>
            ))}
      </div>
      {/* Dot pagination for all screens */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalDots }).map((_, idx) => (
          <button
            key={idx}
            className={cn(
              "h-2 w-2 rounded-full mx-1 transition-all",
              scrollIndex === idx ? "bg-primary scale-125" : "bg-gray-300"
            )}
            aria-label={`Go to portfolio card ${idx + 1}`}
            onClick={() => scrollToCard(idx)}
            style={{ outline: "none", border: "none" }}
          />
        ))}
      </div>
    </div>
  );
}
