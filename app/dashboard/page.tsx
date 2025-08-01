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
      <div className="flex min-h-screen flex-col">
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Dashboard
            </h1>
            <div className="flex items-center gap-2">
              <Button asChild variant="outline">
                <Link href="/">View Website</Link>
              </Button>
            </div>
          </div>

          {/* Dashboard Overview */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            {/* Enquiries Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Enquiries</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <>
                    <Skeleton className="h-8 w-16 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-bold">
                      {stats.totalNewEnquiries || 0}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {stats.pendingEnquiries || 0} new
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
            {/* Portfolio Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Portfolio Items
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="18" height="14" x="3" y="3" rx="2" />
                  <path d="M3 7h18" />
                </svg>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <>
                    <Skeleton className="h-8 w-16 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-bold">
                      {stats.totalPortfolio || 0}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
            {/* Reviews Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reviews</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <>
                    <Skeleton className="h-8 w-16 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-bold">
                      {stats.totalReviews}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {stats.pendingReviews || 0} pending
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Content */}
          <Tabs defaultValue="enquiries" className="space-y-4">
            {/* Responsive Tabs Bar */}
            <div className="w-full overflow-x-auto no-scrollbar md:overflow-visible">
              <TabsList
                className="flex min-w-max md:min-w-0"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                <TabsTrigger value="enquiries">Contact Enquiries</TabsTrigger>
                <TabsTrigger value="portfolio">Manage Portfolio</TabsTrigger>
                <TabsTrigger value="reviews">Manage Reviews</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="enquiries" className="space-y-4">
              <ContactEnquiries />
            </TabsContent>
            <TabsContent value="portfolio" className="space-y-4">
              <ManagePortfolio />
            </TabsContent>
            <TabsContent value="reviews" className="space-y-4">
              <ManageReviews />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
