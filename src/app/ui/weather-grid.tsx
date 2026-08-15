import { PropertyDataPoint, WeatherProperty } from '@/app/lib/types';
import DataPoint from './data-point';
import styles from '@/app/page.module.css';

export default function WeatherGrid({ properties }) {
  const propertiesArray = Object.keys(WeatherProperty).map((prop) => ({
    [prop]: properties[prop as keyof WeatherProperty],
  }));

  const gridData = [...new Array(20)].map((elem, index, arr) => {
    const timePlusIndex = new Date(
      new Date().setUTCMinutes(0, 0) + index * 60 * 60 * 1000,
    );
    const timeObj = {};
    const propObj = {};
    Object.assign(timeObj, { [timePlusIndex.toLocaleTimeString()]: propObj });
    propertiesArray.forEach((property) => {
      const [propertyValues] = Object.values(property);
      const propertyArray = propertyValues?.values;
      const [propertyKey] = Object.keys(property);

      const target = Date.parse(timePlusIndex.toString());

      const propValue = propertyArray?.reduceRight(
        (found: PropertyDataPoint, dataPoint: PropertyDataPoint) => {
          if (found !== undefined) {
            return found;
          }
          const timeMatch = dataPoint?.validTime?.match(/.*(?=\/)/);
          if (!timeMatch) {
            return undefined;
          }
          const currentTimeStamp = Date.parse(timeMatch[0]);
          // match exact hourly steps within the allowed lookback window
          if (currentTimeStamp <= target) {
            return dataPoint?.value;
          }
          return undefined;
        },
        undefined,
      );

      Object.defineProperty(propObj, propertyKey, {
        value: propValue,
        writable: true,
        enumerable: true,
      });
    });
    return timeObj;
  });

  return (
    <>
      {gridData.map((timeData, index) => {
        const [timeKey] = Object.keys(timeData);
        const [dataValues] = Object.values(timeData);

        const dataArray = Object.keys(WeatherProperty).map((prop) => ({
          [prop]: dataValues[prop],
        }));
        return (
          <div key={timeKey} className={`${styles['row-item']}`}>
            <p className={styles.dark}>{timeKey}</p>

            {dataArray.map((property, index) => {
              const backgroundClassName =
                index % 2 === 0 ? styles.light : styles.dark;
              const [propKey] = Object.keys(property);
              return (
                <DataPoint
                  key={`${propKey}-${timeKey}`}
                  weatherProperty={propKey}
                  rawPropertyValue={property[propKey]}
                  backgroundClassName={backgroundClassName}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
}
