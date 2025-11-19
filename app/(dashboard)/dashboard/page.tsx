import { Header } from '@/components/header';
import { MetricCard } from '@/components/metrics/metric-card';
import { RevenueChart } from '@/components/charts/revenue-chart';
import { ExpenseChart } from '@/components/charts/expense-chart';
import { ComparisonChart } from '@/components/charts/comparison-chart';
import { DollarSign, TrendingUp, TrendingDown, Percent } from 'lucide-react';

export default function DashboardPage() {
  return (
    <>
      <Header title="Dashboard" />
      <div className="flex-1 space-y-6 p-6">
        {/* KPI Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Revenue"
            value="$807,000"
            change="+12.5% from last month"
            changeType="positive"
            icon={DollarSign}
          />
          <MetricCard
            title="Total Expenses"
            value="$700,000"
            change="+4.3% from last month"
            changeType="negative"
            icon={TrendingDown}
          />
          <MetricCard
            title="Net Profit"
            value="$107,000"
            change="+8.2% from last month"
            changeType="positive"
            icon={TrendingUp}
          />
          <MetricCard
            title="Growth Rate"
            value="15.3%"
            change="+2.1% from last quarter"
            changeType="positive"
            icon={Percent}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <RevenueChart />
          <ExpenseChart />
          <ComparisonChart />
        </div>
      </div>
    </>
  );
}

