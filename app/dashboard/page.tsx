"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContactEnquiries } from "@/components/dashboard/contact/ContactEnquiries";
import { ManagePortfolio } from "@/components/dashboard/portfolio/ManagePortfolio";
import { ManageReviews } from "@/components/dashboard/reviews/ManageReviews";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardStats } from "./useDashboardStats";
import { TopLoadingBar } from "@/components/ui/TopLoadingBar";

export default function Dashboard() {
  const { stats, loading } = useDashboardStats();

  return (
    <>
      <TopLoadingBar loading={loading} />
      <div
        className="flex min-h-screen flex-col"
        style={{
          backgroundColor: "#ffffff",
          color: "#000000",
          fontFamily: "var(--font-primary)",
        }}
      >
        <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <div>
              <h1
                className="text-2xl md:text-3xl font-bold tracking-tight mb-2"
                style={{
                  color: "#000000",
                  fontFamily: "var(--font-heading)",
                }}
              >
                Dashboard
              </h1>
              <p className="text-gray-600">
                Manage your freelance business operations
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                asChild
                variant="outline"
                style={{
                  backgroundColor: "white",
                  borderColor: "#e5e7eb",
                  color: "#374151",
                  fontWeight: "500",
                }}
              >
                <Link href="/">View Website</Link>
              </Button>
            </div>
          </div>

          {/* Dashboard Overview Cards */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {/* Enquiries Card */}
            <Card
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle
                  className="text-sm font-medium"
                  style={{ color: "#374151" }}
                >
                  Contact Enquiries
                </CardTitle>
                <div
                  className="h-8 w-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#3b82f6", color: "white" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <>
                    <Skeleton className="h-8 w-16 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </>
                ) : (
                  <>
                    <div
                      className="text-3xl font-bold mb-1"
                      style={{ color: "#000000" }}
                    >
                      {stats.totalNewEnquiries || 0}
                    </div>
                    <p className="text-sm text-gray-600">
                      {stats.pendingEnquiries || 0} new this week
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Portfolio Card */}
            <Card
              style={{
                backgroundColor: "#f0fdf4",
                border: "1px solid #dcfce7",
                borderRadius: "12px",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle
                  className="text-sm font-medium"
                  style={{ color: "#374151" }}
                >
                  Portfolio Items
                </CardTitle>
                <div
                  className="h-8 w-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#10b981", color: "white" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4"
                  >
                    <rect width="18" height="14" x="3" y="3" rx="2" />
                    <path d="M3 7h18" />
                  </svg>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <>
                    <Skeleton className="h-8 w-16 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </>
                ) : (
                  <>
                    <div
                      className="text-3xl font-bold mb-1"
                      style={{ color: "#000000" }}
                    >
                      {stats.totalPortfolio || 0}
                    </div>
                    <p className="text-sm text-gray-600">Active projects</p>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Reviews Card */}
            <Card
              style={{
                backgroundColor: "#fefce8",
                border: "1px solid #fef3c7",
                borderRadius: "12px",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle
                  className="text-sm font-medium"
                  style={{ color: "#374151" }}
                >
                  Customer Reviews
                </CardTitle>
                <div
                  className="h-8 w-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#f59e0b", color: "white" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4"
                  >
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <>
                    <Skeleton className="h-8 w-16 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </>
                ) : (
                  <>
                    <div
                      className="text-3xl font-bold mb-1"
                      style={{ color: "#000000" }}
                    >
                      {stats.totalReviews || 0}
                    </div>
                    <p className="text-sm text-gray-600">
                      {stats.pendingReviews || 0} pending approval
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Content */}
          <div
            className="rounded-xl p-6"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            }}
          >
            <Tabs defaultValue="enquiries" className="space-y-6">
              {/* Responsive Tabs Bar */}
              <div className="w-full overflow-x-auto no-scrollbar md:overflow-visible">
                <TabsList
                  className="flex min-w-max md:min-w-0 p-1 rounded-lg"
                  style={{
                    backgroundColor: "#f1f5f9",
                    border: "1px solid #e2e8f0",
                    WebkitOverflowScrolling: "touch",
                  }}
                >
                  <TabsTrigger
                    value="enquiries"
                    className="px-6 py-3 text-sm font-medium rounded-md transition-all"
                    style={{
                      color: "#374151",
                      fontWeight: "500",
                    }}
                  >
                    Contact Enquiries
                  </TabsTrigger>
                  <TabsTrigger
                    value="portfolio"
                    className="px-6 py-3 text-sm font-medium rounded-md transition-all"
                    style={{
                      color: "#374151",
                      fontWeight: "500",
                    }}
                  >
                    Manage Portfolio
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="px-6 py-3 text-sm font-medium rounded-md transition-all"
                    style={{
                      color: "#374151",
                      fontWeight: "500",
                    }}
                  >
                    Manage Reviews
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="enquiries" className="space-y-4">
                <div style={{ color: "#000000" }}>
                  <ContactEnquiries />
                </div>
              </TabsContent>
              <TabsContent value="portfolio" className="space-y-4">
                <div style={{ color: "#000000" }}>
                  <ManagePortfolio />
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="space-y-4">
                <div style={{ color: "#000000" }}>
                  <ManageReviews />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
