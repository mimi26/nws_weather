import styles from '@/app/page.module.css';

export default function MinMax({ max, min }: { max: number; min: number }) {
  const high = `${(max * 9) / 5 + 32} \u2109`;
  const low = `${(min * 9) / 5 + 32} \u2109`;

  return (
    <div className={styles['grid-header']}>
      <div className={styles['max-min']}>
        Today's High: {high}
        <span id="daily-max" className={styles['daily-max']}></span>
        Today's Low: {low}
        <span id="daily-min" className={styles['daily-min']}></span>
      </div>
      {/* <button id="refresh-btn" className={styles["refresh-btn"]}>
        Click Here To Refresh Data
      </button> */}
    </div>
  );
}
