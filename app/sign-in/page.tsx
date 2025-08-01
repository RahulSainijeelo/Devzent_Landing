"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { toast } from "@/hooks/use-toast";
import CustomSignInForm from "@/components/auth/CustomSignInForm";

export default function SignInPage() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/dashboard");
    }
  }, [isLoaded, isSignedIn, router]);

  // Optionally, show nothing while checking auth state
  if (!isLoaded) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <CustomSignInForm />
    </div>
  );
}
