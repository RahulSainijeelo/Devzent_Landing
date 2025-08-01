import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Phone, MapPin, Clock } from "lucide-react";

export function ContactInfo({
  profile,
  profileLoading,
}: {
  profile: any;
  profileLoading: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>
          Reach out directly via phone or visit our location.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start">
          <Phone className="h-5 w-5 text-primary mr-3 mt-0.5 shrink-0" />
          <div>
            <Label className="font-medium mb-1 block">Phone Numbers</Label>
            {profileLoading ? (
              <p className="text-gray-700">Loading...</p>
            ) : (
              profile?.phoneNumbers?.map((num: string, i: number) => (
                <p key={i} className="text-gray-700">
                  {num}
                </p>
              ))
            )}
          </div>
        </div>
        <div className="flex items-start">
          <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5 shrink-0" />
          <div>
            <Label className="font-medium mb-1 block">Address</Label>
            <p className="text-gray-700">
              {profileLoading ? "Loading..." : profile?.address}
            </p>
            {profile?.address && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  profile.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-block mt-2"
              >
                View on Google Maps
              </a>
            )}
          </div>
        </div>
        <div className="flex items-start">
          <Clock className="h-5 w-5 text-primary mr-3 mt-0.5 shrink-0" />
          <div>
            <Label className="font-medium mb-1 block">Working Hours</Label>
            <p className="text-gray-700">
              {profileLoading ? "Loading..." : profile?.workingHours}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
