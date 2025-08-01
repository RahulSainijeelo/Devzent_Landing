"use client";

import { useState } from "react";
import { useReviews } from "./useReviews";
import { ReviewsCarousel } from "./ReviewsCarousel";
import { ReviewFormDialog } from "./ReviewFormDialog";
import { ReviewConfirmationDialog } from "./ReviewConfirmationDialog";
import { Button } from "@/components/ui/button";

export function ReviewsSection({
  profile,
  loading,
}: {
  profile: any;
  loading: boolean;
}) {
  const { reviews } = useReviews();
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  return (
    <section id="reviews" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Customer Reviews
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Read what our clients have to say about our work and services.
          </p>
        </div>
        <ReviewsCarousel reviews={reviews} loading={loading} />
        <div className="mt-12 text-center">
          <Button onClick={() => setIsReviewDialogOpen(true)}>
            Write a Review
          </Button>
        </div>
      </div>
      <ReviewFormDialog
        open={isReviewDialogOpen}
        onOpenChange={setIsReviewDialogOpen}
        onSuccess={() => setIsConfirmationOpen(true)}
      />
      <ReviewConfirmationDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
      />
    </section>
  );
}
