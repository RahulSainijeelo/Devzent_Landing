import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { StarRating } from "@/components/ui/star-rating";
import { toast } from "@/hooks/use-toast";

const reviewSchema = z.object({
  enquiryId: z.string().min(7, { message: "Enquiry ID is required" }).max(7, {
    message: "Enquiry ID must be 7 digits",
  }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  rating: z.number().min(1, { message: "Please select a rating" }).max(5),
  comment: z
    .string()
    .min(10, { message: "Review must be at least 10 characters" }),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

export function ReviewFormDialog({
  open,
  onOpenChange,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}) {
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      enquiryId: "",
      name: "",
      email: "",
      rating: 5,
      comment: "",
    },
  });

  const onSubmit = async (data: ReviewFormValues) => {
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        toast({
          title: "Submission failed",
          description: err.error
            ? typeof err.error === "string"
              ? err.error
              : "Please check your input."
            : "Something went wrong.",
          variant: "destructive",
        });
        return;
      }

      onOpenChange(false);
      onSuccess();
      form.reset();
    } catch (err) {
      toast({
        title: "Submission failed",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md responsive-review-modal">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>Share your experience with us.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 h-full"
          >
            <div className="scrollable-form-content">
              <FormField
                control={form.control}
                name="enquiryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ENQURY ID</FormLabel>
                    <div className="flex items-center space-x-2">
                      <div className="">ENQ-</div>
                      <FormControl className="flex-1">
                        <Input placeholder="123456789" {...field} />
                      </FormControl>
                    </div>
                    <FormDescription>Please enter Enqury ID</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Your email address"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Your email won't be displayed publicly.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <StarRating
                        rating={field.value}
                        onRatingChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Review</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Share your experience with our services..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Submit Review</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
