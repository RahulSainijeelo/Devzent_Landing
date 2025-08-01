"use client";
import useProfileAndPortfolio from "./useProfileAndPorfolio";
import ShareDialog from "./ShareDialog";
import HeroContent from "./HeroContent";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
const bgImg = {
  backgroundImage:
    "url('https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&h=1200')",
};
export function HeroSection({
  profile,
  loading,
}: {
  profile: any;
  loading: boolean;
}) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  // Share logic
  const handleShare = async () => {
    if (!profile) return;
    const shareData = {
      title: `${profile.name} - Tiles & Labour Contractor`,
      text: profile.bio,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        setIsShareOpen(true);
      }
    } catch (err) {
      toast({
        title: "Could not share content",
        description: "Please try copying the link manually.",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Website link has been copied to clipboard",
    });
    setIsShareOpen(false);
  };

  return (
    <section className="relative min-h-screen">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={bgImg}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Main Content */}
      <HeroContent loading={loading} profile={profile} onShare={handleShare} />

      {/* Share dialog for browsers that don't support navigator.share */}
      <ShareDialog
        open={isShareOpen}
        onOpenChange={setIsShareOpen}
        profile={profile}
        copyToClipboard={copyToClipboard}
      />
    </section>
  );
}
