import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer
      className={styles.footer}
      data-purpose="site-footer"
    >
      <div className={styles.inner}>
        {/* Top Row: Newsletter & Contact/Currency */}
        <div className={styles.topRow}>
          {/* Left: Newsletter Subscription */}
          <div>
            <h4 className={styles.sectionTitle}>
              BE THE FIRST TO KNOW
            </h4>
            <p className={styles.newsletterDesc}>
              Sign up for updates from mettā muse.
            </p>
            <form className={styles.newsletterForm}>
              <input
                aria-label="Enter your e-mail for newsletter"
                className={styles.newsletterInput}
                placeholder="Enter your e-mail..."
                required
                type="email"
              />
              <button
                className={styles.newsletterBtn}
                type="submit"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>

          {/* Right: Contact & Currency */}
          <div className={styles.contactCol}>
            <div>
              <h4 className={styles.sectionTitle}>
                CONTACT US
              </h4>
              <p className={styles.contactText}>+44 221 133 5360</p>
              <p className={styles.contactText}>customercare@mettamuse.com</p>
            </div>
            <div>
              <h4 className={styles.sectionTitle}>
                CURRENCY
              </h4>
              <div className={styles.currencyRow}>
                <span className={styles.currencyFlag}>
                  🇺🇸
                </span>
                <span>• USD</span>
              </div>
              <p className={styles.currencyNote}>
                Transactions will be completed in Euros and a currency reference is available on hover.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Columns: Links, Socials & Payments */}
        <div className={styles.bottomRow}>
          {/* Column 1: mettā muse */}
          <div>
            <h5 className={styles.colHeading}>mettā muse</h5>
            <ul className={styles.linkList}>
              <li>
                <a className={styles.footerLink} href="#about">
                  About Us
                </a>
              </li>
              <li>
                <a className={styles.footerLink} href="#stories">
                  Stories
                </a>
              </li>
              <li>
                <a className={styles.footerLink} href="#artisans">
                  Artisans
                </a>
              </li>
              <li>
                <a className={styles.footerLink} href="#boutiques">
                  Boutiques
                </a>
              </li>
              <li>
                <a className={styles.footerLink} href="#contact">
                  Contact Us
                </a>
              </li>
              <li>
                <a className={styles.footerLink} href="#eu-docs">
                  EU Compliances Docs
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h5 className={styles.colHeadingQuick}>QUICK LINKS</h5>
            <ul className={styles.linkList}>
              <li>
                <a className={styles.footerLink} href="#orders">
                  Orders &amp; Shipping
                </a>
              </li>
              <li>
                <a className={styles.footerLink} href="#seller">
                  Join/Login as a Seller
                </a>
              </li>
              <li>
                <a className={styles.footerLink} href="#pricing">
                  Payment &amp; Pricing
                </a>
              </li>
              <li>
                <a className={styles.footerLink} href="#returns">
                  Return &amp; Refunds
                </a>
              </li>
              <li>
                <a className={styles.footerLink} href="#faqs">
                  FAQs
                </a>
              </li>
              <li>
                <a className={styles.footerLink} href="#privacy">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className={styles.footerLink} href="#terms">
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Social & Payment Support */}
          <div className={styles.socialAndPaymentCol}>
            <div>
              <h5 className={styles.colHeadingQuick}>FOLLOW US</h5>
              {/* Social Icons */}
              <div className={styles.socialIcons}>
                <a
                  aria-label="Instagram"
                  className={styles.socialIconBtn}
                  href="https://instagram.com"
                  rel="noreferrer"
                  target="_blank"
                >
                  <svg style={{ width: "16px", height: "16px" }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  aria-label="LinkedIn"
                  className={styles.socialIconBtn}
                  href="https://linkedin.com"
                  rel="noreferrer"
                  target="_blank"
                >
                  <svg style={{ width: "14px", height: "14px" }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h5 className={styles.colHeadingQuick}>mettā muse ACCEPTS</h5>
              {/* Payment Badges */}
              <div className={styles.paymentBadges}>
                <span className={`${styles.badge} ${styles.badgeGPay}`}>
                  <span style={{ fontWeight: 700, color: "#4285F4" }}>G</span>
                  <span style={{ fontWeight: 700, color: "#EA4335" }}>P</span>
                  <span style={{ fontWeight: 700, color: "#FBBC05" }}>a</span>
                  <span style={{ fontWeight: 700, color: "#34A853" }}>y</span>
                </span>
                <span className={styles.badge}>
                  <div style={{ display: "flex", marginLeft: "-6px" }}>
                    <div style={{ width: "14px", height: "14px", borderRadius: "50%", backgroundColor: "#EB001B" }} />
                    <div style={{ width: "14px", height: "14px", borderRadius: "50%", backgroundColor: "#F79E1B", opacity: 0.8, marginLeft: "-6px" }} />
                  </div>
                </span>
                <span className={`${styles.badge} ${styles.badgePayPal}`}>
                  PayPal
                </span>
                <span className={`${styles.badge} ${styles.badgeAmex}`}>
                  AMEX
                </span>
                <span className={`${styles.badge} ${styles.badgeApplePay}`}>
                  Pay
                </span>
                <span className={`${styles.badge} ${styles.badgeOPay}`}>
                  OPay
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          <p>
            Copyright © 2023 mettamuse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
