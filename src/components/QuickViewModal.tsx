"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import type { Product } from "@/types/product";
import styles from "./QuickViewModal.module.css";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: number) => void;
  isSignedIn?: boolean;
  onSignIn?: () => void;
}

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  isSignedIn = false,
  onSignIn,
}: QuickViewModalProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [inquireStatus, setInquireStatus] = useState<"idle" | "loading" | "done">("idle");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const handleInquireClick = () => {
    setInquireStatus("loading");
    setTimeout(() => {
      setInquireStatus("done");
      setTimeout(() => {
        setInquireStatus("idle");
      }, 1500);
    }, 700);
  };

  return (
    <div
      aria-labelledby="modal-product-title"
      aria-modal="true"
      className={styles.modalOverlay}
      data-purpose="quick-view-overlay"
      role="dialog"
    >
      {/* Blurred Backdrop */}
      <div
        aria-hidden="true"
        className={styles.backdrop}
        onClick={onClose}
      />

      {/* Modal Card */}
      <div
        className={styles.modalCard}
        id="modal-dialog-box"
      >
        {/* Close Button */}
        <button
          aria-label="Close dialog"
          className={styles.closeBtn}
          onClick={onClose}
          type="button"
        >
          <svg className={styles.closeIcon} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <line x1="18" x2="6" y1="6" y2="18" />
            <line x1="6" x2="18" y1="6" y2="18" />
          </svg>
        </button>

        {/* Two-Column Showcase */}
        <div className={styles.gridContent}>
          {/* Left Column: Product Imagery */}
          <div className={styles.imageCol}>
            <div className={styles.mainImageFrame}>
              <span className={styles.categoryBadge}>
                {product.category}
              </span>
              <Image
                alt={product.title}
                className={styles.mainImage}
                height={500}
                priority
                src={product.image}
                width={400}
              />
            </div>
          </div>

          {/* Right Column: Product Narrative & Real Details */}
          <div className={styles.detailsCol}>
            <div className={styles.headerSection}>
              {/* Category & Title */}
              <div>
                <div className={styles.categoryTagline}>
                  {product.category}
                </div>
                <h2
                  className={styles.modalTitle}
                  id="modal-product-title"
                >
                  {product.title}
                </h2>

                {/* Rating display if present */}
                {product.rating && (
                  <div className={styles.ratingRow}>
                    <span className={styles.ratingScore}>
                      ★ {product.rating.rate}
                    </span>
                    <span style={{ color: "#a3a3a3" }}>·</span>
                    <span>{product.rating.count} verified ratings</span>
                  </div>
                )}
              </div>

              {/* Real Price Display & Notice */}
              <div className={styles.pricingNoticeBox}>
                <div>
                  {isSignedIn ? (
                    <div className={styles.realPrice}>
                      ${product.price.toFixed(2)}
                    </div>
                  ) : (
                    <div className={styles.pricingNoticeText}>
                      <button
                        className={styles.pricingNoticeLink}
                        onClick={onSignIn}
                        type="button"
                      >
                        Sign in
                      </button>{" "}
                      or{" "}
                      <button
                        className={styles.pricingNoticeLink}
                        onClick={onSignIn}
                        type="button"
                      >
                        Create an account
                      </button>{" "}
                      to view exclusive pricing.
                    </div>
                  )}
                </div>
                <span className={styles.pingDot} />
              </div>

              <hr className={styles.divider} />

              {/* Product Description Narrative */}
              <div className={styles.storySection} data-purpose="product-story">
                <button
                  className={styles.storyToggleBtn}
                  onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                  type="button"
                >
                  <h4 className={styles.storyTitle}>
                    PRODUCT DESCRIPTION &amp; SPECIFICATIONS
                  </h4>
                  <svg
                    className={`${styles.storyChevron} ${
                      isDetailsOpen ? styles.storyChevronOpen : styles.storyChevronClosed
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {isDetailsOpen && (
                  <div className={styles.storyContent}>
                    <p style={{ textTransform: "capitalize" }}>
                      {product.description}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions & Guarantee */}
            <div className={styles.actionsSection}>
              <div className={styles.buttonRow}>
                <button
                  className={styles.inquireBtn}
                  disabled={inquireStatus !== "idle"}
                  onClick={handleInquireClick}
                  type="button"
                >
                  {inquireStatus === "idle" && "SIGN IN TO INQUIRE"}
                  {inquireStatus === "loading" && (
                    <span className={styles.inquireLoading}>
                      <svg className={styles.spinner} fill="none" viewBox="0 0 24 24">
                        <circle
                          style={{ opacity: 0.25 }}
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          style={{ opacity: 0.75 }}
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          fill="currentColor"
                        />
                      </svg>
                      CHECKING AVAILABILITY...
                    </span>
                  )}
                  {inquireStatus === "done" && "REQUEST RECEIVED"}
                </button>

                <button
                  aria-label={
                    isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"
                  }
                  className={`${styles.wishlistModalBtn} ${
                    isWishlisted ? styles.wishlistModalActive : ""
                  }`}
                  onClick={() => onToggleWishlist(product.id)}
                  type="button"
                >
                  <svg
                    style={{ width: "16px", height: "16px" }}
                    fill={isWishlisted ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="1.75"
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

              {/* Micro details */}
              <div className={styles.guaranteeRow}>
                <svg className={styles.checkIcon} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Complimentary global shipping &amp; bespoke packaging included</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
