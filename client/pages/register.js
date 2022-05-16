import Meta from '../components/Meta';
import styles from '../styles/Home.module.css';

export default function Register() {
  return (
    <>
      <Meta title="Attendizer" />

      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Attendizer</h1>

          <form action="/placeholder" method="post">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" className={styles.input} />
            <label for="osis">OSIS</label>
            <input
              type="number"
              id="osis"
              name="osis"
              className={styles.input}
            />
            <label for="uid">UID</label>
            <input
              type="number"
              id="uid"
              name="uuid"
              className={styles.input}
            />
            <button type="submit">Submit</button>
          </form>

          <a href="/">Back to Home</a>
        </main>
      </div>
    </>
  );
}
