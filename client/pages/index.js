import Meta from '../components/Meta';
import ScanEntry from '../components/ScanEntry';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Meta title="Attendizer" />

      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Attendizer</h1>

          <p className={styles.description}>
            Please swipe your student ID card!
          </p>

          <div className={styles.scanEntriesBox}>
            <ScanEntry name="Name" time="12:00" />
            <ScanEntry name="Name" time="12:00" />
            <ScanEntry name="Name" time="12:00" />
            <ScanEntry name="Name" time="12:00" />
            <ScanEntry name="Name" time="12:00" />
            <ScanEntry name="Name" time="12:00" />
            <ScanEntry name="Name" time="12:00" />
            <ScanEntry name="Name" time="12:00" />
            <ScanEntry name="Name" time="12:00" />
            <ScanEntry name="Name" time="12:00" />
            <ScanEntry name="Name" time="12:00" />
            <ScanEntry name="Name" time="12:00" />
            <ScanEntry name="Name" time="12:00" />
          </div>

          <form action="/placeholder" method="post" className={styles.form}>
            <input type="number" id="id" name="id" className={styles.input} />
            <br />
            <button type="submit" className={styles.button}>
              Submit
            </button>
          </form>

          <a href="/register">Register Here</a>
        </main>
      </div>
    </>
  );
}
