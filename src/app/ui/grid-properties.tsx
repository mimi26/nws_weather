import { Suspense } from 'react';
import { getRawForecast } from '@/app/lib/data';
import WeatherGrid from '@/app/ui/weather-grid';
import MinMax from '@/app/ui/min-max';
import styles from '@/app/page.module.css';
import gridPropStyles from '@/app/styles/grid-properties.module.css';

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
      <MinMax max={max?.value} min={min?.value} location={location} />
      <div className={styles['row-item']}>
        <p className={gridPropStyles.time}>Time</p>
        <p className={gridPropStyles.temperature}>Temperature</p>
        <p className={gridPropStyles['real-feel']}>Feels Like</p>
        <p className={gridPropStyles.cloud}>Cloud Cover</p>
        <p className={gridPropStyles.precip}>% Chance Rain</p>
        <p className={gridPropStyles.wind}>Wind</p>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <WeatherGrid properties={properties} />
      </Suspense>
    </>
  );
}
