import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Service } from "@/lib/data";

export function ServiceDetailsDialog({
  service,
  open,
  onOpenChange,
}: {
  service: Service | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!service) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md responsive-service-modal">
        <DialogHeader>
          <DialogTitle>{service.title}</DialogTitle>
          <DialogDescription>{service.description}</DialogDescription>
        </DialogHeader>
        <div className="aspect-video relative overflow-hidden rounded-md mt-4">
          <Image
            src={service.imageUrl}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="mt-6 space-y-4">
          <h4 className="font-semibold">What we offer:</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>Professional installation with attention to detail</li>
            <li>High-quality materials and finishes</li>
            <li>Free consultation and quotation</li>
            <li>Timely completion of projects</li>
            <li>Clean and efficient work process</li>
          </ul>
          <div className="pt-4">
            <Link href="#contact" onClick={() => onOpenChange(false)}>
              <Button className="w-full">Get a Quote</Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}