import { useEffect, useRef, useState } from 'react';

import ErrorToast from '../components/ErrorToast';
import Form from 'react-bootstrap/Form';
import Meta from '../components/Meta';
import ScanEntry from '../components/ScanEntry';
import ToastContainer from 'react-bootstrap/ToastContainer';
import styles from '../styles/Home.module.css';

export default function Home() {
  // Value of the scan input field
  const [scanEntry, setScanEntry] = useState('');

  // The list of successful scans and errors displayed on the page
  const [scanEntries, setScanEntries] = useState([]);
  const [errorToasts, setErrorToasts] = useState([]);

  // Scroll to bottom of scan entries log when new entries are added
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [scanEntries]);

  const processScan = async (e) => {
    e.preventDefault();

    // Send a POST request to the server
    const res = await fetch(process.env.SCAN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scanEntry: scanEntry })
    });

    // Get the response body
    const body = await res.json();

    // Clear form
    setScanEntry('');

    // Display results
    if (res.ok) {
      setScanEntries([...scanEntries, body]);
    } else {
      setErrorToasts([...errorToasts, body.message]);
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

          <div className={styles.scanLog}>
            {scanEntries.map((entry, index) => (
              <ScanEntry key={index} name={entry.name} time={entry.time} />
            ))}

            <div ref={scrollRef} />
          </div>

          <Form onSubmit={processScan} className="p-3">
            <Form.Control
              type="number"
              value={scanEntry}
              onChange={(e) => setScanEntry(e.target.value)}
            />
          </Form>

          <ToastContainer position="top-end" className="p-3">
            {errorToasts.map((errorToast, index) => (
              <ErrorToast key={index} message={errorToast} />
            ))}
          </ToastContainer>
        </main>
      </div>
    </>
  );
}
