import Button from 'react-bootstrap/Button';

// Display for each entry 
// This is in the admin panel, this is each student's box shown on start.

export default function StudentEntry(props) {
  const { id, name, osis, uid, show, showDelete } = props;

  let fullName = name.trim().split(" ");
  let firName = fullName[0];
  if(fullName[2]){
    firName += " " + fullName[1];
  }
  let lasName = fullName[fullName.length - 1];

  return (
    <tr>
      <td>{id}</td>
      <td>{lasName}</td>
      <td>{firName}</td>
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
