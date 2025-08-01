import { Button } from "@/components/ui/button";
import { Share2, Phone, MessageSquare, Map, MessageCircle } from "lucide-react";

export default function ContactActions({
  phoneNumber,
  whatsappNumber,
  profileName,
  address,
  onShare,
}: {
  phoneNumber: string;
  whatsappNumber: string;
  profileName: string;
  address: string;
  onShare: () => void;
}) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/${whatsappNumber}?text=Hello%20${encodeURIComponent(
        profileName
      )},%20I'm%20interested%20in%20your%20services.`,
      "_blank"
    );
  };

  const handleDirections = () => {
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <Button onClick={handleCall} size="lg" className="gap-2">
        <Phone className="h-5 w-5" />
        <span>Call Now</span>
      </Button>
      <Button
        onClick={handleWhatsApp}
        variant="secondary"
        size="lg"
        className="gap-2"
      >
        <MessageCircle className="h-5 w-5" />
        <span>WhatsApp</span>
      </Button>
      <Button
        onClick={handleDirections}
        variant="outline"
        size="lg"
        className="gap-2 bg-white/10 hover:bg-white/20 text-white border-white/30"
      >
        <Map className="h-5 w-5" />
        <span>Directions</span>
      </Button>
      <Button
        asChild
        variant="outline"
        size="lg"
        className="gap-2 bg-white/10 hover:bg-white/20 text-white border-white/30"
      >
        <a href="#contact">
          <MessageSquare className="h-5 w-5" />
          <span>Enquiry</span>
        </a>
      </Button>
      <Button
        onClick={onShare}
        variant="ghost"
        size="icon"
        className="text-white hover:bg-white/20 hover:text-white"
      >
        <Share2 className="h-5 w-5" />
      </Button>
    </div>
  );
}
