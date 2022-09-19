import Meta from '../components/Meta';
import styles from '../styles/Home.module.css';
import { useState } from 'react';

export default function Home() {
  const [scanEntry, setScanEntry] = useState('');

  const processScan = async (e) => {
    e.preventDefault();
    let hasError = false;

    try {
      const scanEntryBox = document.getElementById('scanEntryBox');
      const errorAlert = document.getElementById('errorAlert');
      const scanLog = document.getElementById('scanEntries');

      if (scanEntryBox.value.length != 9 && scanEntryBox.value.length != 13) {
        scanEntryBox.value = '';
        errorAlert.innerHTML = 'Invalid ID length!';
        return;
      }

      // makes POST request to /api/scan
      const body = { scanEntry };
      const res = await fetch('http://localhost:4000/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }).then((res) => res.json());

      if (res.hasOwnProperty('message')) {
        // ID invalid
        hasError = true;
        errorAlert.innerHTML = res.message;
      }

      if (hasError) return;

      // notifies user of success
      const newEntry = document.createElement('p');
      newEntry.innerHTML = `<b>${res.name}</b> swiped in at <b>${res.time}</b>`;
      newEntry.style.margin = '2px';
      scanLog.appendChild(newEntry);
      scanLog.scrollTop = scanLog.scrollHeight;

      // clears input field
      scanEntryBox.value = '';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Meta title="Attendizer" />

      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Attendizer</h1>

          <p className={styles.description}>
            Please swipe your student ID card!
          </p>

          <div id="errorAlert" className="alert alert-danger"></div>

          <div id="scanEntries" className={styles.scanLog}></div>

          <form id="scanForm" className={styles.form} onSubmit={processScan}>
            <input
              type="number"
              id="scanEntryBox"
              className={styles.input}
              value={scanEntry}
              onChange={(e) => setScanEntry(e.target.value)}
            />
            <button type="submit" className={styles.button}>
              Submit
            </button>
          </form>
        </main>
      </div>
    </>
  );
}
