import { geocodeLocation, getLocationFromHeaders } from '@/app/lib/data';
import styles from '@/app/page.module.css';
import { Suspense } from 'react';
import LocationContainer from '@/app/ui/location-container';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  let lat;
  let lon;
  let location;

  if ((await searchParams) && (await searchParams).location) {
    const loc = (await searchParams).location;
    const resp = await geocodeLocation(loc as string);
    lat = resp?.lat;
    lon = resp?.long;
    location = resp?.location;
  } else {
    const response = await getLocationFromHeaders();

    lat = response.lat;
    lon = response.lon;
    location = response.location;
  }

  return (
    <main className={styles.page}>
      <Suspense fallback={<div>Loading...</div>}>
        <LocationContainer
          location={location as string}
          lat={lat}
          lon={lon}
        ></LocationContainer>
      </Suspense>
    </main>
  );
}
