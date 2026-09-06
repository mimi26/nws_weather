'use client';
import styles from '@/app/page.module.css';
import { useTime } from '@/app/hooks/useTime';
import LocationForm from './location-form';
import { useRouter } from 'next/navigation';

export default function MinMax({
  max,
  min,
  location,
}: {
  max: number | undefined;
  min: number | undefined;
  location: string;
}) {
  if (!(max && min)) {
    return null;
  }
  const router = useRouter();

  const time = useTime();

  const high = `${(max * 9) / 5 + 32} \u2109`;
  const low = `${(min * 9) / 5 + 32} \u2109`;

  return (
    <div className={styles['grid-header']}>
      <div className={styles['time-container']}>
        <span className={styles.location}>Weather for {location}:</span>
        <time className={styles.location}>
          {time.toLocaleDateString([], { dateStyle: 'full' })}
        </time>
      </div>
      <div className={styles['max-min']}>
        <span className={styles['daily-max']}>Today's High: {high}</span>
        <span className={styles['daily-min']}>Today's Low: {low}</span>
      </div>
      <div className={styles['form-container']}>
        <LocationForm />
        <button
          onClick={() => {
            router.push('/');
          }}
          className={`${styles['margin-element']} ${styles['padding-element']}`}
        >
          Clear Search
        </button>
      </div>

      {/* <button id="refresh-btn" className={styles["refresh-btn"]}>
        Click Here To Refresh Data
      </button> */}
    </div>
  );
}
