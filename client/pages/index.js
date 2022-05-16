import Meta from '../components/Meta';
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

          <form action="/placeholder" method="post">
            <input type="number" id="id" name="id" className={styles.input} />
            <button type="submit">Submit</button>
          </form>

          <a href="/register">Register Here</a>
        </main>
      </div>
    </>
  );
}
