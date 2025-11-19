import { Header } from '@/components/header';
import { MetricCard } from '@/components/metrics/metric-card';
import { FinancialAreaChart } from '@/components/charts/area-chart';
import { PerformanceChart } from '@/components/charts/performance-chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, ShoppingCart, CreditCard } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <>
      <Header title="Analytics" />
      <div className="flex-1 space-y-6 p-6">
        {/* Top Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Customer Growth"
            value="2,345"
            change="+18.2% from last month"
            changeType="positive"
            icon={Users}
          />
          <MetricCard
            title="Avg. Order Value"
            value="$342"
            change="+5.7% from last month"
            changeType="positive"
            icon={ShoppingCart}
          />
          <MetricCard
            title="Conversion Rate"
            value="3.24%"
            change="-0.5% from last month"
            changeType="negative"
            icon={TrendingUp}
          />
          <MetricCard
            title="Payment Success"
            value="98.5%"
            change="+1.2% from last month"
            changeType="positive"
            icon={CreditCard}
          />
        </div>

        {/* Main Charts */}
        <div className="grid gap-4">
          <FinancialAreaChart />
          <PerformanceChart />
        </div>

        {/* Additional Insights */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Products</CardTitle>
              <CardDescription>Best sellers this quarter</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Enterprise Plan', revenue: '$245,000', growth: '+23%' },
                  { name: 'Professional Services', revenue: '$189,000', growth: '+18%' },
                  { name: 'Premium Subscription', revenue: '$156,000', growth: '+15%' },
                  { name: 'Basic Plan', revenue: '$98,000', growth: '+12%' },
                ].map((product) => (
                  <div key={product.name} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.revenue}</p>
                    </div>
                    <Badge variant="secondary" className="text-green-600">
                      {product.growth}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regional Performance</CardTitle>
              <CardDescription>Revenue distribution by region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { region: 'North America', revenue: '$425,000', percentage: '42%' },
                  { region: 'Europe', revenue: '$315,000', percentage: '31%' },
                  { region: 'Asia Pacific', revenue: '$185,000', percentage: '18%' },
                  { region: 'Other', revenue: '$82,000', percentage: '9%' },
                ].map((region) => (
                  <div key={region.region} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{region.region}</span>
                      <span className="text-sm text-muted-foreground">{region.revenue}</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: region.percentage }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

