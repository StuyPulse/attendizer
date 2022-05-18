import Meta from '../components/Meta';
import styles from '../styles/Home.module.css';

export default function Register() {
  return (
    <>
      <Meta title="Attendizer" />

      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Attendizer</h1>
          <br />
          <br />
          <br />

          <form action="/placeholder" method="post" className={styles.form}>
            <div className={styles.bars}>
              <label for="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className={styles.input}
              />
              <br />
              <label for="osis">OSIS</label>
              <input
                type="number"
                id="osis"
                name="osis"
                className={styles.input}
              />
              <br />
              <label for="uid">UID</label>
              <input
                type="number"
                id="uid"
                name="uuid"
                className={styles.input}
              />
              <br />
            </div>
            <button type="submit" className={styles.button}>
              Submit
            </button>
          </form>

          <a href="/">Back to Home</a>
        </main>
      </div>
    </>
  );
}
