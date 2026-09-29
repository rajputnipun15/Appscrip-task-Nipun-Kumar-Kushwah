"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./Header.module.css";

interface HeaderProps {
  onSearch?: (query: string) => void;
  wishlistCount?: number;
  isSignedIn?: boolean;
  onToggleSignIn?: () => void;
}

export default function Header({
  onSearch,
  wishlistCount = 0,
  isSignedIn = false,
  onToggleSignIn,
}: HeaderProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isDesktopSearchOpen, setIsDesktopSearchOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const desktopSearchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const searchWrapperRef = useRef<HTMLDivElement>(null);

  // Focus search inputs when opened
  useEffect(() => {
    if (isDesktopSearchOpen && desktopSearchInputRef.current) {
      desktopSearchInputRef.current.focus();
    }
  }, [isDesktopSearchOpen]);

  useEffect(() => {
    if (isMobileSearchOpen && mobileSearchInputRef.current) {
      mobileSearchInputRef.current.focus();
    }
  }, [isMobileSearchOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileNavOpen(false);
        setIsDesktopSearchOpen(false);
        setIsMobileSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileNavOpen]);

  // Close desktop search on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isDesktopSearchOpen &&
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(e.target as Node)
      ) {
        setIsDesktopSearchOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isDesktopSearchOpen]);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (onSearch) {
      onSearch(val);
    }
  };

  return (
    <>
      <header className={styles.header}>
        {/* Upper Brand Bar */}
        <div className={styles.brandBar}>
          {/* Left: Hamburger & Brand Emblem */}
          <div className={styles.brandLeft}>
            <button
              aria-controls="mobileNavDrawer"
              aria-expanded={isMobileNavOpen}
              aria-label={isMobileNavOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
              className={`${styles.hamburgerBtn} ${isMobileNavOpen ? styles.hamburgerActive : ""}`}
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              type="button"
            >
              <span className={styles.hamLine} />
              <span className={styles.hamLine} />
              <span className={styles.hamLine} />
            </button>

            <Link
              aria-label="mettā muse Home"
              className={styles.brandEmblemLink}
              href="/"
            >
              <svg
                className={styles.brandEmblemSvg}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                viewBox="0 0 40 40"
              >
                <rect className="opacity-10" height="30" rx="4" width="30" x="5" y="5" />
                <circle cx="20" cy="12" r="7" />
                <circle cx="20" cy="28" r="7" />
                <circle cx="12" cy="20" r="7" />
                <circle cx="28" cy="20" r="7" />
                <circle cx="20" cy="20" fill="currentColor" r="2.5" />
              </svg>
            </Link>
          </div>

          {/* Center: Brand Title */}
          <div className={styles.brandCenter}>
            <Link className={styles.brandWordmark} href="/">
              LOGO
            </Link>
          </div>

          {/* Right: Actions & Localization */}
          <div className={styles.brandRight}>
            <div className={styles.searchWrapper} ref={searchWrapperRef}>
              <button
                aria-label="Open Search"
                className={styles.actionIconBtn}
                onClick={() => {
                  if (typeof window !== "undefined" && window.innerWidth < 768) {
                    setIsMobileSearchOpen(!isMobileSearchOpen);
                  } else {
                    setIsDesktopSearchOpen(!isDesktopSearchOpen);
                  }
                }}
                type="button"
              >
                <svg className={styles.actionIconSvg} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Desktop inline search */}
              <div
                className={`${styles.desktopSearchContainer} ${
                  isDesktopSearchOpen ? styles.desktopSearchOpen : styles.desktopSearchClosed
                }`}
              >
                <div className={styles.desktopSearchInner}>
                  <svg
                    style={{ width: "14px", height: "14px", color: "#a3a3a3", marginRight: "6px", flexShrink: 0 }}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <input
                    aria-label="Search catalog"
                    className={styles.desktopSearchInput}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder="Search products, categories..."
                    ref={desktopSearchInputRef}
                    type="text"
                    value={searchQuery}
                  />
                  {searchQuery && (
                    <button
                      aria-label="Clear search"
                      onClick={() => handleSearchChange("")}
                      style={{ padding: "2px", color: "#a3a3a3", cursor: "pointer", marginLeft: "4px" }}
                      type="button"
                    >
                      <svg style={{ width: "14px", height: "14px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Wishlist */}
            <button
              aria-label={`Wishlist (${wishlistCount} items)`}
              className={styles.actionIconBtn}
              type="button"
            >
              <svg className={styles.actionIconSvg} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {wishlistCount > 0 && (
                <span className={styles.wishlistBadge}>
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag */}
            <button aria-label="Shopping Bag" className={styles.actionIconBtn} type="button">
              <svg className={styles.actionIconSvg} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* User Account */}
            <button
              aria-label={isSignedIn ? "Sign Out" : "Sign In"}
              className={`${styles.actionIconBtn} ${styles.userAccountBtn}`}
              onClick={onToggleSignIn}
              title={isSignedIn ? "Signed In (Click to Sign Out)" : "Click to Sign In"}
              type="button"
            >
              <svg className={styles.actionIconSvg} fill={isSignedIn ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Language Selector */}
            <div className={styles.langSelector}>
              <button aria-label="Select language" className={styles.langBtn} type="button">
                <span>ENG</span>
                <svg className={styles.langChevron} fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-Down Search */}
        <div
          className={`${styles.mobileSearchDrawer} ${
            isMobileSearchOpen ? styles.mobileSearchDrawerOpen : styles.mobileSearchDrawerClosed
          }`}
        >
          <div className={styles.mobileSearchInner}>
            <svg
              style={{ width: "16px", height: "16px", color: "#737373", flexShrink: 0 }}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              aria-label="Search catalog mobile"
              className={styles.mobileSearchInput}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search products, categories..."
              ref={mobileSearchInputRef}
              type="text"
              value={searchQuery}
            />
            {searchQuery && (
              <button
                aria-label="Clear search"
                onClick={() => handleSearchChange("")}
                style={{ padding: "4px", color: "#737373", cursor: "pointer" }}
                type="button"
              >
                <svg style={{ width: "16px", height: "16px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
            <button
              aria-label="Close search"
              className={styles.mobileSearchCancel}
              onClick={() => setIsMobileSearchOpen(false)}
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Centered Category Navigation (Desktop) */}
        <nav aria-label="Primary Navigation" className={styles.categoryNav}>
          <ul className={styles.navList}>
            <li>
              <Link className={styles.navLink} href="/">
                SHOP
              </Link>
            </li>
            <li>
              <a className={styles.navLink} href="#skills">
                SKILLS
              </a>
            </li>
            <li>
              <a className={styles.navLink} href="#stories">
                STORIES
              </a>
            </li>
            <li>
              <a className={styles.navLink} href="#about">
                ABOUT
              </a>
            </li>
            <li>
              <a className={styles.navLink} href="#contact">
                CONTACT US
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Mobile Drawer Backdrop */}
      <div
        aria-hidden="true"
        className={`${styles.drawerBackdrop} ${
          isMobileNavOpen ? styles.drawerBackdropOpen : styles.drawerBackdropClosed
        }`}
        onClick={() => setIsMobileNavOpen(false)}
      />

      {/* Mobile Drawer */}
      <aside
        aria-label="Mobile Navigation Menu"
        className={`${styles.mobileDrawer} ${isMobileNavOpen ? styles.mobileDrawerOpen : ""}`}
        id="mobileNavDrawer"
      >
        <div>
          {/* Drawer Header */}
          <div className={styles.drawerHeader}>
            <div className={styles.drawerLogo}>
              <svg style={{ width: "24px", height: "24px", color: "var(--color-black)" }} fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 40 40">
                <rect className="opacity-10" height="30" rx="4" width="30" x="5" y="5" />
                <circle cx="20" cy="12" r="7" />
                <circle cx="20" cy="28" r="7" />
                <circle cx="12" cy="20" r="7" />
                <circle cx="28" cy="20" r="7" />
                <circle cx="20" cy="20" fill="currentColor" r="2.5" />
              </svg>
              <span className={styles.drawerWordmark}>LOGO</span>
            </div>
            <button
              aria-label="Close menu"
              className={styles.drawerCloseBtn}
              onClick={() => setIsMobileNavOpen(false)}
              type="button"
            >
              <svg style={{ width: "20px", height: "20px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Main Navigation Links */}
          <nav className={styles.drawerNav}>
            <ul className={styles.drawerNavList}>
              <li>
                <Link className={styles.drawerNavLink} href="/" onClick={() => setIsMobileNavOpen(false)}>
                  SHOP
                </Link>
              </li>
              <li>
                <a className={styles.drawerNavLink} href="#skills" onClick={() => setIsMobileNavOpen(false)}>
                  SKILLS
                </a>
              </li>
              <li>
                <a className={styles.drawerNavLink} href="#stories" onClick={() => setIsMobileNavOpen(false)}>
                  STORIES
                </a>
              </li>
              <li>
                <a className={styles.drawerNavLink} href="#about" onClick={() => setIsMobileNavOpen(false)}>
                  ABOUT
                </a>
              </li>
              <li>
                <a className={styles.drawerNavLink} href="#contact" onClick={() => setIsMobileNavOpen(false)}>
                  CONTACT US
                </a>
              </li>
            </ul>
          </nav>

          {/* Secondary Utilities */}
          <div className={styles.drawerUtilities}>
            <button
              className={styles.drawerUtilityLink}
              onClick={() => {
                onToggleSignIn?.();
                setIsMobileNavOpen(false);
              }}
              type="button"
            >
              <svg style={{ width: "16px", height: "16px" }} fill={isSignedIn ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{isSignedIn ? "Sign Out" : "Account / Sign In"}</span>
            </button>
            <a className={styles.drawerUtilityLink} href="#wishlist" onClick={() => setIsMobileNavOpen(false)}>
              <svg style={{ width: "16px", height: "16px" }} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Wishlist ({wishlistCount})</span>
            </a>
            <div className={styles.drawerUtilityRow}>
              <span className={styles.drawerUtilityLabel}>Language</span>
              <span className={styles.drawerUtilityValue}>
                ENG
                <svg style={{ width: "12px", height: "12px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            <div className={styles.drawerUtilityRow}>
              <span className={styles.drawerUtilityLabel}>Currency</span>
              <span className={styles.drawerUtilityValue}>
                🇺🇸 USD
                <svg style={{ width: "12px", height: "12px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* Drawer Footer Contact */}
        <div className={styles.drawerFooter}>
          <p className={styles.drawerEmail}>customercare@mettamuse.com</p>
          <p>+44 221 133 5360</p>
        </div>
      </aside>
    </>
  );
}
