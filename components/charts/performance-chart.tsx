'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { category: 'Product Sales', q1: 120000, q2: 135000, q3: 148000, q4: 162000 },
  { category: 'Services', q1: 85000, q2: 92000, q3: 98000, q4: 105000 },
  { category: 'Subscriptions', q1: 65000, q2: 72000, q3: 80000, q4: 88000 },
  { category: 'Licensing', q1: 45000, q2: 48000, q3: 52000, q4: 58000 },
];

export function PerformanceChart() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Quarterly Performance by Category</CardTitle>
        <CardDescription>Revenue breakdown by business segment</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="category" type="category" width={120} />
            <Tooltip
              formatter={(value) => `$${value.toLocaleString()}`}
              contentStyle={{ background: '#fff', border: '1px solid #ccc' }}
            />
            <Legend />
            <Bar dataKey="q1" fill="#3b82f6" name="Q1" />
            <Bar dataKey="q2" fill="#8b5cf6" name="Q2" />
            <Bar dataKey="q3" fill="#10b981" name="Q3" />
            <Bar dataKey="q4" fill="hsl(var(--primary))" name="Q4" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

