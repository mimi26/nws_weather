import { getRawForecast } from '@/app/lib/data';
import { PropertyDataPoint, WeatherProperty } from '@/app/lib/types';
import DataPoint from './data-point';
import styles from '@/app/page.module.css';

export default async function WeatherGrid({ url }: { url: string }) {
  const { ...properties } = await getRawForecast(url);

  const propertiesArray = Object.keys(WeatherProperty).map(
    prop => ({ [prop]: properties[prop as keyof WeatherProperty] }),
  );

  const timeArray = [...new Array(20)].map((_elem, index) => {
    const timePlusIndex = new Date(new Date().setUTCMinutes(0, 0) + (index * 60 * 60 * 1000));
    return timePlusIndex;
  });

  const getPropertyByTimeAndProperty = (time: Date, property) => {

    const propertyArray = Object.entries(property)[0][1]?.values;

    return propertyArray?.find((dataPoint: PropertyDataPoint) => {
      const timeMatch = dataPoint?.validTime?.match(/.*(?=\/)/);
      return timeMatch ? Date.parse(timeMatch[0]) === Date.parse(time.toString()) : false;
    });
  };

  return (
    <>
      {timeArray.map(time => {
        return (
          <div key={time.toString()} className={`${styles['row-item']}`}>
            <p className={styles.dark}>{time.toLocaleTimeString()}</p>
            {propertiesArray.map((property, index) => {
              const backgroundClassName = index % 2 === 0 ? styles.light : styles.dark;

              const rawPropertyValue = getPropertyByTimeAndProperty(time, property)?.value;

              return (
                <DataPoint
                  key={`${Object.keys(property)[0]}-${time}`}
                  weatherProperty={Object.keys(property)[0]}
                  rawPropertyValue={rawPropertyValue}
                  backgroundClassName={backgroundClassName}
                />
            )})}
          </div>
        );
      })}
    </>
  );
}
