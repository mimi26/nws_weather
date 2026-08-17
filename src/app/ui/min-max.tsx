import styles from '@/app/page.module.css';

export default function MinMax({
  max,
  min,
  location,
}: {
  max: number;
  min: number;
  location: string;
}) {
  const high = `${(max * 9) / 5 + 32} \u2109`;
  const low = `${(min * 9) / 5 + 32} \u2109`;

  return (
    <div className={styles['grid-header']}>
      <p className={styles.location}>Weather for {location}</p>
      <div className={styles['max-min']}>
        <span className={styles['daily-max']}>Today's High: {high}</span>

        <span className={styles['daily-min']}>Today's Low: {low}</span>
      </div>
      {/* <button id="refresh-btn" className={styles["refresh-btn"]}>
        Click Here To Refresh Data
      </button> */}
    </div>
  );
}
