import Button from 'react-bootstrap/Button';

export default function Meeting(props) {
  const { id, date, attendees, showDelete } = props;

  return (
    <tr>
      <td>{id}</td>
      <td>{date}</td>
      <td>{attendees}</td>
      <td>
        <Button id={id} variant="outline-danger" onClick={showDelete}>
          Delete Meeting
        </Button>
      </td>
    </tr>
  );
}
