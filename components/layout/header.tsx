"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isSignedIn } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
        isScrolled ? "backdrop-blur-md shadow-lg" : ""
      )}
      style={{
        backgroundColor: isScrolled ? "rgba(37, 55, 69, 0.95)" : "transparent",
        borderBottom: isScrolled
          ? "1px solid rgba(155, 168, 171, 0.2)" // var(--color-accent) with opacity
          : "none",
        transition: "var(--transition-normal)",
      }}
    >
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <h1
            className={cn(
              "text-xl md:text-2xl font-bold tracking-tight transition-colors"
            )}
            style={{
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-heading)",
              transition: "var(--transition-fast)",
            }}
          >
            Devzent
          </h1>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="#services" isScrolled={isScrolled}>
            Services
          </NavLink>
          <NavLink href="#portfolio" isScrolled={isScrolled}>
            Portfolio
          </NavLink>
          <NavLink href="#reviews" isScrolled={isScrolled}>
            Reviews
          </NavLink>
          <NavLink href="#contact" isScrolled={isScrolled}>
            Contact
          </NavLink>
          {isSignedIn ? (
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="flex items-center gap-2 transition-all duration-300"
                style={{
                  backgroundColor: "transparent",
                  borderColor: "var(--color-accent)",
                  color: "var(--color-text-primary)",
                  borderRadius: "var(--radius-md)",
                  padding: "0.5rem 1rem",
                  transition: "var(--transition-normal)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--color-accent)";
                  e.currentTarget.style.color = "var(--color-primary-900)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--color-text-primary)";
                }}
              >
                <User size={16} />
                <span>Dashboard</span>
              </Button>
            </Link>
          ) : (
            <Link href="/sign-in">
              <Button
                variant="outline"
                className="flex items-center gap-2 transition-all duration-300"
                style={{
                  backgroundColor: "transparent",
                  borderColor: "var(--color-accent)",
                  color: "var(--color-text-primary)",
                  borderRadius: "var(--radius-md)",
                  padding: "0.5rem 1rem",
                  transition: "var(--transition-normal)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--color-accent)";
                  e.currentTarget.style.color = "var(--color-primary-900)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--color-text-primary)";
                }}
              >
                <User size={16} />
                <span>Login</span>
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden transition-colors duration-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          style={{
            color: "var(--color-text-primary)",
            padding: "0.5rem",
            borderRadius: "var(--radius-sm)",
          }}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden shadow-xl border-t"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "rgba(155, 168, 171, 0.2)",
            backdropFilter: "blur(12px)",
          }}
        >
          <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            <MobileNavLink
              href="#services"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </MobileNavLink>
            <MobileNavLink
              href="#portfolio"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Portfolio
            </MobileNavLink>
            <MobileNavLink
              href="#reviews"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Reviews
            </MobileNavLink>
            <MobileNavLink
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </MobileNavLink>

            <div
              className="pt-4 border-t"
              style={{ borderColor: "rgba(155, 168, 171, 0.2)" }}
            >
              {isSignedIn ? (
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: "var(--color-accent)",
                      borderColor: "var(--color-accent)",
                      color: "var(--color-primary-900)",
                      borderRadius: "var(--radius-md)",
                      padding: "0.75rem 1rem",
                      fontWeight: "500",
                    }}
                  >
                    <User size={16} />
                    <span>Dashboard</span>
                  </Button>
                </Link>
              ) : (
                <Link
                  href="/sign-in"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: "var(--color-accent)",
                      borderColor: "var(--color-accent)",
                      color: "var(--color-primary-900)",
                      borderRadius: "var(--radius-md)",
                      padding: "0.75rem 1rem",
                      fontWeight: "500",
                    }}
                  >
                    <User size={16} />
                    <span>Login</span>
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function NavLink({
  href,
  children,
  isScrolled,
}: {
  href: string;
  children: React.ReactNode;
  isScrolled: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-all duration-300 relative group py-2"
      )}
      style={{
        color: "var(--color-text-primary)",
        fontFamily: "var(--font-primary)",
        transition: "var(--transition-fast)",
      }}
    >
      {children}
      <span
        className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
        style={{ backgroundColor: "var(--color-accent)" }}
      />
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      className="text-base font-medium py-3 px-2 rounded-md transition-all duration-300 hover:translate-x-1"
      style={{
        color: "var(--color-text-primary)",
        fontFamily: "var(--font-primary)",
        transition: "var(--transition-normal)",
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(155, 168, 171, 0.1)";
        e.currentTarget.style.color = "var(--color-accent)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = "var(--color-text-primary)";
      }}
    >
      {children}
    </Link>
  );
}
