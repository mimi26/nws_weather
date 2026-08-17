import { getGridPointUrl, getLocationFromHeaders } from '@/app/lib/data';
import styles from '@/app/page.module.css';
import { Suspense } from 'react';
import GridContainer from '@/app/ui/grid-container';

export default async function Page() {
  const { lat, lon, location } = await getLocationFromHeaders();
  const weatherDataUrl = await getGridPointUrl(lat, lon);

  return (
    <main className={styles.page}>
      <Suspense fallback={<div>Loading...</div>}>
        <GridContainer url={weatherDataUrl} location={location}></GridContainer>
      </Suspense>
    </main>
  );
}
