import { WeatherPropertyData } from "@/app/lib/types";
import { headers } from 'next/headers';

export const getGridPointUrl = async (
  lat = '40.64199314201601',
  long = '-73.97214963678621',
): Promise<string> => {  
  const point = `https://api.weather.gov/points/${lat},${long}`;

  let gridDataUrl;

  try {
    const response = await fetch(point);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    gridDataUrl = result?.properties?.forecastGridData;
  } catch (error: any) {
    console.error(error.message);
  }
  return gridDataUrl; // "https://api.weather.gov/gridpoints/OKX/35,39";
};

export const getRawForecast = async (
  gridDataUrl: string,
  shouldRefresh?: boolean,
): Promise<WeatherPropertyData | undefined> => {
  const cache: RequestInit | undefined = shouldRefresh ? { cache: 'no-store' } : undefined;

  try {
    const response = await fetch(gridDataUrl, cache);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const { properties } = await response.json();
    return { ...properties };
  } catch (e: any) {
    console.error(e.message);
  }
};

export async function getLocationFromHeaders() {
  const headersList = await headers();
  const userAgent = headersList.get('x-forwarded-for');
  const isDev = process.env.NODE_ENV === 'development';
  const ip = isDev ? '69.118.228.20' : userAgent;
  const data = await fetch(`http://ip-api.com/json/${ip}`);
  const { lat, lon, city, region } = await data.json();
  const location = `${city}, ${region}`;
  return { lat, lon, location };
}
