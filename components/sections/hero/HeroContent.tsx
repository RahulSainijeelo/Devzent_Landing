import { Skeleton } from "@/components/ui/skeleton";
import ContactActions from "./ContactActions";

export default function HeroContent({
  loading,
  profile,
  onShare,
}: {
  loading: boolean;
  profile: any;
  onShare: () => void;
}) {
  return (
    <div className="relative container mx-auto px-4 py-32 md:py-40 flex flex-col min-h-screen justify-center">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          {loading ? (
            <Skeleton className="h-10 w-2/3 mb-2" />
          ) : (
            "Quality Tiles & Stonework"
          )}
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-6">
          {loading ? (
            <Skeleton className="h-8 w-2/3 mb-2" />
          ) : (
            "Professional tile and stonework contractor."
          )}
          <span className="block mt-2">Serving Navi Mumbai since 2000.</span>
        </p>
        <ContactActions
          phoneNumber={profile?.phoneNumbers?.[0] || ""}
          whatsappNumber={profile?.whatsapp || ""}
          profileName={profile?.name || ""}
          address={profile?.address || ""}
          onShare={onShare}
        />
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg max-w-2xl">
          <h2 className="text-xl font-semibold text-white mb-3">
            About{" "}
            {loading ? (
              <Skeleton className="h-6 w-32 inline-block" />
            ) : (
              profile?.name || "Kailash Chand Yogi"
            )}
          </h2>
          {loading ? (
            <Skeleton className="h-6 w-2/3 mb-2" />
          ) : (
            <p className="text-gray-200">{profile?.bio}</p>
          )}
          <p className="text-gray-200">
            {loading ? (
              <Skeleton className="h-4 w-1/3" />
            ) : (
              "Experience: " + profile?.experience || "Experience 15+ years"
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
