// Footer.tsx
"use client";

import Link from "next/link";
import {
  Phone,
  Mail,
  Clock,
  Code,
  Palette,
  Smartphone,
  Bot,
  Globe,
  Blocks,
} from "lucide-react";

interface Profile {
  name?: string;
  bio?: string;
  phoneNumbers?: string[];
  email?: string;
  address?: string;
  workingHours?: string;
}

interface FooterProps {
  profile: Profile | null;
  loading: boolean;
}

const services = [
  { icon: Blocks, name: "Blockchain Development", href: "#blockchain" },
  { icon: Smartphone, name: "Mobile Apps", href: "#mobile-apps" },
  { icon: Globe, name: "Web Development", href: "#web-dev" },
  { icon: Palette, name: "UI/UX Design", href: "#design" },
  { icon: Bot, name: "AI & Chatbots", href: "#ai-chatbots" },
  { icon: Code, name: "Custom Software", href: "#custom-software" },
];

export function Footer({ profile, loading }: FooterProps) {
  return (
    <footer
      className="text-white relative overflow-hidden"
      style={{ background: "var(--gradient-primary)" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden z-0" aria-hidden="true">
        <div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-10"
          style={{ background: "var(--color-accent)" }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-3xl opacity-10"
          style={{ background: "var(--color-primary-600)" }}
        />
      </div>

      {/* Content container */}
      <div className="relative container mx-auto px-4 py-16 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h3
                className="text-2xl font-bold mb-2"
                style={{
                  color: "var(--color-text-primary)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                {loading
                  ? "Loading..."
                  : profile?.name || "Tech Solutions Team"}
              </h3>
              <div
                className="w-12 h-1 rounded-full mb-4"
                style={{ background: "var(--color-accent)" }}
              />
            </div>

            <p
              className="text-lg mb-6 max-w-md leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {loading
                ? "Loading bio..."
                : profile?.address ||
                  "We are a dedicated team of developers, designers, and blockchain specialists delivering premium freelance tech solutions. From innovative blockchain projects to AI-powered applications."}
            </p>

            <div className="flex flex-wrap gap-3">
              <div
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  background: "var(--color-surface)",
                  color: "var(--color-accent)",
                }}
              >
                🚀 5+ Years Experience
              </div>
              <div
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  background: "var(--color-surface)",
                  color: "var(--color-accent)",
                }}
              >
                ⭐ 50+ Projects Completed
              </div>
              <div
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  background: "var(--color-surface)",
                  color: "var(--color-accent)",
                }}
              >
                🌍 Global Clients
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div>
            <h3
              className="text-lg font-semibold mb-6"
              style={{
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-heading)",
              }}
            >
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <div
                    className="flex items-center group transition-colors"
                    style={{
                      color: "var(--color-text-secondary)",
                      transition: "var(--transition-normal)",
                    }}
                  >
                    <service.icon
                      className="mr-3 h-4 w-4 transition-colors"
                      style={{ color: "var(--color-accent)" }}
                      aria-hidden="true"
                    />
                    <span className="group-hover:text-white">
                      {service.name}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Quick Links */}
          <div>
            <h3
              className="text-lg font-semibold mb-6"
              style={{
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-heading)",
              }}
            >
              Get In Touch
            </h3>

            {/* Contact Information */}
            <ul className="space-y-4 mb-8">
              {profile?.phoneNumbers && profile.phoneNumbers.length > 0 && (
                <li className="flex items-start">
                  <Phone
                    className="mr-3 h-5 w-5 shrink-0 mt-0.5"
                    style={{ color: "var(--color-accent)" }}
                    aria-hidden="true"
                  />
                  <div>
                    {profile.phoneNumbers.map((num, i) => (
                      <p
                        key={i}
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        <a
                          href={`tel:${num}`}
                          className="hover:text-white transition-colors"
                          style={{ transition: "var(--transition-fast)" }}
                        >
                          {num}
                        </a>
                      </p>
                    ))}
                  </div>
                </li>
              )}

              {profile?.email && (
                <li className="flex items-center">
                  <Mail
                    className="mr-3 h-5 w-5 shrink-0"
                    style={{ color: "var(--color-accent)" }}
                    aria-hidden="true"
                  />
                  <a
                    href={`mailto:${profile.email}`}
                    className="hover:text-white transition-colors"
                    style={{
                      color: "var(--color-text-secondary)",
                      transition: "var(--transition-fast)",
                    }}
                  >
                    {profile.email}
                  </a>
                </li>
              )}

              <li className="flex items-center">
                <Clock
                  className="mr-3 h-5 w-5 shrink-0"
                  style={{ color: "var(--color-accent)" }}
                  aria-hidden="true"
                />
                <p style={{ color: "var(--color-text-secondary)" }}>
                  {profile?.workingHours || "24/7 Support Available"}
                </p>
              </li>
            </ul>

            {/* Quick Links */}
            <div>
              <h4
                className="text-md font-semibold mb-3"
                style={{ color: "var(--color-text-primary)" }}
              >
                Quick Links
              </h4>
              <ul className="space-y-2">
                {[
                  { name: "Portfolio", href: "#portfolio" },
                  { name: "About Us", href: "#about" },
                  { name: "Reviews", href: "#reviews" },
                  { name: "Contact", href: "#contact" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-white"
                      style={{
                        color: "var(--color-text-secondary)",
                        transition: "var(--transition-fast)",
                      }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className="mt-12 pt-8 w-full border-t text-center"
          style={{
            borderColor: "rgba(255,255,255,0.1)",
            borderTopStyle: "solid",
            borderTopWidth: "1px",
          }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              © {new Date().getFullYear()}{" "}
              {profile?.name || "Tech Solutions Team"}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
