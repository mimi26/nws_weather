export enum WeatherProperty {
  temperature = 'temperature',
  heatIndex = 'heatIndex',
  skyCover = 'skyCover',
  probabilityOfPrecipitation = 'probabilityOfPrecipitation',
  windSpeed = 'windSpeed',
}

export enum DailyMinMax {
  minTemperature = 'minTemperature',
  maxTemperature = 'maxTemperature',
}

export type WeatherProperties = WeatherProperty | DailyMinMax;

export interface propertyValues {
  values: PropertyDataPoint[];
};

export interface PropertyDataPoint {
  validTime: string;
  value: number;
};

export type WeatherPropertyData = {
  [Property in WeatherProperties]: propertyValues;
};

export type GridWeatherValue = Partial<Record<WeatherProperties, number>>;

export type GridTimePoint = Record<string, GridWeatherValue>;
