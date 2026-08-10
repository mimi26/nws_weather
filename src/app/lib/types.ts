export enum WeatherProperty {
  temperature = 'temperature',
  heatIndex = 'heatIndex',
  skyCover = 'skyCover',
  probabilityOfPrecipitation = 'probabilityOfPrecipitation',
  windSpeed = 'windSpeed',
}

export interface propertyValues {
  values: PropertyDataPoint[];
};

export interface PropertyDataPoint {
  validTime: string;
  value: number;
};

export type WeatherPropertyData = {
  [Property in keyof WeatherProperty]: propertyValues;
};
