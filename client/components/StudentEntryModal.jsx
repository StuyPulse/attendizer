import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

export default function StudentEntryModal(props) {
  const { show, closeModal, action, refresh, student } = props;

  const saveAction = async (e) => {
    e.preventDefault();

    // Choose the corresponding URL for the action Add or Edit
    const url = action === 'Add' ? process.env.REG_URL : 'edit link here';

    // Send a POST request to the server
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        students: [{ name: nameValue, osis: osisValue, uid: uidValue }]
      })
    });

    // Update table
    refresh();

    // Clear form
    setNameValue('');
    setOsisValue('');
    setUidValue('');

    // Close the modal
    closeModal();
  };

  // Empty values if no student is passed in
  let name = '';
  let osis = '';
  let uid = '';

  // If a student is passed in, set the values to the student's values
  if (student !== undefined) {
    name = student.name;
    osis = student.osis;
    uid = student.uid;
  }

  // State variables for the form controls
  const [nameValue, setNameValue] = useState(name);
  const [osisValue, setOsisValue] = useState(osis);
  const [uidValue, setUidValue] = useState(uid);

  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{action} Student</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="osis">
            <Form.Label>OSIS</Form.Label>
            <Form.Control
              type="number"
              value={osisValue}
              onChange={(e) => setOsisValue(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="uid">
            <Form.Label>UID</Form.Label>
            <Form.Control
              type="number"
              value={uidValue}
              onChange={(e) => setUidValue(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={saveAction}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
