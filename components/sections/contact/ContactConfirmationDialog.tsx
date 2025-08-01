import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import greenCheck from "@/public/lottie/green-check.json";

export function ContactConfirmationDialog({
  open,
  onOpenChange,
  requestId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  requestId: string | null;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enquiry Submitted!</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center py-4">
          <div className="w-24 h-24 mb-2">
            <Lottie animationData={greenCheck} loop={false} autoplay />
          </div>
          <p className="text-center">
            Thank you for contacting us. Your request has been received.
            <br />
            <span className="font-semibold">Request ID:</span>{" "}
            <span className="text-primary">{requestId}</span>
          </p>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Please save this Request ID for future reference.
          </p>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
