"use client";

import { useState, useMemo } from "react";
import type { Product, SortOption } from "@/types/product";
import FilterSortBar from "./FilterSortBar";
import FilterSidebar from "./FilterSidebar";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";
import styles from "./CatalogSection.module.css";

interface CatalogSectionProps {
  initialProducts: Product[];
  categories: string[];
  searchQuery?: string;
  onWishlistCountChange?: (count: number) => void;
}

export default function CatalogSection({
  initialProducts,
  categories,
  searchQuery = "",
  onWishlistCountChange,
}: CatalogSectionProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSort, setSelectedSort] = useState<SortOption>("RECOMMENDED");
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Toggle wishlist item
  const handleToggleWishlist = (productId: number) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      if (onWishlistCountChange) {
        onWishlistCountChange(next.size);
      }
      return next;
    });
  };

  // Open & Close Quick View Modal
  const handleOpenQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  // Filter & Sort Products (Truthful, Deterministic)
  const displayedProducts = useMemo(() => {
    let result = [...initialProducts];

    // Filter by genuine FakeStore category
    if (selectedCategory !== "all") {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search query if active
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Sort according to supported options
    switch (selectedSort) {
      case "PRICE : LOW TO HIGH":
        result.sort((a, b) => a.price - b.price);
        break;
      case "PRICE : HIGH TO LOW":
        result.sort((a, b) => b.price - a.price);
        break;
      case "POPULAR":
        result.sort((a, b) => {
          const countA = a.rating?.count ?? 0;
          const countB = b.rating?.count ?? 0;
          return countB - countA;
        });
        break;
      case "NEWEST FIRST":
        result.sort((a, b) => b.id - a.id);
        break;
      case "RECOMMENDED":
      default:
        break;
    }

    return result;
  }, [initialProducts, selectedCategory, searchQuery, selectedSort]);

  return (
    <section aria-label="Catalog Products" className={styles.catalogSection}>
      {/* Sticky Filter & Sort Bar */}
      <FilterSortBar
        isFilterOpen={isFilterOpen}
        onSelectSort={setSelectedSort}
        onToggleFilter={() => setIsFilterOpen(!isFilterOpen)}
        selectedSort={selectedSort}
        totalItems={displayedProducts.length}
      />

      {/* Main Catalog Container with Responsive Sliding Filter Sidebar */}
      <div className={styles.mainContainer}>
        {/* Filter Sidebar */}
        <FilterSidebar
          categories={categories}
          isOpen={isFilterOpen}
          onCloseMobile={() => setIsFilterOpen(false)}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          selectedCategory={selectedCategory}
        />

        {/* Product Grid Area */}
        <div className={styles.gridContainer}>
          {displayedProducts.length > 0 ? (
            <div
              className={`${styles.productGrid} ${
                isFilterOpen ? styles.gridFilterOpen : styles.gridFilterClosed
              }`}
              id="productGrid"
            >
              {displayedProducts.map((product) => (
                <ProductCard
                  isWishlisted={wishlist.has(product.id)}
                  key={product.id}
                  onOpenQuickView={handleOpenQuickView}
                  onToggleWishlist={handleToggleWishlist}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <svg
                className={styles.emptyIcon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12h8" />
              </svg>
              <h3 className={styles.emptyTitle}>
                No Products Found
              </h3>
              <p className={styles.emptyText}>
                No items match your active filter criteria. Try selecting another category or resetting filters.
              </p>
              <button
                className={styles.resetBtn}
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedSort("RECOMMENDED");
                }}
                type="button"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        isOpen={isQuickViewOpen}
        isWishlisted={quickViewProduct ? wishlist.has(quickViewProduct.id) : false}
        onClose={handleCloseQuickView}
        onToggleWishlist={handleToggleWishlist}
        product={quickViewProduct}
      />
    </section>
  );
}
