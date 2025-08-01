import { Metadata } from "next";
import { DashboardClientWrapper } from "./DashboardClientWrapper";

export const metadata: Metadata = {
  title: "Dashboard - Kailash Chand Yogi",
  description: "Contractor dashboard for Kailash Chand Yogi's business",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardClientWrapper>{children}</DashboardClientWrapper>;
}
