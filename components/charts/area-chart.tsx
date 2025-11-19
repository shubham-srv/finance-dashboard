'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { month: 'Jan', revenue: 45000, expenses: 38000, profit: 7000 },
  { month: 'Feb', revenue: 52000, expenses: 42000, profit: 10000 },
  { month: 'Mar', revenue: 48000, expenses: 41000, profit: 7000 },
  { month: 'Apr', revenue: 61000, expenses: 45000, profit: 16000 },
  { month: 'May', revenue: 55000, expenses: 43000, profit: 12000 },
  { month: 'Jun', revenue: 67000, expenses: 48000, profit: 19000 },
  { month: 'Jul', revenue: 72000, expenses: 52000, profit: 20000 },
  { month: 'Aug', revenue: 69000, expenses: 50000, profit: 19000 },
  { month: 'Sep', revenue: 78000, expenses: 55000, profit: 23000 },
  { month: 'Oct', revenue: 84000, expenses: 58000, profit: 26000 },
  { month: 'Nov', revenue: 81000, expenses: 57000, profit: 24000 },
  { month: 'Dec', revenue: 95000, expenses: 62000, profit: 33000 },
];

export function FinancialAreaChart() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Financial Overview</CardTitle>
        <CardDescription>Revenue, Expenses, and Profit trends over the year</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value) => `$${value.toLocaleString()}`}
              contentStyle={{ background: '#fff', border: '1px solid #ccc' }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--primary))"
              fillOpacity={1}
              fill="url(#colorRevenue)"
              name="Revenue"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#ef4444"
              fillOpacity={1}
              fill="url(#colorExpenses)"
              name="Expenses"
            />
            <Area
              type="monotone"
              dataKey="profit"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#colorProfit)"
              name="Profit"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

