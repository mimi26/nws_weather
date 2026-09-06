import { Suspense } from 'react';
import WeatherGrid from './weather-grid';
import MinMax from '@/app/ui/min-max';
import styles from '@/app/page.module.css';
import { getRawForecast } from '@/app/lib/data';

export default async function GridProperties({
  url,
  location,
}: {
  url: string;
  location: string;
}) {
  const { ...properties } = await getRawForecast(url as string);

  const currentTimeMatch = new Date().toISOString().match(/^(.*?)(?=T)/);

  const min = properties?.minTemperature.values.find((minTemp) => {
    const minTempTimeMatch = minTemp.validTime.match(/^(.*?)(?=T)/);
    if (currentTimeMatch && minTempTimeMatch) {
      return currentTimeMatch[0] === minTempTimeMatch[0];
    } else {
      return false;
    }
  });

  const max = properties?.maxTemperature.values.find((maxTemp) => {
    const maxTempMatch = maxTemp.validTime.match(/^(.*?)(?=T)/);
    if (currentTimeMatch && maxTempMatch) {
      return currentTimeMatch[0] === maxTempMatch[0];
    } else {
      return false;
    }
  });

  return (
    <>
      <div>
        <MinMax max={max?.value} min={min?.value} location={location} />
      </div>
      <div className={`${styles['row-item']} ${styles['row-headers']}`}>
        <p className={styles.time}>Time</p>
        <p className={styles.temperature}>Temperature</p>
        <p className={styles['real-feel']}>Feels Like</p>
        <p className={styles.cloud}>Cloud Cover</p>
        <p className={styles.precip}>% Chance Rain</p>
        <p className={styles.wind}>Wind</p>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <WeatherGrid properties={properties} />
      </Suspense>
    </>
  );
}
