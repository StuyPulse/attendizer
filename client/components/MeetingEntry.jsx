import Button from 'react-bootstrap/Button';

export default function MeetingEntry(props) {
  const { id, date, name, show, showDelete } = props;

  return (
    <tr>
      <td>{id}</td>
      <td>{date}</td>
      <td>{name}</td>

      <td>
        <Button id={id} variant="outline-primary" onClick={show}>
          Edit
        </Button>
      </td>
      <td>
        <Button id={id} variant="outline-danger" onClick={showDelete}>
          Delete Entry
        </Button>
      </td>
      <td>
        <Button id={id} variant="outline-danger" onClick={showDelete}>
          Delete Meeting
        </Button>
      </td>
    </tr>
  );
}
