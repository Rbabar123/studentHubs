# Student Hub Dashboard

## Overview

This is a full-stack web application called "Student Hub" that provides a personal dashboard for students with integrated productivity tools. The application features Google Maps integration, weather information, and music streaming capabilities, all behind a secure authentication system.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with CSS custom properties for theming

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful APIs with proper error handling
- **Session Management**: Express sessions with PostgreSQL storage

### Database Architecture
- **Database**: PostgreSQL with Neon serverless driver
- **ORM**: Drizzle ORM for type-safe database operations
- **Migration Strategy**: Drizzle Kit for schema migrations
- **Connection Pooling**: Built-in connection pooling via Neon

## Key Components

### Authentication System
- **Provider**: Replit Auth (OpenID Connect)
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **User Management**: Automatic user creation/updates on login
- **Security**: HTTP-only cookies with secure settings

### UI Components
- **Component Library**: Radix UI primitives with shadcn/ui styling
- **Form Handling**: React Hook Form with Zod validation
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Dark Mode**: CSS custom properties support for theme switching

### External Integrations
- **Weather API**: OpenWeatherMap API for weather data
- **Maps**: Google Maps integration (prepared for implementation)
- **Music**: Spotify web integration (opens external player)

### Pages Structure
- **Landing Page**: Unauthenticated users see login prompt
- **Dashboard**: Main hub with navigation to all features
- **Maps Page**: Google Maps integration interface
- **Weather Page**: City-based weather lookup with current conditions
- **Spotify Page**: Music streaming interface

## Data Flow

### Authentication Flow
1. User clicks "Sign In" on landing page
2. Redirected to Replit Auth provider
3. Successful auth creates/updates user in database
4. Session stored in PostgreSQL with cookie-based tracking
5. Protected routes check authentication via middleware

### API Request Flow
1. Frontend makes requests using TanStack Query
2. All requests include credentials for session validation
3. Express middleware validates session before route handling
4. Database operations use Drizzle ORM with type safety
5. Responses include proper error handling and status codes

### Data Storage
- **User Data**: Stored in PostgreSQL users table
- **Sessions**: Stored in PostgreSQL sessions table
- **External Data**: Fetched on-demand from third-party APIs

## External Dependencies

### Core Dependencies
- **Database**: Neon PostgreSQL serverless
- **Authentication**: Replit Auth OIDC provider
- **Weather Data**: OpenWeatherMap API
- **Maps**: Google Maps API (configured but not actively used)
- **Music**: Spotify Web API (external redirect)

### Development Dependencies
- **Build Tools**: Vite, esbuild for production builds
- **Type Safety**: TypeScript with strict configuration
- **Linting**: Built-in TypeScript checking
- **Development**: Hot reload via Vite dev server

## Deployment Strategy

### Build Process
1. Frontend built with Vite to `dist/public`
2. Backend bundled with esbuild to `dist/index.js`
3. Static assets served from built frontend
4. Production server runs bundled backend

### Environment Configuration
- **Development**: Uses tsx for TypeScript execution
- **Production**: Runs compiled JavaScript bundle
- **Database**: Requires DATABASE_URL environment variable
- **APIs**: Requires weather API key configuration
- **Sessions**: Requires SESSION_SECRET for security

### Hosting Requirements
- Node.js runtime environment
- PostgreSQL database access
- Environment variables for external services
- HTTPS support for secure authentication

### Replit Integration
- Configured for Replit development environment
- Includes Replit-specific build plugins and error handling
- Development banner injection for external access
- Cartographer plugin for enhanced development experience