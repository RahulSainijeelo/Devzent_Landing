import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, X, Star, Eye } from "lucide-react";
import { ExtendedReview } from "./useManageReviews";

export function ReviewTable({
  reviews,
  loading,
  onView,
  onApprove,
  onReject,
  onDelete,
}: {
  reviews: ExtendedReview[];
  loading: boolean;
  onView: (review: ExtendedReview) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (review: ExtendedReview) => void;
}) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>View</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Service Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-4 rounded-t" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-8 w-16" />
                  </TableCell>
                </TableRow>
              ))
            : reviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onView(review)}
                      aria-label="View details"
                    >
                      <Eye className="h-5 w-5" />
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium">{review.name}</TableCell>
                  <TableCell>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(review.time)}</TableCell>
                  <TableCell>
                    {review.status === "approved" && (
                      <Badge className="bg-green-500 hover:bg-green-600">
                        Approved
                      </Badge>
                    )}
                    {review.status === "pending" && (
                      <Badge className="bg-blue-500 hover:bg-blue-600">
                        Pending
                      </Badge>
                    )}
                    {review.status === "rejected" && (
                      <Badge className="bg-red-500 hover:bg-red-600">
                        Rejected
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      {review.status === "pending" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-500 border-green-500 hover:bg-green-50"
                            onClick={() => onApprove(review.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 border-red-500 hover:bg-red-50"
                            onClick={() => onReject(review.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:bg-red-50"
                        onClick={() => onDelete(review)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
