import { getRawForecast } from '@/app/lib/data';
import { PropertyDataPoint, WeatherProperty } from '@/app/lib/types';
import DataPoint from './data-point';
import styles from '@/app/page.module.css';

export default async function WeatherGrid({ url }: { url: string }) {
  const { ...properties } = await getRawForecast(url);

  const propertiesArray = Object.keys(WeatherProperty).map(
    prop => ({ [prop]: properties[prop as keyof WeatherProperty] }),
  );

  const gridData = [...new Array(20)].map((_elem, index) => {
    const timePlusIndex = new Date(new Date().setUTCMinutes(0, 0) + (index * 60 * 60 * 1000));
    const timeObj = {};
    const propObj = {}
    Object.assign(timeObj, { [timePlusIndex.toLocaleTimeString()]: propObj });
    propertiesArray.forEach(property => {
      const propertyArray = Object.values(property)[0]?.values;
      const propertyKey = Object.keys(property)[0];

        const propDataPoint =  propertyArray?.find((dataPoint: PropertyDataPoint) => {
          const timeMatch = dataPoint?.validTime?.match(/.*(?=\/)/);
          return timeMatch ? Date.parse(timeMatch[0]) === Date.parse(timePlusIndex.toString()) : false;
        });
      
        Object.defineProperty(propObj, propertyKey, {
          value: propDataPoint?.value,
          writable: true,
          enumerable: true,
        });
    });
    return timeObj;
  });

  return (
    <>
      {gridData.map(timeData => {
        const [ timeKey ] = Object.keys(timeData);
        const [dataValues] = Object.values(timeData);

        const dataArray = Object.keys(WeatherProperty).map(prop => ({ [prop]: dataValues[prop] }));
        return (
          <div key={timeKey} className={`${styles['row-item']}`}>
            <p className={styles.dark}>{timeKey}</p>

            {dataArray.map((property, index) => {
              const backgroundClassName = index % 2 === 0 ? styles.light : styles.dark;
              const [ propKey ] = Object.keys(property);
              return (
                <DataPoint
                  key={`${propKey}-${timeKey}`}
                  weatherProperty={propKey}
                  rawPropertyValue={property[propKey]}
                  backgroundClassName={backgroundClassName}
                />
              )
            })}

          </div>
        );
      })}
    </>
  );
}
