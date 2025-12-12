"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AnalyticsOverview } from "@/components/dashboard/analytics-overview"
import { SalesChart } from "@/components/dashboard/sales-chart"
import { PerformanceChart } from "@/components/dashboard/performance-chart"
import { RecentOrders } from "@/components/dashboard/recent-orders"
import { TopProducts } from "@/components/dashboard/top-products"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, Filter, Calendar } from "lucide-react"

export default function AnalyticsPage() {
  const [scrolled, setScrolled] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Navigation scrolled={scrolled} />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Track your performance, sales, and customer insights
            </p>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Last 30 days
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="default" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Metrics Overview */}
            <AnalyticsOverview />

            {/* Charts Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              <SalesChart />
              <PerformanceChart />
            </div>

            {/* Orders and Products */}
            <div className="grid gap-6 md:grid-cols-2">
              <RecentOrders />
              <TopProducts />
            </div>
          </TabsContent>

          {/* Sales Tab */}
          <TabsContent value="sales" className="space-y-6">
            <AnalyticsOverview />
            <SalesChart title="Detailed Sales Analysis" description="Revenue and order trends over time" />
            <RecentOrders title="All Orders" description="Complete order history and status" />
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <AnalyticsOverview />
            <div className="grid gap-6 md:grid-cols-2">
              <TopProducts />
              <PerformanceChart title="Product Performance" description="Track product views and conversions" />
            </div>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-6">
            <AnalyticsOverview />
            <div className="grid gap-6 md:grid-cols-2">
              <RecentOrders title="Recent Customer Orders" />
              <PerformanceChart title="Customer Engagement" description="Customer activity and retention metrics" />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
