'use client';
import { useRouter } from 'next/navigation';
import { useTime } from '@/app/hooks/useTime';
import LocationForm from '@/app/ui/location-form';
import styles from '@/app/page.module.css';
import minMaxStyles from '@/app/styles/min-max.module.css';

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
    <div className={minMaxStyles['grid-header']}>
      <div className={minMaxStyles['time-container']}>
        <span className={minMaxStyles.location}>Weather for {location}:</span>
        <time className={minMaxStyles.location}>
          {time.toLocaleDateString([], { dateStyle: 'full' })}
        </time>
      </div>
      <div className={minMaxStyles['max-min']}>
        <span className={minMaxStyles['daily-max']}>Today's High: {high}</span>
        <span className={minMaxStyles['daily-min']}>Today's Low: {low}</span>
      </div>
      <div className={minMaxStyles['form-container']}>
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
