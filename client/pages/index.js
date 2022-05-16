import Meta from '../components/Meta';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Meta title="Attendizer" />

      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Attendizer</h1>
        </main>
      </div>
    </>
  );
}
