// Displays the ___ scanned in at ____ on the scan in page.
// Takes a props object with a name and time.

export default function ScanEntry(props) {
  return (
    <p style={{ margin: '2px' }}>
      <b>{props.name}</b> swiped in at <b>{props.time}</b>
    </p>
  );
}
