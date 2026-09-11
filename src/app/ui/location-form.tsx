'use client';

import { SubmitEvent } from 'react';
import Form from 'next/form';
import { useRouter } from 'next/navigation';
import styles from '@/app/page.module.css';
import formStyles from '@/app/styles/location-form.module.css';

export default function LocationForm() {
  const router = useRouter();

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const form = e.currentTarget;
    const location = new FormData(form).get('location');

    form.reset();

    if (typeof location === 'string' && location.trim()) {
      router.push(`/?location=${encodeURIComponent(location)}`);
    } else {
      router.push('/');
    }
  };

  return (
    <Form
      action=""
      className={styles['margin-element']}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="location"
        className={`${styles['padding-element']} ${formStyles['address-input']}`}
        placeholder="Address, Zip, City, State"
      />
      <button type="submit" className={styles['padding-element']}>
        Submit
      </button>
    </Form>
  );
}
