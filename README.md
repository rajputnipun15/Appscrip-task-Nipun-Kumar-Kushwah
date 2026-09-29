# Appscrip — Product Catalog

A responsive product catalog built with Next.js, React, TypeScript, and plain CSS, based on a modern editorial-style shopping interface.

[Live Demo](YOUR_NETLIFY_URL) · [GitHub](https://github.com/rajputnipun15/Appscrip-task-Nipun-Kumar-Kushwah)

---

## Overview

This project is a responsive product catalog application developed with Next.js and React.

Product information is retrieved from the FakeStoreAPI and rendered through a server-side data-fetching flow. The interface adapts across desktop, tablet, and mobile layouts while keeping interactions lightweight and component-focused.

The implementation uses plain CSS through CSS Modules without Bootstrap, Tailwind CSS, or other UI frameworks.

---

## Features

### Catalog
- Dynamic product listing
- Product cards with images, titles, pricing states, and categories
- Product count dynamically derived from the API response
- Responsive product grid
- Product quick-view modal experience

### Filtering & Sorting
- Category-based filtering backed by genuine API categories
- Price sorting (Low to High, High to Low)
- Popularity sorting
- Recommended default ordering
- Responsive desktop filter sidebar and mobile off-canvas filter drawer

### Navigation
- Responsive desktop navigation bar
- Mobile slide-in off-canvas navigation drawer
- Desktop expandable inline search and mobile slide-down search bar
- Wishlist interaction with animated badge counter
- Responsive brand header and complete footer

---

## Responsive Experience

The interface is optimized for:
- **Desktop**
- **Tablet**
- **Mobile**

Layouts, navigation, filters, product grids, and supporting content adapt fluidly to the available viewport using native CSS media queries.

---

## Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js** | Application framework (App Router) |
| **React** | UI component architecture |
| **TypeScript** | Type-safe development |
| **CSS Modules** | Component-scoped plain CSS styling |
| **FakeStoreAPI** | Live product catalog data |

---

## Rendering

The initial product catalog is fetched on the server using Next.js.

This allows the initial product content to be available during server rendering rather than relying on a client-side request after the page loads.

Interactive functionality is kept within client components only where browser-side state or interaction is required.

---

## Styling

The project uses plain CSS with CSS Modules.

Component styles are colocated with their corresponding components:

```text
components/
├── ProductCard.tsx
├── ProductCard.module.css
├── Header.tsx
├── Header.module.css
├── FilterSidebar.tsx
└── FilterSidebar.module.css
```

Global styles, CSS variables, and keyframe animations are maintained separately in `src/app/globals.css`.

---

## Data

Product data is provided by:
- **FakeStoreAPI**: [https://fakestoreapi.com/products](https://fakestoreapi.com/products)

The application consumes the API response directly for the catalog.
No local copy of the product dataset is required for the application to operate.

---

## SEO

The application includes standard SEO considerations such as:
- Page title
- Meta description
- Semantic HTML headings (H1 and H2 hierarchy)
- Meaningful image alt text
- SEO-friendly image handling via Next.js Image
- Structured data (JSON-LD Schema for Organization, WebSite, and CollectionPage)

---

## Project Structure

```text
Appscrip-task-Nipun-Kumar-Kushwah/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.module.css
│   │   └── page.tsx
│   ├── components/
│   │   ├── CatalogClientContainer.module.css
│   │   ├── CatalogClientContainer.tsx
│   │   ├── CatalogSection.module.css
│   │   ├── CatalogSection.tsx
│   │   ├── FilterSidebar.module.css
│   │   ├── FilterSidebar.tsx
│   │   ├── FilterSortBar.module.css
│   │   ├── FilterSortBar.tsx
│   │   ├── Footer.module.css
│   │   ├── Footer.tsx
│   │   ├── Header.module.css
│   │   ├── Header.tsx
│   │   ├── HeroSection.module.css
│   │   ├── HeroSection.tsx
│   │   ├── ProductCard.module.css
│   │   ├── ProductCard.tsx
│   │   ├── QuickViewModal.module.css
│   │   ├── QuickViewModal.tsx
│   │   ├── TopAnnouncementBar.module.css
│   │   └── TopAnnouncementBar.tsx
│   └── types/
│       └── product.ts
├── .gitignore
├── eslint.config.mjs
├── netlify.toml
├── next.config.ts
├── package-lock.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js (v18.17+ or v20+)
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rajputnipun15/Appscrip-task-Nipun-Kumar-Kushwah.git
```

2. Enter the project directory:
```bash
cd Appscrip-task-Nipun-Kumar-Kushwah
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. Open the application at:
[http://localhost:3000](http://localhost:3000)

### Production

Create a production build:
```bash
npm run build
```

Run the production server:
```bash
npm start
```

---

## Deployment

The application is configured for deployment using Netlify and connected to the GitHub repository.

Every production deployment can be built directly from the repository using the project's Next.js configuration and `netlify.toml`.

- **Live Demo**: [YOUR_NETLIFY_URL](YOUR_NETLIFY_URL)
- **Repository**: [GitHub](https://github.com/rajputnipun15/Appscrip-task-Nipun-Kumar-Kushwah)

---

## Author

**Nipun Kumar Kushwah**  
Full Stack Developer  
Built with React, Next.js, TypeScript, and Plain CSS.
