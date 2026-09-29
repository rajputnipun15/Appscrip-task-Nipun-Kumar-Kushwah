# Appscrip Frontend Assignment — E-Commerce Catalog

A responsive, SEO-optimized, and server-side rendered (SSR) e-commerce catalog application built with Next.js (App Router), React, TypeScript, and Plain Native CSS (CSS Modules). The application directly consumes the FakeStoreAPI to present a curated artisan product catalog.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Assignment Purpose](#assignment-purpose)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture & Project Structure](#architecture--project-structure)
- [Server-Side Rendering (SSR) Implementation](#server-side-rendering-ssr-implementation)
- [FakeStoreAPI Integration](#fakestoreapi-integration)
- [SEO & Accessibility](#seo--accessibility)
- [Responsive Design](#responsive-design)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Server](#development-server)
  - [Production Build](#production-build)
- [Deployment (Netlify)](#deployment-netlify)
- [Performance & Best Practices](#performance--best-practices)

---

## Project Overview

This project implements an e-commerce Product Listing Page (PLP) featuring an announcement bar, header with search and responsive navigation, an introductory hero section, interactive multi-accordion filters, dynamic sorting, responsive product cards, a detailed Quick View modal, and an extensive footer.

The application is built with a server-first mindset, rendering the initial product catalog directly on the server to maximize SEO crawlability, ensure optimal performance, and prevent client-side layout shifts.

---

## Assignment Purpose

This repository fulfills the Appscrip Frontend Technical Assignment requirements, showcasing:
- Clean, semantic HTML5 and modern CSS architecture.
- Mastery of Next.js Server Components and Server-Side Rendering (SSR).
- Minimal dependency footprint with zero third-party UI/state library bloat.
- Responsive adaptability across mobile, tablet, and desktop viewports.
- SEO-first structure with schema.org structured data, meta tags, and semantic heading hierarchy.
- Graceful API handling, empty states, and accessible interactive controls.

---

## Key Features

- **Server-Side Rendered (SSR) Product Catalog**: Pre-rendered on the server via native `fetch()` for immediate First Contentful Paint (FCP).
- **Responsive Navigation & Mobile Drawer**: Off-canvas navigation with accessible toggles, search drawers, and account actions.
- **Truthful Catalog Filtering**: Product filtering backed directly by actual FakeStoreAPI categories (`men's clothing`, `women's clothing`, `jewelery`, `electronics`).
- **Dynamic Sorting**:
  - `RECOMMENDED` (Default API ordering)
  - `NEWEST FIRST` (Deterministic product ID ordering)
  - `POPULAR` (Rating count & score ordering)
  - `PRICE : LOW TO HIGH` (Price ascending)
  - `PRICE : HIGH TO LOW` (Price descending)
- **Interactive Quick View Modal**: Detail view displaying product images, ratings, pricing, and collapsible descriptions.
- **Animated Wishlist Toggle**: Micro-interactions utilizing performant CSS keyframe animations.
- **Search Capability**: Desktop expandable inline search and mobile slide-down search bar.

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (v16 App Router)
- **Library**: [React](https://react.dev/) (v19)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Native Plain CSS & CSS Modules (Strictly zero CSS frameworks, no Tailwind, no Bootstrap) with standard CSS custom properties (`--variables`), media queries, and keyframe animations
- **Mock API**: [FakeStoreAPI](https://fakestoreapi.com/)
- **Deployment**: [Netlify](https://www.netlify.com/)

---

## Architecture & Project Structure

```
├── src/
│   ├── app/
│   │   ├── globals.css     # Design tokens, variables, resets & keyframes
│   │   ├── layout.tsx      # Root layout with fonts, SEO metadata & JSON-LD
│   │   ├── page.module.css # Plain CSS for catalog error fallback state
│   │   └── page.tsx        # Server Component entry point with SSR product fetch
│   ├── components/
│   │   ├── CatalogClientContainer.tsx        # Interactive catalog state coordinator
│   │   ├── CatalogClientContainer.module.css # Main content layout styling
│   │   ├── CatalogSection.tsx                # Filter/sort logic, grid & modal view
│   │   ├── CatalogSection.module.css         # Grid layouts & empty states
│   │   ├── FilterSidebar.tsx                 # Multi-accordion sidebar & mobile drawer
│   │   ├── FilterSidebar.module.css          # Accordions, checkboxes & drawer transitions
│   │   ├── FilterSortBar.tsx                 # Product count, filter toggle & sort menu
│   │   ├── FilterSortBar.module.css          # Toolbar bar & sort dropdown styles
│   │   ├── Footer.tsx                        # Static footer with newsletter & badges
│   │   ├── Footer.module.css                 # Plain CSS multi-column footer styles
│   │   ├── Header.tsx                        # Sticky header with search & mobile nav
│   │   ├── Header.module.css                 # Navigation, drawer & search styling
│   │   ├── HeroSection.tsx                   # H1 catalog heading & introductory text
│   │   ├── HeroSection.module.css            # Typography & hero container styling
│   │   ├── ProductCard.tsx                   # Product card with image, price & actions
│   │   ├── ProductCard.module.css            # 4:5 aspect ratio, hover & wishlist keyframes
│   │   ├── QuickViewModal.tsx                # Modal view with real product specifications
│   │   ├── QuickViewModal.module.css         # Backdrop blur & entrance animations
│   │   ├── TopAnnouncementBar.tsx            # Static promotional announcement strip
│   │   └── TopAnnouncementBar.module.css     # Top bar flexbox & icon styles
│   └── types/
│       └── product.ts      # TypeScript interfaces for API and UI models
├── netlify.toml            # Netlify deployment configuration
├── next.config.ts          # Next.js configuration (remote image patterns)
├── package.json            # Minimal dependencies (Next, React, TS, ESLint)
└── tsconfig.json           # TypeScript configuration
```

---

## Server-Side Rendering (SSR) Implementation

The initial product listing demonstrates server-side rendering:

```
Browser Request
      │
      ▼
Next.js Server (app/page.tsx)
      │
      ├─► Native fetch("https://fakestoreapi.com/products")
      ├─► Parses & sanitizes product data
      ├─► Pre-renders HTML with Product Cards, H1, Meta & Schema
      ▼
Browser receives fully populated HTML (Zero client-side fetch required)
      ▼
Client hydration activates interactive controls (Drawer, Filters, Modal)
```

- Initial data fetching is never deferred to a client-side `useEffect()`.
- Client Components (`"use client"`) are strictly isolated to interactive UI elements (search toggle, modal visibility, filter state).

---

## FakeStoreAPI Integration

Product data is consumed directly from:
`GET https://fakestoreapi.com/products`

### Data Mapping:
| FakeStoreAPI Field | Catalog Usage |
| :--- | :--- |
| `id` | Unique React key and product identifier |
| `title` | Uppercase product headline with truncation |
| `price` | Formatted currency display (`$XX.XX`) |
| `description` | Full product narrative in Quick View modal |
| `category` | Categorization in filter sidebar and tags |
| `image` | Responsive image with lazy loading and error fallback |
| `rating` | Rating score and review count badge |

---

## SEO & Accessibility

- **Semantic HTML**: Proper usage of `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>`.
- **Heading Hierarchy**: Single, prominent `<h1>` tag (*"DISCOVER OUR PRODUCTS"*), followed by logical `<h2>`, `<h3>`, and `<h4>` headings.
- **Structured Data (JSON-LD)**: Schema markup for `Organization`, `WebSite`, and `CollectionPage` embedded in `<head>`.
- **Meta Tags**: OpenGraph, Twitter Cards, robots indexing, and viewport configuration.
- **Accessible Controls**:
  - Native `<button>` elements with `aria-label`, `aria-expanded`, and `aria-controls`.
  - Full keyboard accessibility (`Escape` key closes modals, drawers, and search bars).
  - Explicit image `alt` attributes and error fallbacks.

---

## Responsive Design

The catalog layout fluidly responds across screen sizes:

- **Desktop (≥ 1024px)**:
  - 4-column product grid when filter is hidden.
  - 3-column product grid with 280px collapsible filter sidebar.
  - Inline expandable search bar.
  - Hover "Quick View" overlay on product cards.
- **Tablet (768px – 1023px)**:
  - 2 to 3-column product grid with compact sidebar.
- **Mobile (< 768px)**:
  - 2-column product grid with touch-friendly spacing.
  - Slide-in off-canvas navigation drawer with backdrop.
  - Slide-out filter drawer.
  - Slide-down full-width search bar beneath header.

---

## Getting Started

### Prerequisites

Ensure you have Node.js (v18.17+ or v20+) and npm installed:
```bash
node -v
npm -v
```

### Installation

Clone the repository and install dependencies:
```bash
git clone https://github.com/your-username/Appscrip-task-Nipun-Kumar-Kushwah.git
cd Appscrip-task-Nipun-Kumar-Kushwah
npm install
```

### Development Server

Start the local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Compile and validate the production bundle:
```bash
npm run build
npm run start
```

---

## Deployment (Netlify)

This project is configured for deployment on Netlify using the Next.js runtime.

### Steps to Deploy:
1. Connect the GitHub repository `Appscrip-task-Nipun-Kumar-Kushwah` to Netlify.
2. Netlify will automatically detect the settings from `netlify.toml`:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `.next`
   - **Plugin**: `@netlify/plugin-nextjs`
3. Click **Deploy Site**.

---

## Performance & Best Practices

- **Zero Dependency Bloat**: No external CSS libraries, Axios, Redux, or heavy UI frameworks.
- **Optimized Assets**: Next.js image optimization with remote domain configuration.
- **Minimal DOM Overhead**: Clean HTML nesting without redundant container wrappers.
- **No Console Warnings**: Clean production builds with strict TypeScript validation.
