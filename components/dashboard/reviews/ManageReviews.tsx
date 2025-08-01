"use client";

import { useState } from "react";
import { useManageReviews, ExtendedReview } from "./useManageReviews";
import { ReviewTable } from "./ReviewTable";
import { ReviewDetailsDialog } from "./ReviewDetailsDialog";
import { DeleteReviewDialog } from "./DeleteReviewDialog";
import { Badge } from "@/components/ui/badge";

export function ManageReviews() {
  const {
    reviews,
    loading,
    handleApprove,
    handleReject,
    handleDelete,
    setReviews,
  } = useManageReviews();

  const [selectedReview, setSelectedReview] = useState<ExtendedReview | null>(
    null
  );
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Filter reviews by status
  const pendingCount = reviews.filter((r) => r.status === "pending").length;
  const approvedCount = reviews.filter((r) => r.status === "approved").length;
  const rejectedCount = reviews.filter((r) => r.status === "rejected").length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Customer Reviews</h2>
        <div className="flex items-center space-x-2">
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-700 hover:bg-blue-100"
          >
            {pendingCount} Pending
          </Badge>
          <Badge
            variant="outline"
            className="bg-green-100 text-green-700 hover:bg-green-100"
          >
            {approvedCount} Approved
          </Badge>
          <Badge
            variant="outline"
            className="bg-red-100 text-red-700 hover:bg-red-100"
          >
            {rejectedCount} Rejected
          </Badge>
        </div>
      </div>

      <ReviewTable
        reviews={reviews}
        loading={loading}
        onView={(review) => {
          setSelectedReview(review);
          setIsViewOpen(true);
        }}
        onApprove={handleApprove}
        onReject={handleReject}
        onDelete={(review) => {
          setSelectedReview(review);
          setIsDeleteOpen(true);
        }}
      />

      <ReviewDetailsDialog
        review={selectedReview}
        open={isViewOpen}
        onOpenChange={setIsViewOpen}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      <DeleteReviewDialog
        review={selectedReview}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onDelete={() => {
          if (selectedReview) {
            handleDelete(selectedReview.id);
            setIsDeleteOpen(false);
            setSelectedReview(null);
          }
        }}
      />
    </div>
  );
}
