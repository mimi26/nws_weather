import { WeatherProperty } from '../lib/types';

export default function DataPoint({
  weatherProperty,
  rawPropertyValue,
  backgroundClassName,
 }: {
  weatherProperty: string,
  rawPropertyValue?: number,
  backgroundClassName: string,
 }) {

  const formatValue = (rawPropertyValue: number | undefined, property: string) => {
    if (!rawPropertyValue?.toString()) {
      return '';
    }
    switch (property) {
      case WeatherProperty.temperature:
      case WeatherProperty.heatIndex:
        return `${(rawPropertyValue * 9 / 5) + 32} \u2109`;
      case WeatherProperty.skyCover:
      case WeatherProperty.probabilityOfPrecipitation:
        return `${rawPropertyValue.toString()} %`;
      case WeatherProperty.windSpeed:
        return `${Math.round(rawPropertyValue * 0.6213711922)} mph`;
      default:
        break;
    }
  }

  return (
    <p className={backgroundClassName}>
      {formatValue(rawPropertyValue, weatherProperty)}
    </p>
  );
}
