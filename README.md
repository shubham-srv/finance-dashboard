# Finance Dashboard

A modern, responsive financial dashboard built with Next.js 14, TypeScript, shadcn/ui, and Recharts. Features comprehensive analytics, reports, and Power BI integration.

## Features

- 🔐 **Mock Authentication** - Simple login system with cookie-based session management
- 📊 **Interactive Dashboard** - Real-time KPIs, revenue trends, and expense breakdowns
- 📈 **Advanced Analytics** - Detailed financial visualizations with area and bar charts
- 📋 **Reports** - Transaction tables and quarterly summaries with export functionality
- 📺 **Power BI Integration** - Embedded Power BI dashboards with iframe support
- 🎨 **Beautiful UI** - Built with shadcn/ui components and Tailwind CSS
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- 🌗 **Dark Mode Ready** - Theme support included in the design system

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **UI Components:** shadcn/ui
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Icons:** Lucide React
- **Authentication:** Cookie-based (mock implementation)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository and navigate to the project directory

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### First Time Login

The application uses mock authentication - simply enter any email and password (minimum 3 characters) to log in.

## Project Structure

```
finance-dashboard/
├── app/
│   ├── (auth)/
│   │   └── login/          # Login page
│   ├── (dashboard)/
│   │   ├── dashboard/      # Main dashboard with KPIs
│   │   ├── analytics/      # Advanced analytics page
│   │   ├── reports/        # Financial reports
│   │   ├── powerbi/        # Power BI embed page
│   │   └── layout.tsx      # Dashboard layout
│   └── layout.tsx          # Root layout
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── charts/             # Chart components
│   ├── metrics/            # Metric card components
│   ├── sidebar.tsx         # Navigation sidebar
│   └── header.tsx          # Top header
├── lib/
│   ├── auth.ts             # Authentication utilities
│   └── utils.ts            # Utility functions
└── middleware.ts           # Route protection
```

## Pages

### Dashboard (`/dashboard`)
- 4 KPI metrics (Revenue, Expenses, Profit, Growth)
- Revenue trend line chart
- Expense breakdown pie chart
- Year-over-year comparison bar chart

### Analytics (`/analytics`)
- Customer and order metrics
- Financial area chart with multiple data series
- Quarterly performance by category
- Top performing products
- Regional performance breakdown

### Reports (`/reports`)
- Recent transactions table
- Quarterly summary with financial metrics
- Export functionality (UI ready)

### Power BI (`/powerbi`)
- Embedded Power BI dashboard
- Loading states
- Responsive iframe container

## Customization

### Updating Power BI Dashboard

To use your own Power BI dashboard, update the URL in `app/(dashboard)/powerbi/page.tsx`:

```typescript
const powerBIUrl = "YOUR_POWER_BI_EMBED_URL";
```

### Modifying Data

Sample data is hardcoded in chart components for demo purposes. Replace with API calls:

- `components/charts/*.tsx` - Chart data
- `app/(dashboard)/*/page.tsx` - Page-specific data

### Styling

The project uses Tailwind CSS and shadcn/ui. Customize colors in:

- `app/globals.css` - Theme variables
- `tailwind.config.ts` - Tailwind configuration

## Build for Production

```bash
npm run build
npm start
```

## Deploy

### Option 1: Docker Deployment (AWS/Azure)

The project includes Docker support for container-based deployments:

```bash
# Build Docker image
docker build -t finance-dashboard:latest .

# Run locally
docker run -p 3000:3000 finance-dashboard:latest

# Or use Docker Compose
docker-compose up -d
```

**Supported Platforms:**
- AWS ECS (Elastic Container Service)
- AWS App Runner
- Azure Container Instances
- Azure Container Apps
- Azure App Service for Containers
- Any Kubernetes cluster

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on deploying to AWS or Azure.

### Option 2: Serverless Deployment

Deploy easily to Vercel, Netlify, or any platform that supports Next.js:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## CI/CD

GitHub Actions workflows are included for automated deployment:
- `.github/workflows/deploy-aws.yml` - Deploy to AWS ECS
- `.github/workflows/deploy-azure.yml` - Deploy to Azure Container Apps
- `.github/workflows/docker-build.yml` - Test Docker builds on PR

## License

MIT License - feel free to use this project for your own purposes.
