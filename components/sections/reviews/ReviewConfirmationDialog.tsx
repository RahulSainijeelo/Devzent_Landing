import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import greenCheck from "@/public/lottie/green-check.json";

export function ReviewConfirmationDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xs">
        <div className="flex flex-col items-center py-4">
          <div className="w-24 h-24 mb-2">
            <Lottie animationData={greenCheck} loop={false} autoplay />
          </div>
          <h3 className="text-lg font-semibold mb-2">Review Submitted!</h3>
          <p className="text-center text-gray-700">
            Thank you for your feedback. Your review will be visible after
            moderation.
          </p>
          <Button className="mt-4" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
