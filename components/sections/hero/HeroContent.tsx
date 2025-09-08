// HeroContent.tsx
import { Skeleton } from "@/components/ui/skeleton";
import ContactActions from "./ContactActions";
import { Code, Palette, Smartphone, Bot, Globe, Blocks } from "lucide-react";

interface Profile {
  name?: string;
  bio?: string;
  experience?: string;
  phoneNumbers?: string[];
  email?: string;
}

interface HeroContentProps {
  loading: boolean;
  profile: Profile | null;
  onShare: () => void;
}

const services = [
  { icon: Blocks, name: "Blockchain", desc: "Smart Contracts & Web3" },
  { icon: Smartphone, name: "Mobile Apps", desc: "iOS & Android" },
  { icon: Globe, name: "Web Development", desc: "Full-stack Solutions" },
  { icon: Palette, name: "Design", desc: "UI/UX & Branding" },
  { icon: Bot, name: "AI & Chatbots", desc: "Intelligent Automation" },
  { icon: Code, name: "Custom Software", desc: "Tailored Solutions" },
];

export default function HeroContent({
  loading,
  profile,
  onShare,
}: HeroContentProps) {
  return (
    <div className="relative container mx-auto px-4 py-16 md:py-24 flex flex-col min-h-screen justify-center">
      <div className="max-w-6xl mx-auto">
        {/* Main Hero Content */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span
              className="px-4 py-2 rounded-full text-sm font-medium"
              style={{
                background:
                  "linear-gradient(90deg, #0ff 0%, #6f6fff 50%, #a855f7 100%)",
                color: "#fff",
              }}
            >
              ✨ Your Vision, Our Expertise
            </span>
          </div>

          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            style={{
              background:
                "linear-gradient(90deg, #0ff 0%, #6f6fff 50%, #a855f7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "#fff", // fallback
              textShadow:
                "0 2px 16px rgba(0,0,0,0.18), 0 1px 0 rgba(0,0,0,0.08)",
              fontFamily: "var(--font-heading)",
            }}
          >
            {loading ? (
              <Skeleton className="h-16 w-2/3 mx-auto mb-4" />
            ) : (
              <>
                Premium Freelance
                <br />
                <span
                  style={{
                    background:
                      "linear-gradient(90deg, #0ff 0%, #6f6fff 50%, #a855f7 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "#fff",
                    textShadow:
                      "0 2px 16px rgba(0,0,0,0.18), 0 1px 0 rgba(0,0,0,0.08)",
                  }}
                >
                  Tech Solutions
                </span>
              </>
            )}
          </h1>

          <p
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {loading ? (
              <Skeleton className="h-8 w-3/4 mx-auto mb-4" />
            ) : (
              "From blockchain innovation to AI-powered solutions. We transform ideas into digital reality with cutting-edge technology and exceptional design."
            )}
          </p>

          <ContactActions
            phoneNumber={profile?.phoneNumbers?.[0] || ""}
            email={profile?.email || ""}
            profileName={profile?.name || "Tech Solutions Team"}
            onShare={onShare}
          />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {services.map((service) => (
            <div
              key={service.name}
              className="group p-4 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                transition: "var(--transition-normal)",
              }}
            >
              <service.icon
                className="h-8 w-8 mx-auto mb-2 transition-colors"
                style={{ color: "#6f6fff" }}
              />
              <h3
                className="font-semibold text-sm text-center mb-1"
                style={{ color: "var(--color-text-primary)" }}
              >
                {service.name}
              </h3>
              <p
                className="text-xs text-center"
                style={{ color: "var(--color-text-muted)" }}
              >
                {service.desc}
              </p>
            </div>
          ))}
        </div>

        {/* About Section */}
        <div
          className="backdrop-blur-sm p-8 rounded-2xl max-w-4xl mx-auto"
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "var(--radius-xl)",
          }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2
                className="text-2xl font-semibold mb-4"
                style={{
                  color: "var(--color-text-primary)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                {loading ? (
                  <Skeleton className="h-8 w-48" />
                ) : (
                  `About ${profile?.name || "Our Team"}`
                )}
              </h2>

              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ) : (
                <div className="space-y-4">
                  <p style={{ color: "var(--color-text-secondary)" }}>
                    {profile?.bio ||
                      "We are a dedicated team of developers, designers, and blockchain specialists committed to delivering exceptional digital solutions. Our expertise spans across modern technologies to bring your vision to life."}
                  </p>

                  <div className="flex items-center gap-4 flex-wrap">
                    <div
                      className="px-3 py-1 rounded-full text-sm"
                      style={{
                        background: "var(--color-surface)",
                        color: "#6f6fff",
                      }}
                    >
                      {profile?.experience || "5+ Years Experience"}
                    </div>
                    <div
                      className="px-3 py-1 rounded-full text-sm"
                      style={{
                        background: "var(--color-surface)",
                        color: "#6f6fff",
                      }}
                    >
                      50+ Projects Delivered
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div
                className="p-4 rounded-lg"
                style={{ background: "var(--color-surface)" }}
              >
                <h3
                  className="font-semibold mb-2"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  🚀 Why Choose Us?
                </h3>
                <ul
                  className="space-y-1 text-sm"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  <li>✓ Direct communication, no middlemen</li>
                  <li>✓ Agile development process</li>
                  <li>✓ Post-launch support included</li>
                  <li>✓ Competitive pricing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
