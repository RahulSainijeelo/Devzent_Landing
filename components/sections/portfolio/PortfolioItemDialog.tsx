import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function PortfolioItemDialog({
  item,
  open,
  onOpenChange,
}: {
  item: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!item) return null;

  const navigateGalleryImage = (direction: "next" | "prev") => {
    let newIndex =
      direction === "next" ? currentImageIndex + 1 : currentImageIndex - 1;

    if (newIndex < 0) newIndex = item.images.length - 1;
    if (newIndex >= item.images.length) newIndex = 0;

    setCurrentImageIndex(newIndex);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "sm:max-w-xl max-h-[90vh] overflow-y-auto",
          "mobile-portfolio-modal"
        )}
      >
        <DialogHeader>
          <DialogTitle>{item.title}</DialogTitle>
        </DialogHeader>
        <div className="relative aspect-video mt-4">
          <Image
            src={item.images[currentImageIndex]}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            className="object-cover rounded-md"
          />
          {item.images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateGalleryImage("prev");
                }}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateGalleryImage("next");
                }}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}
        </div>
        <div className="mt-4">
          <h3 className="font-semibold text-lg">{item.title}</h3>
          <p className="text-sm text-gray-500 mt-1">
            Category: {item.category}
          </p>
          <p className="mt-4">{item.description}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
