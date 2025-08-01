"use client";
import { useSignIn } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CodeSquare } from "lucide-react"; // If you use lucide-react icons

export default function CustomSignInForm() {
  const { signIn, isLoaded } = useSignIn();
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [pendingOtp, setPendingOtp] = useState(false);
  const [pendingGoogle, setPendingGoogle] = useState(false);
  const [pendingVerification, setPendingVerification] = useState<any>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Show toast if redirected back with google_error param
  useEffect(() => {
    if (searchParams.get("google_error")) {
      toast({
        title: "Google sign in failed",
        description: "No account found for this Google user.",
        variant: "destructive",
      });
      // Remove the param from the URL for future attempts
      const params = new URLSearchParams(window.location.search);
      params.delete("google_error");
      const newUrl =
        window.location.pathname +
        (params.toString() ? "?" + params.toString() : "");
      window.history.replaceState({}, "", newUrl);
    }
  }, [searchParams]);

  // Start email OTP flow
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    setPendingOtp(true);
    try {
      const res = await signIn.create({
        identifier: email,
        strategy: "email_code",
      });
      if (res.status === "needs_first_factor") {
        setOtpSent(true);
        setPendingVerification(res);
        toast({
          title: "OTP sent",
          description: "Check your email for the code.",
        });
      }
    } catch (err: any) {
      toast({
        title: "Sign in failed",
        description: err?.errors?.[0]?.message || "Could not send OTP.",
        variant: "destructive",
      });
      router.replace("/");
    } finally {
      setPendingOtp(false);
    }
  };

  // Verify OTP
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !pendingVerification) return;
    setPendingOtp(true);
    try {
      const res = await pendingVerification.attemptFirstFactor({
        strategy: "email_code",
        code: otp,
      });
      if (res.status === "complete") {
        window.location.href = "/dashboard"; // <-- Force full reload
      } else {
        toast({
          title: "Sign in failed",
          description: "Invalid code.",
          variant: "destructive",
        });
        router.replace("/");
      }
    } catch (err: any) {
      toast({
        title: "Sign in failed",
        description: err?.errors?.[0]?.message || "Invalid code.",
        variant: "destructive",
      });
      router.replace("/");
    } finally {
      setPendingOtp(false);
    }
  };

  // Google OAuth
  const handleGoogle = async () => {
    if (!isLoaded) return;
    setPendingGoogle(true);
    console.log("Redirecting to Google sign in...");
    try {
      // Optional: force a full reload to clear Clerk's internal state
      // window.location.href = "/dashboard?google_oauth=1";
      console.log("Starting Google OAuth flow...");
      const data = await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/dashboard",
        redirectUrlComplete: "/dashboard",
        redirectUrlFailure: "/dashboard?google_error=1",
        additionalOAuthScopes: [],
        // @ts-ignore
        customOAuthParams: { prompt: "select_account" },
      } as any);
      console.log("Google OAuth flow started:", data);
    } catch (err: any) {
      console.error("Google sign in error:", err);
      toast({
        title: "Google sign in failed",
        description:
          err?.errors?.[0]?.message || "Could not sign in with Google.",
        variant: "destructive",
      });
      router.replace("/");
    } finally {
      setPendingGoogle(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded shadow ">
      <div className="flex items-center align-baseline mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/")}
          aria-label="Back to home"
          className="mr-2"
          title="Back to home"
        >
          <ArrowLeft />
        </Button>
        <h2 className="text-xl font-bold">Sign In</h2>
      </div>
      {!otpSent ? (
        <form onSubmit={handleEmailSubmit}>
          <Input
            type="email"
            placeholder="Email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={pendingOtp || pendingGoogle}
            className="mb-4"
          />
          <Button
            type="submit"
            className="w-full mb-4"
            disabled={pendingOtp || pendingGoogle}
          >
            {pendingOtp ? "Sending OTP..." : "Sign in with Email"}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit}>
          <Input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            disabled={pendingOtp || pendingGoogle}
            className="mb-4"
          />
          <Button
            type="submit"
            className="w-full mb-4"
            disabled={pendingOtp || pendingGoogle}
          >
            {pendingOtp ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>
      )}
      <div className="flex items-center my-4">
        <div className="flex-grow border-t" />
        <span className="mx-2 text-gray-400 text-xs">OR</span>
        <div className="flex-grow border-t" />
      </div>
      <Button
        type="button"
        className="w-full"
        variant="outline"
        onClick={handleGoogle}
        disabled={pendingGoogle || pendingOtp}
      >
        {pendingGoogle ? "Redirecting..." : "Sign in with Google"}
      </Button>
    </div>
  );
}
