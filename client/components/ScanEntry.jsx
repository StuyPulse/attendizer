import styles from '../styles/ScanEntry.module.css';

export default function ScanEntry(props) {
  return (
    <p className={styles.scanEntry}>
      <b>{props.name}</b> signed in at <b>{props.time}</b>
    </p>
  );
}
