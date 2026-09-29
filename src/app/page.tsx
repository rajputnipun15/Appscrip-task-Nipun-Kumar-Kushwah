import type { Metadata } from "next";
import Link from "next/link";
import type { Product } from "@/types/product";
import TopAnnouncementBar from "@/components/TopAnnouncementBar";
import CatalogClientContainer from "@/components/CatalogClientContainer";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Discover Our Products | mettā muse",
  description:
    "Explore mettā muse's curated collection of handcrafted artisan products, premium clothing, and bespoke luxury accessories.",
};

const PRIMARY_API_URL = "https://fakestoreapi.com/products";
const FALLBACK_API_URL =
  "https://cdn.jsdelivr.net/gh/paoloricciuti/sveltekit-view-transition@014ec4aa337189fef59d222f16954f63dcc2328a/examples/list-and-details/src/lib/products.json";
const SECONDARY_FALLBACK_URL =
  "https://raw.githubusercontent.com/paoloricciuti/sveltekit-view-transition/014ec4aa337189fef59d222f16954f63dcc2328a/examples/list-and-details/src/lib/products.json";

interface RawProduct {
  id?: number;
  title?: string;
  price?: number;
  description?: string;
  category?: string;
  image?: string;
  rating?: {
    rate?: number;
    count?: number;
  };
}

async function fetchProductsFromUrl(url: string): Promise<Product[] | null> {
  try {
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; AppscripCatalog/1.0)",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`Product fetch from ${url} returned status: ${res.status}`);
      }
      return null;
    }

    const data: RawProduct[] = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    return data.map((item, idx) => ({
      id: typeof item.id === "number" ? item.id : idx + 1,
      title: item.title || "Untitled Product",
      price: typeof item.price === "number" ? item.price : 0,
      description: item.description || "No description available.",
      category: item.category || "General",
      image: item.image || "",
      rating: {
        rate: typeof item.rating?.rate === "number" ? item.rating.rate : 0,
        count: typeof item.rating?.count === "number" ? item.rating.count : 0,
      },
    }));
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`Error connecting to ${url}:`, err);
    }
    return null;
  }
}

async function getProducts(): Promise<{ products: Product[]; error: string | null }> {
  // 1. Primary: FakeStoreAPI
  let products = await fetchProductsFromUrl(PRIMARY_API_URL);

  // 2. Fallback: Legitimate API/CDN mirror of authentic catalog data (for environments where primary returns 403)
  if (!products || products.length === 0) {
    products = await fetchProductsFromUrl(FALLBACK_API_URL);
  }

  // 3. Secondary Fallback: Direct raw mirror if primary and first fallback are unreachable
  if (!products || products.length === 0) {
    products = await fetchProductsFromUrl(SECONDARY_FALLBACK_URL);
  }

  if (products && products.length > 0) {
    return { products, error: null };
  }

  return {
    products: [],
    error: "Unable to load products at this moment. Please try refreshing the page.",
  };
}

export default async function HomePage() {
  const { products, error } = await getProducts();
  const categories = Array.from(new Set(products.map((p) => p.category))).filter(Boolean);

  return (
    <>
      <TopAnnouncementBar />

      {error && products.length === 0 ? (
        <main className={styles.errorContainer}>
          <div className={styles.errorCard}>
            <svg
              className={styles.errorIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
            <h2 className={styles.errorTitle}>
              Unable to Retrieve Catalog
            </h2>
            <p className={styles.errorText}>{error}</p>
            <Link
              className={styles.reloadButton}
              href="/"
            >
              Reload Catalog
            </Link>
          </div>
        </main>
      ) : (
        <CatalogClientContainer categories={categories} initialProducts={products} />
      )}

      <Footer />
    </>
  );
}
