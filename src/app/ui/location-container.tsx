import GridContainer from '@/app/ui/grid-container';
import { Suspense } from 'react';
import { getGridPointUrl } from '@/app/lib/data';
import GridProperties from '@/app/ui/grid-properties';

export default async function LocationContainer({
  location,
  lat,
  lon,
}: {
  location: string;
  lat: string;
  lon: string;
}) {
  const weatherDataUrl = await getGridPointUrl(lat, lon);

  return (
    <Suspense>
      <GridContainer>
        <Suspense>
          <GridProperties url={weatherDataUrl} location={location} />
        </Suspense>
      </GridContainer>
    </Suspense>
  );
}
