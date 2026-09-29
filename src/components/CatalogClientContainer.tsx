"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import Header from "./Header";
import HeroSection from "./HeroSection";
import CatalogSection from "./CatalogSection";
import styles from "./CatalogClientContainer.module.css";

interface CatalogClientContainerProps {
  initialProducts: Product[];
  categories: string[];
}

export default function CatalogClientContainer({
  initialProducts,
  categories,
}: CatalogClientContainerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <>
      <Header
        isSignedIn={isSignedIn}
        onSearch={setSearchQuery}
        onToggleSignIn={() => setIsSignedIn((prev) => !prev)}
        wishlistCount={wishlistCount}
      />
      <main className={styles.mainContent} id="main-content">
        <HeroSection />
        <CatalogSection
          categories={categories}
          initialProducts={initialProducts}
          isSignedIn={isSignedIn}
          onSignIn={() => setIsSignedIn(true)}
          onWishlistCountChange={setWishlistCount}
          searchQuery={searchQuery}
        />
      </main>
    </>
  );
}
