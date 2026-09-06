import Form from 'next/form';
import styles from '@/app/page.module.css';

export default function LocationForm() {
  return (
    <Form action="" className={styles['margin-element']}>
      <input
        type="text"
        name="location"
        className={styles['padding-element']}
      />
      <button type="submit" className={styles['padding-element']}>
        Submit
      </button>
    </Form>
  );
}
