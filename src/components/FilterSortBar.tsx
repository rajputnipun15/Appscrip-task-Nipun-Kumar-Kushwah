"use client";

import { useState, useEffect, useRef } from "react";
import type { SortOption } from "@/types/product";
import styles from "./FilterSortBar.module.css";

interface FilterSortBarProps {
  totalItems: number;
  isFilterOpen: boolean;
  onToggleFilter: () => void;
  selectedSort: SortOption;
  onSelectSort: (option: SortOption) => void;
}

const SORT_OPTIONS: SortOption[] = [
  "RECOMMENDED",
  "NEWEST FIRST",
  "POPULAR",
  "PRICE : HIGH TO LOW",
  "PRICE : LOW TO HIGH",
];

export default function FilterSortBar({
  totalItems,
  isFilterOpen,
  onToggleFilter,
  selectedSort,
  onSelectSort,
}: FilterSortBarProps) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isSortOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsSortOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSortOpen]);

  return (
    <div className={styles.toolbar}>
      <div className={styles.inner}>
        {/* Left: Truthful Item Counter & Filter Toggle Button */}
        <div className={styles.leftControls}>
          <span className={styles.itemCount}>
            {totalItems} ITEMS
          </span>
          <button
            aria-expanded={isFilterOpen}
            className={styles.filterToggleBtn}
            id="filterToggleBtn"
            onClick={onToggleFilter}
            type="button"
          >
            <svg
              className={`${styles.filterToggleChevron} ${
                isFilterOpen ? styles.chevronExpanded : styles.chevronCollapsed
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M15 19l-7-7 7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
              />
            </svg>
            <span id="filterToggleText">
              {isFilterOpen ? "HIDE FILTER" : "SHOW FILTER"}
            </span>
          </button>
        </div>

        {/* Right: Sort Select Dropdown */}
        <div className={styles.sortContainer} id="sortDropdownContainer" ref={dropdownRef}>
          <button
            aria-expanded={isSortOpen}
            aria-haspopup="true"
            className={styles.sortBtn}
            id="sortDropdownBtn"
            onClick={() => setIsSortOpen(!isSortOpen)}
            type="button"
          >
            <span>{selectedSort}</span>
            <svg
              className={`${styles.sortChevron} ${
                isSortOpen ? styles.sortChevronOpen : styles.sortChevronClosed
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Interactive Dropdown Menu */}
          <div
            className={`${styles.sortDropdownMenu} ${
              isSortOpen ? styles.sortMenuEnter : styles.sortMenuLeave
            }`}
            role="menu"
          >
            <ul className={styles.sortList}>
              {SORT_OPTIONS.map((option) => {
                const isSelected = selectedSort === option;
                return (
                  <li key={option}>
                    <button
                      className={`${styles.sortOptionBtn} ${
                        isSelected ? styles.sortOptionSelected : styles.sortOptionUnselected
                      }`}
                      onClick={() => {
                        onSelectSort(option);
                        setIsSortOpen(false);
                      }}
                      role="menuitem"
                      type="button"
                    >
                      <span>{option}</span>
                      {isSelected && (
                        <svg
                          className={styles.sortCheckIcon}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M5 13l4 4L19 7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
