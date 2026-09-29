"use client";

import { useState } from "react";
import styles from "./FilterSidebar.module.css";

interface FilterSidebarProps {
  isOpen: boolean;
  onCloseMobile: () => void;
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function FilterSidebar({
  isOpen,
  onCloseMobile,
  categories,
  selectedCategory,
  onSelectCategory,
}: FilterSidebarProps) {
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    "ideal-for": true,
    occasion: false,
    work: false,
    fabric: false,
    segment: false,
    suitable: false,
    "raw-materials": false,
    pattern: false,
  });

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    customizable: false,
    "occ-casual": false,
    "occ-formal": false,
    "occ-travel": false,
    "work-handloom": false,
    "work-embroidery": false,
    "fab-cotton": false,
    "fab-canvas": false,
    "fab-linen": false,
    "seg-luxury": false,
    "seg-heritage": false,
    "suit-commute": false,
    "suit-travel": false,
    "mat-leather": false,
    "mat-brass": false,
    "pat-solid": false,
    "pat-weave": false,
  });

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleCheckbox = (key: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const uncheckGroup = (prefix: string) => {
    setCheckedItems((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => {
        if (k.startsWith(prefix)) {
          next[k] = false;
        }
      });
      return next;
    });
  };

  return (
    <>
      {/* Mobile Filter Drawer Backdrop */}
      <div
        aria-hidden="true"
        className={`${styles.mobileBackdrop} ${
          isOpen ? styles.backdropOpen : styles.backdropClosed
        }`}
        onClick={onCloseMobile}
      />

      {/* Filter Sidebar (Desktop collapsible inline, Mobile slide-in drawer) */}
      <aside
        aria-label="Product Filters"
        className={`${styles.sidebar} ${
          isOpen ? styles.sidebarOpen : styles.sidebarCollapsed
        }`}
        id="filterSidebar"
      >
        <div className={styles.sidebarInner}>
          {/* Mobile Drawer Header */}
          <div className={styles.mobileDrawerHeader}>
            <h3 className={styles.mobileTitle}>FILTER</h3>
            <button
              aria-label="Close filters"
              className={styles.mobileCloseBtn}
              onClick={onCloseMobile}
              type="button"
            >
              <svg style={{ width: "20px", height: "20px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </button>
          </div>

          {/* Customizable Checkbox Row */}
          <div className={styles.rowCheckbox}>
            <label className={styles.checkboxLabel}>
              <input
                checked={checkedItems.customizable}
                className={styles.checkboxInput}
                onChange={() => toggleCheckbox("customizable")}
                type="checkbox"
              />
              <span className={styles.checkboxText}>
                CUSTOMIZABLE
              </span>
            </label>
          </div>

          {/* Accordion 1: IDEAL FOR (Genuine FakeStoreAPI Categories) */}
          <div className={styles.accordionGroup}>
            <button
              className={styles.accordionBtn}
              onClick={() => toggleAccordion("ideal-for")}
              type="button"
            >
              <div>
                <span className={styles.accordionTitle}>
                  IDEAL FOR
                </span>
                <span className={styles.accordionSub}>
                  {selectedCategory === "all" ? "All" : selectedCategory}
                </span>
              </div>
              <svg
                className={`${styles.accordionChevron} ${
                  openAccordions["ideal-for"] ? styles.accordionChevronOpen : styles.accordionChevronClosed
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {openAccordions["ideal-for"] && (
              <div className={styles.accordionBody}>
                <button
                  className={styles.unselectAllBtn}
                  onClick={() => onSelectCategory("all")}
                  type="button"
                >
                  Unselect all
                </button>
                <label className={styles.optionLabel}>
                  <input
                    checked={selectedCategory === "all"}
                    className={styles.checkboxInput}
                    name="category-filter"
                    onChange={() => onSelectCategory("all")}
                    type="radio"
                  />
                  <span>All Categories</span>
                </label>
                {categories.map((cat) => (
                  <label className={styles.optionLabel} key={cat}>
                    <input
                      checked={selectedCategory === cat}
                      className={styles.checkboxInput}
                      name="category-filter"
                      onChange={() => onSelectCategory(cat)}
                      type="radio"
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Accordion 2: OCCASION */}
          <div className={styles.accordionGroup}>
            <button
              className={styles.accordionBtn}
              onClick={() => toggleAccordion("occasion")}
              type="button"
            >
              <div>
                <span className={styles.accordionTitle}>
                  OCCASION
                </span>
                <span className={styles.accordionSub}>All</span>
              </div>
              <svg
                className={`${styles.accordionChevron} ${
                  openAccordions["occasion"] ? styles.accordionChevronOpen : styles.accordionChevronClosed
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {openAccordions["occasion"] && (
              <div className={styles.accordionBody}>
                <button
                  className={styles.unselectAllBtn}
                  onClick={() => uncheckGroup("occ-")}
                  type="button"
                >
                  Unselect all
                </button>
                <label className={styles.optionLabel}>
                  <input
                    checked={checkedItems["occ-casual"]}
                    className={styles.checkboxInput}
                    onChange={() => toggleCheckbox("occ-casual")}
                    type="checkbox"
                  />
                  <span>Casual</span>
                </label>
                <label className={styles.optionLabel}>
                  <input
                    checked={checkedItems["occ-formal"]}
                    className={styles.checkboxInput}
                    onChange={() => toggleCheckbox("occ-formal")}
                    type="checkbox"
                  />
                  <span>Formal</span>
                </label>
                <label className={styles.optionLabel}>
                  <input
                    checked={checkedItems["occ-travel"]}
                    className={styles.checkboxInput}
                    onChange={() => toggleCheckbox("occ-travel")}
                    type="checkbox"
                  />
                  <span>Travel &amp; Weekend</span>
                </label>
              </div>
            )}
          </div>

          {/* Accordion 3: WORK */}
          <div className={styles.accordionGroup}>
            <button
              className={styles.accordionBtn}
              onClick={() => toggleAccordion("work")}
              type="button"
            >
              <div>
                <span className={styles.accordionTitle}>
                  WORK
                </span>
                <span className={styles.accordionSub}>All</span>
              </div>
              <svg
                className={`${styles.accordionChevron} ${
                  openAccordions["work"] ? styles.accordionChevronOpen : styles.accordionChevronClosed
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {openAccordions["work"] && (
              <div className={styles.accordionBody}>
                <button
                  className={styles.unselectAllBtn}
                  onClick={() => uncheckGroup("work-")}
                  type="button"
                >
                  Unselect all
                </button>
                <label className={styles.optionLabel}>
                  <input
                    checked={checkedItems["work-handloom"]}
                    className={styles.checkboxInput}
                    onChange={() => toggleCheckbox("work-handloom")}
                    type="checkbox"
                  />
                  <span>Handloom</span>
                </label>
                <label className={styles.optionLabel}>
                  <input
                    checked={checkedItems["work-embroidery"]}
                    className={styles.checkboxInput}
                    onChange={() => toggleCheckbox("work-embroidery")}
                    type="checkbox"
                  />
                  <span>Embroidery</span>
                </label>
              </div>
            )}
          </div>

          {/* Accordion 4: FABRIC */}
          <div className={styles.accordionGroup}>
            <button
              className={styles.accordionBtn}
              onClick={() => toggleAccordion("fabric")}
              type="button"
            >
              <div>
                <span className={styles.accordionTitle}>
                  FABRIC
                </span>
                <span className={styles.accordionSub}>All</span>
              </div>
              <svg
                className={`${styles.accordionChevron} ${
                  openAccordions["fabric"] ? styles.accordionChevronOpen : styles.accordionChevronClosed
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {openAccordions["fabric"] && (
              <div className={styles.accordionBody}>
                <button
                  className={styles.unselectAllBtn}
                  onClick={() => uncheckGroup("fab-")}
                  type="button"
                >
                  Unselect all
                </button>
                <label className={styles.optionLabel}>
                  <input
                    checked={checkedItems["fab-cotton"]}
                    className={styles.checkboxInput}
                    onChange={() => toggleCheckbox("fab-cotton")}
                    type="checkbox"
                  />
                  <span>Organic Cotton</span>
                </label>
                <label className={styles.optionLabel}>
                  <input
                    checked={checkedItems["fab-canvas"]}
                    className={styles.checkboxInput}
                    onChange={() => toggleCheckbox("fab-canvas")}
                    type="checkbox"
                  />
                  <span>Recycled Canvas</span>
                </label>
                <label className={styles.optionLabel}>
                  <input
                    checked={checkedItems["fab-linen"]}
                    className={styles.checkboxInput}
                    onChange={() => toggleCheckbox("fab-linen")}
                    type="checkbox"
                  />
                  <span>Pure Linen</span>
                </label>
              </div>
            )}
          </div>

          {/* Accordion 5: SEGMENT */}
          <div className={styles.accordionGroup}>
            <button
              className={styles.accordionBtn}
              onClick={() => toggleAccordion("segment")}
              type="button"
            >
              <div>
                <span className={styles.accordionTitle}>
                  SEGMENT
                </span>
                <span className={styles.accordionSub}>All</span>
              </div>
              <svg
                className={`${styles.accordionChevron} ${
                  openAccordions["segment"] ? styles.accordionChevronOpen : styles.accordionChevronClosed
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {openAccordions["segment"] && (
              <div className={styles.accordionBody}>
                <button
                  className={styles.unselectAllBtn}
                  onClick={() => uncheckGroup("seg-")}
                  type="button"
                >
                  Unselect all
                </button>
                <label className={styles.optionLabel}>
                  <input
                    checked={checkedItems["seg-luxury"]}
                    className={styles.checkboxInput}
                    onChange={() => toggleCheckbox("seg-luxury")}
                    type="checkbox"
                  />
                  <span>Luxury Atelier</span>
                </label>
                <label className={styles.optionLabel}>
                  <input
                    checked={checkedItems["seg-heritage"]}
                    className={styles.checkboxInput}
                    onChange={() => toggleCheckbox("seg-heritage")}
                    type="checkbox"
                  />
                  <span>Heritage Archive</span>
                </label>
              </div>
            )}
          </div>

          {/* Accordion 6: SUITABLE FOR */}
          <div className={styles.accordionGroup}>
            <button
              className={styles.accordionBtn}
              onClick={() => toggleAccordion("suitable")}
              type="button"
            >
              <div>
                <span className={styles.accordionTitle}>
                  SUITABLE FOR
                </span>
                <span className={styles.accordionSub}>All</span>
              </div>
              <svg
                className={`${styles.accordionChevron} ${
                  openAccordions["suitable"] ? styles.accordionChevronOpen : styles.accordionChevronClosed
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {openAccordions["suitable"] && (
              <div className={styles.accordionBody}>
                <button
                  className={styles.unselectAllBtn}
                  onClick={() => uncheckGroup("suit-")}
                  type="button"
                >
                  Unselect all
                </button>
                <label className={styles.optionLabel}>
                  <input
                    checked={checkedItems["suit-commute"]}
                    className={styles.checkboxInput}
                    onChange={() => toggleCheckbox("suit-commute")}
                    type="checkbox"
                  />
                  <span>Daily Commute</span>
                </label>
                <label className={styles.optionLabel}>
                  <input
                    checked={checkedItems["suit-travel"]}
                    className={styles.checkboxInput}
                    onChange={() => toggleCheckbox("suit-travel")}
                    type="checkbox"
                  />
                  <span>Overnight Travel</span>
                </label>
              </div>
            )}
          </div>

          {/* Accordion 7: RAW MATERIALS */}
          <div className={styles.accordionGroup}>
            <button
              className={styles.accordionBtn}
              onClick={() => toggleAccordion("raw-materials")}
              type="button"
            >
              <div>
                <span className={styles.accordionTitle}>
                  RAW MATERIALS
                </span>
                <span className={styles.accordionSub}>All</span>
              </div>
              <svg
                className={`${styles.accordionChevron} ${
                  openAccordions["raw-materials"] ? styles.accordionChevronOpen : styles.accordionChevronClosed
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {openAccordions["raw-materials"] && (
              <div className={styles.accordionBody}>
                <button
                  className={styles.unselectAllBtn}
                  onClick={() => uncheckGroup("mat-")}
                  type="button"
                >
                  Unselect all
                </button>
                <label className={styles.optionLabel}>
                  <input
                    checked={checkedItems["mat-leather"]}
                    className={styles.checkboxInput}
                    onChange={() => toggleCheckbox("mat-leather")}
                    type="checkbox"
                  />
                  <span>Vegetable-Tanned Leather</span>
                </label>
                <label className={styles.optionLabel}>
                  <input
                    checked={checkedItems["mat-brass"]}
                    className={styles.checkboxInput}
                    onChange={() => toggleCheckbox("mat-brass")}
                    type="checkbox"
                  />
                  <span>Cold-Forged Brass</span>
                </label>
              </div>
            )}
          </div>

          {/* Accordion 8: PATTERN */}
          <div className={styles.accordionGroup} style={{ borderBottom: "none" }}>
            <button
              className={styles.accordionBtn}
              onClick={() => toggleAccordion("pattern")}
              type="button"
            >
              <div>
                <span className={styles.accordionTitle}>
                  PATTERN
                </span>
                <span className={styles.accordionSub}>All</span>
              </div>
              <svg
                className={`${styles.accordionChevron} ${
                  openAccordions["pattern"] ? styles.accordionChevronOpen : styles.accordionChevronClosed
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {openAccordions["pattern"] && (
              <div className={styles.accordionBody}>
                <button
                  className={styles.unselectAllBtn}
                  onClick={() => uncheckGroup("pat-")}
                  type="button"
                >
                  Unselect all
                </button>
                <label className={styles.optionLabel}>
                  <input
                    checked={checkedItems["pat-solid"]}
                    className={styles.checkboxInput}
                    onChange={() => toggleCheckbox("pat-solid")}
                    type="checkbox"
                  />
                  <span>Solid Minimal</span>
                </label>
                <label className={styles.optionLabel}>
                  <input
                    checked={checkedItems["pat-weave"]}
                    className={styles.checkboxInput}
                    onChange={() => toggleCheckbox("pat-weave")}
                    type="checkbox"
                  />
                  <span>Textured Weave</span>
                </label>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
