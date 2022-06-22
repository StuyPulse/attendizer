import Button from 'react-bootstrap/Button';
import StudentEntryModal from './StudentEntryModal';
import { useState } from 'react';

export default function StudentEntry(props) {
  const [show, setShow] = useState(false);
  const showModal = () => setShow(true);
  const closeModal = () => setShow(false);

  return (
    <tr id={props.id}>
      <td>{props.name}</td>
      <td>{props.osis}</td>
      <td>{props.uid}</td>

      <td>
        <Button variant="outline-primary" onClick={showModal}>
          Edit
        </Button>
        {/* Generates a modal for every student (kinda inefficient) */}
        <StudentEntryModal
          show={show}
          closeModal={closeModal}
          student={props}
        />
      </td>
    </tr>
  );
}
