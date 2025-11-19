'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle } from 'lucide-react';

export default function PowerBIPage() {
  const [isLoading, setIsLoading] = useState(true);

  // Sample Power BI public report URL
  // This is a sample Microsoft demo report
  const powerBIUrl = "https://app.powerbi.com/view?r=eyJrIjoiMWE3NTVlZjgtMjM1Yi00ZjZiLWJjZmYtOWVlMDM4OWZhODU5IiwidCI6IjcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0NyIsImMiOjV9";

  return (
    <>
      <Header title="Power BI Dashboard" />
      <div className="flex-1 flex flex-col p-6 space-y-4">
        {/* Info Card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Embedded Power BI Report</CardTitle>
                <CardDescription>Interactive business intelligence dashboard</CardDescription>
              </div>
              <Badge variant="secondary">Live Data</Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Power BI Embed */}
        <Card className="flex-1 flex flex-col">
          <CardContent className="flex-1 p-0 relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10">
                <div className="text-center space-y-2">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="text-sm text-muted-foreground">Loading Power BI Report...</p>
                </div>
              </div>
            )}
            
            <iframe
              src={powerBIUrl}
              className="w-full h-full min-h-[600px] lg:min-h-[calc(100vh-180px)] border-0 rounded-lg"
              frameBorder="0"
              allowFullScreen={true}
              onLoad={() => setIsLoading(false)}
              title="Power BI Report"
            />
          </CardContent>
        </Card>

        {/* Help Card */}
        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-blue-900">
                  This is a demo Power BI dashboard
                </p>
                <p className="text-sm text-blue-700">
                  Replace the URL in <code className="bg-blue-100 px-1 py-0.5 rounded text-xs">app/(dashboard)/powerbi/page.tsx</code> with your own Power BI embed URL to display your custom reports.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

