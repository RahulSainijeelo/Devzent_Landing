"use client";
import Link from "next/link";
import { Phone, MapPin, Mail, Clock } from "lucide-react";

export function Footer({
  profile,
  loading,
}: {
  profile: any;
  loading: boolean;
}) {
  // Use profile and loading as needed in your footer
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              {profile?.name || "Kailash Chand Yogi"}
            </h3>
            <p className="text-gray-300 mb-4">
              {profile?.bio ||
                "Professional Tiles and Labour Contractor serving Navi Mumbai since 2021. Specializing in all kinds of Tiles, Ladi, Marble, and Kota Stone works."}
            </p>
            <p className="text-gray-300 text-sm">Est. 07/06/2021</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="mr-2 h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  {profile?.phoneNumbers?.map((num: string, i: number) => (
                    <p key={i} className="text-gray-300">
                      {num}
                    </p>
                  ))}
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
                <p className="text-gray-300">
                  {profile?.address || "Navi Mumbai – 400706"}
                </p>
              </li>
              <li className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-gray-400 shrink-0" />
                <p className="text-gray-300">
                  {profile?.workingHours || "Mon-Sat: 8:00 AM - 7:00 PM"}
                </p>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#services"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  href="#portfolio"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="#reviews"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contractor Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} S&K ENTERPRISES. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
