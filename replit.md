# WanderLens Travel Photo Sharing Platform

## Overview

WanderLens is a modern full-stack web application for sharing travel photography and stories. Built with React/TypeScript on the frontend and Express.js on the backend, it provides a platform for travelers to showcase their experiences through visual storytelling.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom travel-themed design system
- **Component Library**: Radix UI components with shadcn/ui styling
- **State Management**: TanStack React Query for server state
- **Routing**: React Router for client-side navigation
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Database ORM**: Drizzle ORM
- **Database**: PostgreSQL (via Neon serverless)
- **Development Server**: Custom Vite integration for SSR-like experience

### Data Storage Architecture
- **Primary Database**: PostgreSQL with Drizzle ORM
- **Schema Management**: Drizzle Kit for migrations
- **Storage Interface**: Abstracted storage layer with in-memory fallback
- **Session Storage**: PostgreSQL sessions via connect-pg-simple

## Key Components

### Frontend Components
- **TravelCard**: Interactive cards displaying travel posts with like functionality
- **PhotoGallery**: Lightbox-enabled image gallery with keyboard navigation
- **FilterBar**: Search and filter interface for posts by tags and countries
- **Header**: Navigation component with responsive design

### Backend Components
- **Storage Interface**: Abstracted CRUD operations for data persistence
- **Route Registration**: Centralized API route management
- **Error Handling**: Global error middleware with structured responses

### Shared Components
- **Schema Definitions**: Drizzle schema with Zod validation
- **Type Exports**: Shared TypeScript types between frontend and backend

## Data Flow

1. **Client Requests**: React components make API calls via TanStack Query
2. **API Processing**: Express routes handle requests and interact with storage layer
3. **Data Persistence**: Storage interface abstracts database operations
4. **Response Handling**: Structured JSON responses with error handling
5. **State Updates**: React Query manages cache invalidation and updates

## External Dependencies

### Development Tools
- **Replit Integration**: Custom Vite plugin for development environment
- **TypeScript**: Full type safety across the stack
- **ESBuild**: Production bundling for server code

### UI Libraries
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **Embla Carousel**: Image carousel functionality
- **Date-fns**: Date manipulation utilities

### Database & Infrastructure
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Type-safe database operations
- **Connect-pg-simple**: PostgreSQL session store

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds static assets to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations applied via `db:push` command

### Environment Configuration
- **Development**: Vite dev server with Express middleware integration
- **Production**: Static file serving with Express backend
- **Database**: Environment-based DATABASE_URL configuration

### Scripts
- `dev`: Development server with hot reload
- `build`: Production build for both frontend and backend
- `start`: Production server startup
- `db:push`: Database schema synchronization

## Changelog
- July 03, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.