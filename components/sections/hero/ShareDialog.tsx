import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ShareDialog({
  open,
  onOpenChange,
  profile,
  copyToClipboard,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: any;
  copyToClipboard: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share contact information</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-3 mt-4">
          <Button
            onClick={copyToClipboard}
            variant="outline"
            className="justify-start"
          >
            Copy link to clipboard
          </Button>
          <Button asChild variant="outline" className="justify-start">
            <a
              href={
                typeof window !== "undefined"
                  ? `https://wa.me/?text=Check%20out%20${encodeURIComponent(
                      profile.name
                    )}%20-%20Tiles%20%26%20Labour%20Contractor%0A${encodeURIComponent(
                      window.location.href
                    )}`
                  : "#"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              Share on WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline" className="justify-start">
            <a
              href={
                typeof window !== "undefined"
                  ? `mailto:?subject=${encodeURIComponent(
                      profile.name
                    )}%20-%20Tiles%20%26%20Labour%20Contractor&body=Check%20out%20this%20contractor%20service:%0A${encodeURIComponent(
                      window.location.href
                    )}`
                  : "#"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              Share via Email
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
