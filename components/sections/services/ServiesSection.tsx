"use client";

import { useState } from "react";
import { services, type Service } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useServiceCarousel } from "./useServiceCarousel";
import { ServiceCard } from "./ServiceCard";
import { ServiceDetailsDialog } from "./ServiceDetailsDialog";
import "./ServicesSection.css"; // Import custom styles for responsive modal
export function ServicesSection({
  profile,
  loading,
}: {
  profile: any;
  loading: boolean;
}) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const {
    scrollRef,
    scrollIndex,
    totalDots,
    showArrows,
    handleScroll,
    scrollToCard,
    handleArrow,
  } = useServiceCarousel();

  return (
    <section
  id="services"
  className="py-20"
  style={{
    background: "var(--color-background-secondary)",
    color: "var(--color-text-primary)",
  }}
>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2
  className="text-3xl md:text-4xl font-bold mb-3"
  style={{ color: "var(--color-accent)", fontFamily: "var(--font-heading)" }}
>
  My Services
</h2>
<p
  className="text-lg max-w-2xl mx-auto"
  style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-primary)" }}
>
 We craft next-generation digital experiences with cutting-edge web development, mobile applications, AI/ML innovation, blockchain solutions, and user-centric design.
 </p>
        </div>
 
        <div className="relative">
          {/* Arrow left (desktop/tablet only) */}
          {showArrows && (
            <button
              type="button"
              aria-label="Scroll left"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full shadow p-1 hidden md:flex items-center justify-center"
              onClick={() => handleArrow("left")}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}
          {/* Arrow right (desktop/tablet only) */}
          {showArrows && (
            <button
              type="button"
              aria-label="Scroll right"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full shadow p-1 hidden md:flex items-center justify-center"
              onClick={() => handleArrow("right")}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}
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
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onView={setSelectedService}
              />
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
                aria-label={`Go to service card ${idx + 1}`}
                onClick={() => scrollToCard(idx)}
                style={{ outline: "none", border: "none" }}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="#contact">
            <Button size="lg">Request a Quote</Button>
          </Link>
        </div>
      </div>

      {/* Service Details Dialog */}
      <ServiceDetailsDialog
        service={selectedService}
        open={!!selectedService}
        onOpenChange={(open) => !open && setSelectedService(null)}
      />
    </section>
  );
}
