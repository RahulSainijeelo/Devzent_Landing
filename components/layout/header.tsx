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
        isScrolled
          ? "bg-white/90 backdrop-blur-sm shadow-sm dark:bg-gray-900/90"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <h1
            className={cn(
              "text-xl font-bold tracking-tight transition-colors",
              isScrolled ? "text-primary" : "text-white"
            )}
          >
            S&K Enterprises
          </h1>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
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
              <Button variant="outline" className="flex items-center gap-2">
                <User size={16} />
                <span>Dashboard</span>
              </Button>
            </Link>
          ) : (
            <Link href="/sign-in">
              <Button variant="outline" className="flex items-center gap-2">
                <User size={16} />
                <span>Login</span>
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
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
            {isSignedIn ? (
              <Link
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <User size={16} />
                  <span>Dashboard</span>
                </Button>
              </Link>
            ) : (
              <Link href="/sign-in" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <User size={16} />
                  <span>Login</span>
                </Button>
              </Link>
            )}
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
        "text-sm font-medium transition-colors hover:text-primary",
        isScrolled ? "text-foreground" : "text-white hover:text-white/80"
      )}
    >
      {children}
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
      className="text-foreground text-base font-medium py-2"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
