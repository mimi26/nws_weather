import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
        <div id="forecast-grid" className={styles['forecast-grid']}>
            <div className={styles['grid-header']}>
                <div className={styles['max-min']}>
                  Today's High:
                  <span id="daily-max" className={styles['daily-max']}></span>
                  Today's Low:
                  <span id="daily-min" className={styles['daily-min']}></span>
                </div>
                <button id="refresh-btn" className={styles['refresh-btn']}>Click Here To Refresh Data</button>
            </div>
            <div className={`${styles['row-item']} ${styles['row-headers']}`}>
                <p className={`${styles['row-header']} ${styles.time}`}>Time</p>
                <p className={`${styles['row-header']} ${styles.temperature}`}>Temperature</p>
                <p className={`${styles['row-header']} ${styles['real-feel']}`}>Feels Like</p>
                <p className={`${styles['row-header']} ${styles.cloud}`}>Cloud Cover</p>
                <p className={`${styles['row-header']} ${styles.precip}`}>% Chance Rain</p>
                <p className={`${styles['row-header']} ${styles.wind}`}>Wind</p>
            </div>
        </div>
    </main>
  );
}
