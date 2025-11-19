import { Header } from '@/components/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, TrendingUp, TrendingDown } from 'lucide-react';

const transactionData = [
  { id: 'TXN-001', date: '2024-11-15', description: 'Enterprise License - Acme Corp', amount: 12500, status: 'completed', type: 'income' },
  { id: 'TXN-002', date: '2024-11-14', description: 'Marketing Campaign - Q4', amount: -4500, status: 'completed', type: 'expense' },
  { id: 'TXN-003', date: '2024-11-14', description: 'Professional Services - Tech Inc', amount: 8900, status: 'completed', type: 'income' },
  { id: 'TXN-004', date: '2024-11-13', description: 'Office Supplies', amount: -890, status: 'completed', type: 'expense' },
  { id: 'TXN-005', date: '2024-11-13', description: 'Subscription Renewal - StartupXYZ', amount: 2400, status: 'pending', type: 'income' },
  { id: 'TXN-006', date: '2024-11-12', description: 'Software Licenses', amount: -3200, status: 'completed', type: 'expense' },
  { id: 'TXN-007', date: '2024-11-12', description: 'Consulting Services - Global Ltd', amount: 15600, status: 'completed', type: 'income' },
  { id: 'TXN-008', date: '2024-11-11', description: 'Cloud Infrastructure', amount: -2100, status: 'completed', type: 'expense' },
];

const summaryData = [
  { period: 'Q1 2024', revenue: 315000, expenses: 245000, profit: 70000, margin: '22.2%' },
  { period: 'Q2 2024', revenue: 342000, expenses: 258000, profit: 84000, margin: '24.6%' },
  { period: 'Q3 2024', revenue: 378000, expenses: 275000, profit: 103000, margin: '27.2%' },
  { period: 'Q4 2024', revenue: 425000, expenses: 298000, profit: 127000, margin: '29.9%' },
];

export default function ReportsPage() {
  return (
    <>
      <Header title="Reports" />
      <div className="flex-1 space-y-6 p-6">
        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Income (Nov)</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">$39,400</div>
              <p className="text-xs text-muted-foreground mt-1">From 4 transactions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses (Nov)</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">$10,690</div>
              <p className="text-xs text-muted-foreground mt-1">From 4 transactions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Profit (Nov)</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$28,710</div>
              <p className="text-xs text-green-600 mt-1">+72.9% profit margin</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest financial transactions</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactionData.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                      {transaction.type === 'income' ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quarterly Summary */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Quarterly Summary</CardTitle>
              <CardDescription>Financial performance by quarter</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Period</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">Expenses</TableHead>
                  <TableHead className="text-right">Profit</TableHead>
                  <TableHead className="text-right">Margin</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {summaryData.map((quarter) => (
                  <TableRow key={quarter.period}>
                    <TableCell className="font-medium">{quarter.period}</TableCell>
                    <TableCell className="text-right text-green-600">
                      ${quarter.revenue.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right text-red-600">
                      ${quarter.expenses.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${quarter.profit.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary">{quarter.margin}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

