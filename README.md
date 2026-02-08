# TechSavanna SaaS Platform

A pnpm monorepo containing 4 SaaS applications built with Vue 3, TypeScript, and Tailwind CSS.

## Apps

| App | Description | Port | Domain |
|-----|-------------|------|--------|
| **SavannapayPOS** | Point of Sale system | 3001 | pos.techsavanna.com |
| **WorkwiseHRM** | HR & Payroll management | 3002 | people.techsavanna.com |
| **ElimuCoreLMS** | Education ERP for schools | 3003 | elimu.techsavanna.com |
| **Savanna360ERP** | Enterprise resource planning | 3004 | erp.techsavanna.com |

## Project Structure

```
saas-fe/
├── apps/
│   ├── pos/           # SavannapayPOS
│   ├── people/        # WorkwiseHRM
│   ├── elimu/         # ElimuCoreLMS
│   └── erp/           # Savanna360ERP
├── packages/
│   ├── shared/        # Types, utils, constants
│   ├── tailwind-config/   # Shared Tailwind theme
│   ├── ui/            # Shared Vue components
│   ├── onboarding/    # Onboarding store
│   └── auth/          # Auth store & guards
├── docker/
│   ├── docker-compose.dev.yml
│   └── docker-compose.prod.yml
└── pnpm-workspace.yaml
```

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm 9+

### Installation

# Install pnpm if you haven't
npm install -g pnpm

```bash
pnpm install
```

### Development

```bash
# Run a single app
pnpm dev:pos
pnpm dev:people
pnpm dev:elimu
pnpm dev:erp

# Run all apps in parallel
pnpm dev
```

### Build

```bash
# Build all apps
pnpm build

# Build a single app
pnpm build:pos
pnpm build:people
pnpm build:elimu
pnpm build:erp
```

## Docker

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running

### Development (with hot reload)

```bash
# Using docker compose directly
docker compose -f docker/docker-compose.dev.yml up

# Or using pnpm script
pnpm docker:dev
```

### Production

```bash
# Using docker compose directly
docker compose -f docker/docker-compose.prod.yml up -d

# Or using pnpm script
pnpm docker:prod
```

### Stop containers

```bash
# Development
docker compose -f docker/docker-compose.dev.yml down

# Production
docker compose -f docker/docker-compose.prod.yml down
```

### Rebuild containers

```bash
# If you make changes to Dockerfile or dependencies
docker compose -f docker/docker-compose.dev.yml up --build
```

### Apps URLs

| App | URL |
|-----|-----|
| SavannapayPOS | http://localhost:3001 |
| WorkwiseHRM | http://localhost:3002 |
| ElimuCoreLMS | http://localhost:3003 |
| Savanna360ERP | http://localhost:3004 |

## Tech Stack

- **Framework**: Vue 3.5 with Composition API
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS v4
- **State**: Pinia
- **Routing**: Vue Router 5
- **Build**: Vite
- **Package Manager**: pnpm workspaces

## IDE Setup

- [VS Code](https://code.visualstudio.com/)
- [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension
- [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) browser extension
