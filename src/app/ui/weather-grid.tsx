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
  
  const propertiesArray = filteredArray.map(prop => ({[prop]: properties[prop]}))
  const timeArray: PropertyDataPoint['validTime'][] = propertiesArray.find(
    prop => prop['temperature'],
  )?.temperature.values.map((prop: PropertyDataPoint) => prop.validTime);
  
    const nowIndex = timeArray.findIndex(time => {
      return Date.parse(new Date(time.match(/.*(?=\/)/)?.[0] as string)) >= Date.parse(new Date());
  });

  return (
    <>
      {timeArray.slice(nowIndex, 50).map((prop: PropertyDataPoint['validTime']) => {
        const timePoint = prop as string;
        const timeString = new Date(timePoint.match(/.*(?=\/)/)?.[0] as string).toLocaleTimeString();
        return (
          <div key={prop} className={`${styles['row-item']}`}>
            <p>{timeString}</p>
            {filteredArray.map(prop => {
              return <p key={prop}>{prop}</p>
            })}
          </div>
        )
      })}
    </>
  );
}
