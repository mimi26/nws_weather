import { getGridPointUrl } from "@/app/lib/data";
import styles from "@/app/page.module.css";
import { Suspense } from "react";
import GridContainer from "./ui/grid-container";

export default async function Page() {
  const weatherDataUrl = await getGridPointUrl();
  return (
    <main className={styles.page}>
      <Suspense fallback={<div>Loading...</div>}>
        <GridContainer url={weatherDataUrl}></GridContainer>
      </Suspense>
    </main>
  );
}
