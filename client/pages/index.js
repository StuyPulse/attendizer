import { useState } from "react";
import Meta from '../components/Meta';
import styles from '../styles/Home.module.css';

export default function Home() {

  const [scanEntry, setScanEntry] = useState("");

  const processScan = async e => {
    e.preventDefault();
    try {
      // makes POST request to /api/scan
      const body = { scanEntry }
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }).then(res => res.json());

      const scanLog = document.getElementById("scanEntries")

      // notifies user of success
      let newEntry = document.createElement("p");
      newEntry.innerHTML = `<b>${res.name}</b> swiped in at <b>${new Date().toLocaleTimeString()}</b>`;
      newEntry.style.margin = "2px";
      scanLog.appendChild(newEntry);
      scanLog.scrollTop = scanLog.scrollHeight;

      // clears input field
      document.getElementById('scanEntryBox').value = ""

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Meta title="Attendizer" />

      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Attendizer</h1>

          <p className={styles.description}>
            Please swipe your student ID card!
          </p>

          <div id="scanEntries" className={styles.scanLog}></div>

          <form id="scanForm" className={styles.form} onSubmit={processScan}>
            <input
              type="number"
              id="scanEntryBox" 
              className={styles.input}
              value={scanEntry}
              onChange={e => setScanEntry(e.target.value)}
            />
            <button
              type="submit"
              className={styles.button}
            >
              Submit
            </button>
          </form>

          <a href="/register">Register Here</a>
        </main>
      </div>
    </>
  );
}
