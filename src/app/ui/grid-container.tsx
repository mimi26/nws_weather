'use client';
import styles from '@/app/styles/grid-container.module.css';
import { ReactNode } from 'react';

export default function GridContainer({ children }: { children: ReactNode }) {
  return (
    <div id="forecast-grid" className={styles['forecast-grid']}>
      {children}
    </div>
  );
}
