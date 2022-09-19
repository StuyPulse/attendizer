export default function ScanEntry(props) {
  return (
    <p style={{ margin: '2px' }}>
      <b>{props.name}</b> swiped in at <b>{props.time}</b>
    </p>
  );
}
