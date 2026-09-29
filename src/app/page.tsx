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

async function getProducts(): Promise<{ products: Product[]; error: string | null }> {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      // Revalidate every hour, or fetch fresh
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return {
        products: [],
        error: `Unable to load products at this moment (Status: ${res.status}). Please try refreshing the page.`,
      };
    }

    const data: Product[] = await res.json();

    // Sanitize products to ensure reliable data
    const sanitized = data.map((item) => ({
      id: item.id,
      title: item.title || "Untitled Product",
      price: typeof item.price === "number" ? item.price : 0,
      description: item.description || "No description available.",
      category: item.category || "General",
      image: item.image || "",
      rating: item.rating || { rate: 0, count: 0 },
    }));

    return { products: sanitized, error: null };
  } catch {
    return {
      products: [],
      error: "We could not connect to our product catalog. Please check your internet connection or try again later.",
    };
  }
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
