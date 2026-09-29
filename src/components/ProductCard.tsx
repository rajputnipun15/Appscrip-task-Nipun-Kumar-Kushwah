"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/types/product";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (productId: number) => void;
  onOpenQuickView: (product: Product) => void;
  isSignedIn?: boolean;
  onSignIn?: () => void;
}

export default function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onOpenQuickView,
  isSignedIn = false,
  onSignIn,
}: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const [bouncing, setBouncing] = useState(false);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBouncing(true);
    setTimeout(() => setBouncing(false), 350);
    onToggleWishlist(product.id);
  };

  return (
    <article
      aria-label={product.title}
      className={styles.card}
      onClick={() => onOpenQuickView(product)}
    >
      {/* Product Image Frame */}
      <div className={styles.imageFrame}>
        {!imgError ? (
          <Image
            alt={product.title}
            className={styles.productImage}
            height={400}
            loading="lazy"
            onError={() => setImgError(true)}
            src={product.image}
            unoptimized
            width={320}
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <svg
              className={styles.placeholderIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <rect height="18" rx="2" width="18" x="3" y="3" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <span className={styles.placeholderText}>Image Unavailable</span>
          </div>
        )}

        {/* Desktop Quick View Overlay */}
        <button
          aria-label={`Quick view ${product.title}`}
          className={styles.quickViewBtn}
          onClick={(e) => {
            e.stopPropagation();
            onOpenQuickView(product);
          }}
          type="button"
        >
          Quick View
        </button>
      </div>

      {/* Product Information */}
      <div className={styles.cardDetails}>
        <div className={styles.cardHeaderRow}>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>
              {product.title}
            </h2>
            {isSignedIn ? (
              <p className={styles.pricingNotice}>
                <span className={styles.price}>
                  ${product.price.toFixed(2)}
                </span>
              </p>
            ) : (
              <p
                className={styles.pricingNotice}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className={styles.signInLink}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSignIn?.();
                  }}
                  type="button"
                >
                  Sign in
                </button>{" "}
                or{" "}
                <button
                  className={styles.signInLink}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSignIn?.();
                  }}
                  type="button"
                >
                  Create an account
                </button>{" "}
                to see pricing
              </p>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            aria-label={
              isWishlisted
                ? `Remove ${product.title} from wishlist`
                : `Add ${product.title} to wishlist`
            }
            className={`${styles.wishlistBtn} ${isWishlisted ? styles.wishlistActive : ""}`}
            onClick={handleWishlistClick}
            type="button"
          >
            <svg
              className={`${styles.heartIcon} ${bouncing ? styles.heartBouncing : ""}`}
              fill={isWishlisted ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
