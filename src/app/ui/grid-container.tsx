import { getRawForecast } from '@/app/lib/data';
import styles from '@/app/page.module.css';
import { Suspense } from 'react';
import WeatherGrid from '@/app/ui/weather-grid';
import MinMax from '@/app/ui/min-max';

export default async function GridContainer({
  url,
  location,
}: {
  url: string;
  location: string;
}) {
  const { ...properties } = await getRawForecast(url);

  const min = properties?.minTemperature.values.find((minTemp) => {
    return (
      new Date().toISOString().match(/^(.*?)(?=T)/)[0] ===
      minTemp.validTime.match(/^(.*?)(?=T)/)[0]
    );
  });

  const max = properties?.maxTemperature.values.find((maxTemp) => {
    return (
      new Date().toISOString().match(/^(.*?)(?=T)/)[0] ===
      maxTemp.validTime.match(/^(.*?)(?=T)/)[0]
    );
  });
  return (
    <div id="forecast-grid" className={styles['forecast-grid']}>
      <MinMax max={max.value} min={min.value} location={location} />
      <div className={`${styles['row-item']} ${styles['row-headers']}`}>
        <p className={`${styles['row-header']} ${styles.time}`}>Time</p>
        <p className={`${styles['row-header']} ${styles.temperature}`}>
          Temperature
        </p>
        <p className={`${styles['row-header']} ${styles['real-feel']}`}>
          Feels Like
        </p>
        <p className={`${styles['row-header']} ${styles.cloud}`}>Cloud Cover</p>
        <p className={`${styles['row-header']} ${styles.precip}`}>
          % Chance Rain
        </p>
        <p className={`${styles['row-header']} ${styles.wind}`}>Wind</p>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <WeatherGrid properties={properties} />
      </Suspense>
    </div>
  );
}
