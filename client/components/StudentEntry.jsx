import Button from 'react-bootstrap/Button';

// Display for each entry 
// This is in the admin panel, this is each student's box shown on start.

export default function StudentEntry(props) {
  const { id, name, osis, uid, show, showDelete } = props;

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{osis}</td>
      <td>{uid}</td>

      <td>
        <Button id={id} variant="outline-primary" onClick={show}>
          Edit
        </Button>
      </td>
      <td>
        <Button id={id} variant="outline-danger" onClick={showDelete}>
          Delete
        </Button>
      </td>
    </tr>
  );
}
