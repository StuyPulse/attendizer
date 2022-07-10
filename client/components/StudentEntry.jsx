import Button from 'react-bootstrap/Button';

export default function StudentEntry(props) {
  const { id, name, osis, uid, show } = props;

  return (
    <tr>
      <td>{name}</td>
      <td>{osis}</td>
      <td>{uid}</td>

      <td>
        <Button id={id} variant="outline-primary" onClick={show}>
          Edit
        </Button>
      </td>
    </tr>
  );
}
