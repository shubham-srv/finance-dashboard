'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { month: 'Jan', thisYear: 45000, lastYear: 38000 },
  { month: 'Feb', thisYear: 52000, lastYear: 42000 },
  { month: 'Mar', thisYear: 48000, lastYear: 45000 },
  { month: 'Apr', thisYear: 61000, lastYear: 48000 },
  { month: 'May', thisYear: 55000, lastYear: 50000 },
  { month: 'Jun', thisYear: 67000, lastYear: 55000 },
];

export function ComparisonChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Year-over-Year Comparison</CardTitle>
        <CardDescription>Revenue comparison: This year vs Last year</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value) => `$${value.toLocaleString()}`}
              contentStyle={{ background: '#fff', border: '1px solid #ccc' }}
            />
            <Legend />
            <Bar dataKey="lastYear" fill="#94a3b8" name="Last Year" />
            <Bar dataKey="thisYear" fill="hsl(var(--primary))" name="This Year" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

