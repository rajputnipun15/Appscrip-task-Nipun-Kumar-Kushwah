import styles from "./TopAnnouncementBar.module.css";

export default function TopAnnouncementBar() {
  return (
    <aside
      className={styles.announcementBar}
      aria-label="Announcement"
      data-purpose="top-announcement-bar"
    >
      <div className={styles.inner}>
        <div className={styles.item}>
          <svg
            className={styles.icon}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 5a1 1 0 012 0v5a1 1 0 01-.293.707l-2 2a1 1 0 01-1.414-1.414L9 9.586V5z"
              fillRule="evenodd"
            />
          </svg>
          <span className={styles.text}>Lorem ipsum dolor</span>
        </div>

        <div className={styles.itemDesktop}>
          <svg
            className={styles.icon}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className={styles.text}>Special Seasonal Collection</span>
        </div>

        <div className={styles.itemTablet}>
          <svg
            className={styles.icon}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              d="M5 2a2 2 0 00-2 2v14l4-2 4 2 4-2 4 2V4a2 2 0 00-2-2H5zm0 2h10v12.2l-3-1.5-2 1-2-1-3 1.5V4z"
              fillRule="evenodd"
            />
          </svg>
          <span className={styles.text}>Complimentary Global Shipping</span>
        </div>
      </div>
    </aside>
  );
}
