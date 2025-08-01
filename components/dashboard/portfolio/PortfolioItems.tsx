import React, { useState } from "react";
import type { PortfolioItem } from "@/types/PortfolioItem";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pencil, Trash2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

const PortfolioItems = ({
  portfolioItems,
  openEditDialog,
  openDeleteDialog,
  loading,
}: {
  portfolioItems: PortfolioItem[];
  openEditDialog: Function;
  openDeleteDialog: Function;
  loading: boolean;
}) => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openGallery = (images: string[], startIndex = 0) => {
    setGalleryImages(images);
    setCurrentIndex(startIndex);
    setGalleryOpen(true);
  };

  const closeGallery = () => {
    setGalleryOpen(false);
    setGalleryImages([]);
    setCurrentIndex(0);
  };

  const showPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const showNext = () => {
    setCurrentIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-lg border bg-white"
              >
                <Skeleton className="aspect-video w-full mb-4" />
                <div className="px-4">
                  <Skeleton className="h-6 w-2/3 mb-2" />
                  <Skeleton className="h-4 w-1/3 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex justify-between gap-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </div>
              </div>
            ))
          : portfolioItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div
                  className="aspect-video relative cursor-pointer"
                  onClick={() => openGallery(item.images, 0)}
                  title="View all images"
                >
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                  {item.images.length > 1 && (
                    <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                      +{item.images.length - 1} more
                    </span>
                  )}
                </div>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-2">
                    Category: {item.category}
                  </p>
                  <p className="text-sm">{item.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(item)}
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => openDeleteDialog(item)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
      </div>

      {/* Single Image Viewer Modal */}
      {galleryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative bg-white rounded-lg p-4 max-w-2xl w-full flex flex-col items-center">
            <button
              className="absolute top-4 right-4 z-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shadow w-10 h-10"
              onClick={closeGallery}
              aria-label="Close"
              type="button"
              tabIndex={0}
            >
              <X className="h-6 w-6 text-gray-700" />
            </button>
            <div
              className="relative w-full flex items-center justify-center"
              style={{ minHeight: 320 }}
            >
              {galleryImages.length > 1 && (
                <button
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow"
                  onClick={showPrev}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-7 w-7" />
                </button>
              )}
              {galleryImages[currentIndex] && (
                <div className="relative w-[400px] h-[250px] sm:w-[500px] sm:h-[320px]">
                  <Image
                    src={galleryImages[currentIndex]}
                    alt={`Gallery image ${currentIndex + 1}`}
                    fill
                    className="object-contain rounded"
                  />
                </div>
              )}
              {galleryImages.length > 1 && (
                <button
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow"
                  onClick={showNext}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-7 w-7" />
                </button>
              )}
            </div>
            <div className="mt-2 text-center text-sm text-gray-700">
              {currentIndex + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PortfolioItems;
