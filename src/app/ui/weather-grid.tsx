import { getRawForecast } from '@/app/lib/data';
import styles from '@/app/page.module.css';
import { PropertyDataPoint, WeatherProperty } from '@/app/lib/types';

export default async function WeatherGrid({ url }: { url: string }) {
  const { ...properties } = await getRawForecast(url);

  const filteredArray = Object.keys(properties).filter(prop => {
    if (Object.keys(WeatherProperty).includes(prop)) {
      return prop;
    }
  });
  
  const propertiesArray = filteredArray.map(prop => ({[prop]: properties[prop]}));

  const timeArray = [...new Array(20)].map((_elem, index) => {
    const timePlusIndex = new Date(new Date().setUTCMinutes(0, 0) + (index * 60 * 60 * 1000));
    return timePlusIndex;
  });

  const getPropertyByTimeAndProperty = (time: Date, property: WeatherProperty) => {
    const propertyArray = propertiesArray.find(prop => prop[property])?.[property].values;

    return propertyArray.find((dataPoint: PropertyDataPoint) => {
 

      return new Date(dataPoint.validTime.match(/.*(?=\/)/)?.[0]).toString() === time.toString();
    });
  };

  return (
    <>
      {timeArray.map(time => {
        const tempCelcius = getPropertyByTimeAndProperty(time, WeatherProperty.temperature)?.value;
        const tempFToRender = tempCelcius ? `${(tempCelcius * 9 / 5) + 32} \u2109` : '';
        const heatIndexCelcius = getPropertyByTimeAndProperty(time, WeatherProperty.heatIndex)?.value;
        const heatIndexFtoRender = heatIndexCelcius ? `${(heatIndexCelcius * 9 / 5) + 32} \u2109` : '';
        const cloudCover = getPropertyByTimeAndProperty(time, WeatherProperty.skyCover)?.value;
        const cloudCoverToRender = cloudCover ? `${cloudCover} %` : '';
        const probabilityRain = getPropertyByTimeAndProperty(time, WeatherProperty.probabilityOfPrecipitation)?.value;
        const chanceRainToRender = probabilityRain ? `${probabilityRain} %` : '';
        const windSpeed = getPropertyByTimeAndProperty(time, WeatherProperty.windSpeed)?.value;
        const windSpeedToRender = windSpeed ? `${Math.round(windSpeed * 0.6213711922)} mph` : '';
        return (
          <div key={time.toLocaleTimeString()} className={`${styles['row-item']}`}>
            <p className={styles.dark}>{time.toLocaleTimeString()}</p>
            <p className={styles.light}>{tempFToRender}</p>
            <p className={styles.dark}>{heatIndexFtoRender}</p>
            <p className={styles.light}>{cloudCoverToRender}</p>
            <p className={styles.dark}>{chanceRainToRender}</p>
            <p className={styles.light}>{windSpeedToRender}</p>
          </div>
        )
      })}
    </>
  );
}
