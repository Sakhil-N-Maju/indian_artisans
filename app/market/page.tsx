"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Brain,
  Users,
  DollarSign,
  ShoppingBag,
  Target,
  Award,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Heart,
  Star,
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function MarketOverview() {
  const [scrolled, setScrolled] = useState(false)

  // Market trend data
  const marketTrendData = [
    { month: "Jan", sales: 45000, orders: 320, avgValue: 140 },
    { month: "Feb", sales: 52000, orders: 380, avgValue: 137 },
    { month: "Mar", sales: 48000, orders: 350, avgValue: 137 },
    { month: "Apr", sales: 61000, orders: 420, avgValue: 145 },
    { month: "May", sales: 55000, orders: 390, avgValue: 141 },
    { month: "Jun", sales: 67000, orders: 470, avgValue: 143 },
    { month: "Jul", sales: 72000, orders: 510, avgValue: 141 },
    { month: "Aug", sales: 78000, orders: 550, avgValue: 142 },
    { month: "Sep", sales: 85000, orders: 600, avgValue: 142 },
    { month: "Oct", sales: 92000, orders: 650, avgValue: 142 },
    { month: "Nov", sales: 98000, orders: 690, avgValue: 142 },
    { month: "Dec", sales: 105000, orders: 740, avgValue: 142 },
  ]

  // Category distribution
  const categoryData = [
    { name: "Textiles", value: 35, color: "#c85a3a" },
    { name: "Pottery", value: 25, color: "#d4a574" },
    { name: "Jewelry", value: 20, color: "#6b8e7f" },
    { name: "Woodcraft", value: 12, color: "#8b4513" },
    { name: "Metalwork", value: 8, color: "#556b2f" },
  ]

  // Performance metrics
  const performanceData = [
    { metric: "Conversion Rate", current: 3.2, previous: 2.8, change: 14.3 },
    { metric: "Avg Order Value", current: 142, previous: 138, change: 2.9 },
    { metric: "Customer Retention", current: 68, previous: 62, change: 9.7 },
    { metric: "Product Views", current: 45000, previous: 38000, change: 18.4 },
  ]

  // Competitor analysis
  const competitors = [
    {
      name: "Heritage Crafts India",
      marketShare: 28,
      strength: "Wide product range",
      weakness: "Higher pricing",
      rating: 4.2,
    },
    {
      name: "Artisan Hub",
      marketShare: 22,
      strength: "Strong social media",
      weakness: "Limited artisan base",
      rating: 4.0,
    },
    {
      name: "Craft Bazaar",
      marketShare: 18,
      strength: "Fast delivery",
      weakness: "Quality inconsistency",
      rating: 3.8,
    },
    {
      name: "Traditional Treasures",
      marketShare: 15,
      strength: "Premium positioning",
      weakness: "Small market reach",
      rating: 4.5,
    },
    {
      name: "Artisans of India (Us)",
      marketShare: 17,
      strength: "Voice discovery, authenticity",
      weakness: "Growing brand awareness",
      rating: 4.3,
    },
  ]

  // AI insights
  const aiInsights = [
    {
      title: "Emerging Trend: Sustainable Textiles",
      description: "30% increase in searches for eco-friendly and organic fabric products.",
      impact: "high",
      recommendation: "Expand sustainable textile collection and highlight eco-certifications.",
    },
    {
      title: "Peak Season Forecast",
      description: "Predicted 45% sales increase during Oct-Dec festival season.",
      impact: "high",
      recommendation: "Stock up popular items and prepare marketing campaigns 2 months ahead.",
    },
    {
      title: "Price Optimization Opportunity",
      description: "Pottery items show price elasticity; 5-8% price increase won't affect demand.",
      impact: "medium",
      recommendation: "Test gradual price increase on pottery category for margin improvement.",
    },
    {
      title: "Customer Behavior Pattern",
      description: "70% of voice discovery users convert within 3 visits vs 40% traditional users.",
      impact: "high",
      recommendation: "Invest more in voice-first features and promote voice shopping experience.",
    },
    {
      title: "Regional Demand Shift",
      description: "South Indian handicrafts seeing increased demand in international markets.",
      impact: "medium",
      recommendation: "Partner with more South Indian artisans and enhance international shipping.",
    },
  ]

  // Top performing products
  const topProducts = [
    { name: "Handwoven Silk Saree", views: 12500, sales: 245, revenue: 73500, growth: 23 },
    { name: "Blue Pottery Bowls", views: 9800, sales: 380, revenue: 45600, growth: 18 },
    { name: "Kundan Necklace Set", views: 8900, sales: 156, revenue: 62400, growth: 31 },
    { name: "Carved Wooden Panel", views: 7200, sales: 89, revenue: 35600, growth: 15 },
    { name: "Brass Table Lamp", views: 6800, sales: 234, revenue: 28080, growth: 12 },
  ]

  return (
    <div className="min-h-screen bg-warm-cream">
      <Navigation scrolled={scrolled} />

      {/* Header */}
      <div className="bg-gradient-to-r from-warm-terracotta to-warm-rust text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-10 h-10 text-black" />
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-black">Market Overview</h1>
          </div>
          <p className="text-lg text-white/90 max-w-3xl">
            Comprehensive analytics, AI-powered insights, and competitive intelligence for the Indian handicrafts
            market
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹10.5L</div>
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+23.5% from last month</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
              <ShoppingBag className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">740</div>
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+7.2% from last month</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Customers</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,847</div>
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+12.3% from last month</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Market Share</CardTitle>
              <Target className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">17%</div>
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+2.1% from last quarter</span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="trends">Market Trends</TabsTrigger>
            <TabsTrigger value="ai">AI Insights</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="competitors">Competitors</TabsTrigger>
            <TabsTrigger value="products">Top Products</TabsTrigger>
          </TabsList>

          {/* Market Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue & Orders Trend</CardTitle>
                <CardDescription>Monthly sales performance over the past year</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={marketTrendData}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#c85a3a" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#c85a3a" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="sales"
                      stroke="#c85a3a"
                      fillOpacity={1}
                      fill="url(#colorSales)"
                      name="Revenue (₹)"
                    />
                    <Line type="monotone" dataKey="orders" stroke="#6b8e7f" name="Orders" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Category Distribution</CardTitle>
                  <CardDescription>Sales breakdown by product category</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Average Order Value</CardTitle>
                  <CardDescription>Trend over the past 12 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={marketTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="avgValue" stroke="#d4a574" strokeWidth={2} name="AOV (₹)" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="ai" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Brain className="w-6 h-6 text-primary" />
                  <div>
                    <CardTitle>AI-Powered Market Insights</CardTitle>
                    <CardDescription>
                      Machine learning analysis of market patterns, customer behavior, and growth opportunities
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <div className="space-y-4">
              {aiInsights.map((insight, index) => (
                <Card key={index} className="border-l-4" style={{ borderLeftColor: insight.impact === "high" ? "#c85a3a" : "#d4a574" }}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">{insight.title}</CardTitle>
                          <Badge variant={insight.impact === "high" ? "default" : "secondary"}>
                            {insight.impact === "high" ? "High Impact" : "Medium Impact"}
                          </Badge>
                        </div>
                        <CardDescription className="text-base">{insight.description}</CardDescription>
                      </div>
                      <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 ml-4" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-warm-sand p-4 rounded-lg">
                      <p className="text-sm font-semibold text-warm-charcoal mb-1">Recommendation:</p>
                      <p className="text-sm text-muted-foreground">{insight.recommendation}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
                <CardDescription>Month-over-month performance comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-warm-sand rounded-lg">
                      <div className="flex-1">
                        <p className="font-semibold text-warm-charcoal">{item.metric}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <div>
                            <p className="text-2xl font-bold text-primary">
                              {item.metric.includes("Rate") || item.metric.includes("Retention")
                                ? `${item.current}%`
                                : item.metric.includes("Value")
                                ? `₹${item.current}`
                                : item.current.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">Current</p>
                          </div>
                          <div>
                            <p className="text-lg text-muted-foreground">
                              {item.metric.includes("Rate") || item.metric.includes("Retention")
                                ? `${item.previous}%`
                                : item.metric.includes("Value")
                                ? `₹${item.previous}`
                                : item.previous.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">Previous</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.change > 0 ? (
                          <>
                            <ArrowUpRight className="w-5 h-5 text-green-600" />
                            <span className="text-2xl font-bold text-green-600">+{item.change}%</span>
                          </>
                        ) : (
                          <>
                            <ArrowDownRight className="w-5 h-5 text-red-600" />
                            <span className="text-2xl font-bold text-red-600">{item.change}%</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Traffic & Engagement Metrics</CardTitle>
                <CardDescription>User behavior and engagement analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-warm-sand rounded-lg">
                    <Eye className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-3xl font-bold text-warm-charcoal">45,000</p>
                    <p className="text-sm text-muted-foreground mt-1">Page Views</p>
                    <p className="text-xs text-green-600 mt-2">+18.4% this month</p>
                  </div>
                  <div className="text-center p-6 bg-warm-sand rounded-lg">
                    <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-3xl font-bold text-warm-charcoal">8,924</p>
                    <p className="text-sm text-muted-foreground mt-1">Favorites Added</p>
                    <p className="text-xs text-green-600 mt-2">+25.6% this month</p>
                  </div>
                  <div className="text-center p-6 bg-warm-sand rounded-lg">
                    <Star className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-3xl font-bold text-warm-charcoal">4.3</p>
                    <p className="text-sm text-muted-foreground mt-1">Avg. Rating</p>
                    <p className="text-xs text-green-600 mt-2">+0.2 this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Competitors Tab */}
          <TabsContent value="competitors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Competitive Landscape</CardTitle>
                <CardDescription>Market positioning and competitor analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={competitors}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="marketShare" fill="#c85a3a" name="Market Share %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {competitors.map((competitor, index) => (
                <Card key={index} className={competitor.name.includes("Us") ? "border-2 border-primary" : ""}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">{competitor.name}</CardTitle>
                          {competitor.name.includes("Us") && <Badge variant="default">Our Platform</Badge>}
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1">
                            <Target className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              Market Share: {competitor.marketShare}%
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm text-muted-foreground">{competitor.rating}/5.0</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-xs font-semibold text-green-800 mb-1 flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          Strength
                        </p>
                        <p className="text-sm text-green-700">{competitor.strength}</p>
                      </div>
                      <div className="bg-red-50 p-3 rounded-lg">
                        <p className="text-xs font-semibold text-red-800 mb-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Weakness
                        </p>
                        <p className="text-sm text-red-700">{competitor.weakness}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Top Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Products</CardTitle>
                <CardDescription>Best-selling items by views, sales, and revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-warm-sand rounded-lg">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-warm-charcoal">{product.name}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                          <div>
                            <p className="text-xs text-muted-foreground">Views</p>
                            <p className="text-sm font-semibold">{product.views.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Sales</p>
                            <p className="text-sm font-semibold">{product.sales}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Revenue</p>
                            <p className="text-sm font-semibold">₹{product.revenue.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Growth</p>
                            <p className="text-sm font-semibold text-green-600 flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              +{product.growth}%
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Product Performance Comparison</CardTitle>
                <CardDescription>Revenue comparison across top products</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={topProducts} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#c85a3a" name="Revenue (₹)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="gap-2">
            <BarChart3 className="w-5 h-5" />
            Export Full Report
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            <Brain className="w-5 h-5" />
            Get AI Recommendations
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
