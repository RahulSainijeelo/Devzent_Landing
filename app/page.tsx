"use client";
import { HeroSection } from "@/components/sections/hero/HeroSection";
import { ServicesSection } from "@/components/sections/services/ServiesSection";
import { PortfolioSection } from "@/components/sections/portfolio/PortfolioSection";
import { ReviewsSection } from "@/components/sections/reviews/ReviewsSection";
import { ContactSection } from "@/components/sections/contact/ContactSection";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { useProfile } from "@/hooks/useProfile";

export default function Home() {
  const { profile, loading } = useProfile();

  if (loading || !profile) {
    // Show a full-page loader until profile is ready
    return;
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection profile={profile} loading={false} />
      <ServicesSection profile={profile} loading={false} />
      <PortfolioSection profile={profile} loading={false} />
      <ReviewsSection profile={profile} loading={false} />
      <ContactSection profile={profile} loading={false} />
      <Footer profile={profile} loading={false} />
    </main>
  );
}
