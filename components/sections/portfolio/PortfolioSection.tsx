"use client";

import { useState } from "react";
import { usePortfolioItems } from "./usePortfolioItems";
import { PortfolioTabs } from "./PortfolioTabs";
import { PortfolioCarousel } from "./PortfolioCarousel";
import { PortfolioItemDialog } from "./PortfolioItemDialog";
import "./PortfolioSection.css"; // Import custom styles for the portfolio section

export function PortfolioSection({
  profile,
  loading,
}: {
  profile: any;
  loading: boolean;
}) {
  const { portfolioItems, categories } = usePortfolioItems();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Filter items based on active tab
  const filteredItems =
    activeTab === "all"
      ? portfolioItems
      : portfolioItems.filter(
          (item) => item.category?.toLowerCase() === activeTab
        );

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Our Portfolio</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through our completed projects to see the quality of our
            workmanship.
          </p>
        </div>

        {/* Responsive Tabs */}
        <PortfolioTabs
          categories={categories}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Carousel */}
        <PortfolioCarousel
          items={filteredItems}
          loading={loading}
          onCardClick={(item) => setSelectedItem(item)}
        />
      </div>

      {/* Portfolio Item Detail Dialog */}
      <PortfolioItemDialog
        item={selectedItem}
        open={!!selectedItem}
        onOpenChange={(open) => {
          if (!open) setSelectedItem(null);
        }}
      />
    </section>
  );
}
