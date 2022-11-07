import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function StudentEntryModal(props) {
  const { show, closeModal, action, refresh, formStates, key } = props;

  const saveAction = async (e) => {
    e.preventDefault();

    // Choose the corresponding URL for the action Add or Edit
    // const url = action === 'Add' ? process.env.REG_URL : process.env.EDIT_URL;
    const url = action === 'Edit' ? process.env.EDIT_URL : process.env.REG_URL;

    // Send a POST request to the server
    const studentObject = {
      name: formStates.name,
      osis: formStates.osis,
      uid: formStates.uid
    };

    if (action === 'Edit') {
      studentObject.id = formStates.id;
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ students: [studentObject], key: key })
    });

    const body = await res.json()

    // Update table
    refresh();

    if (res.ok) {
      // Clear form
      formStates.setName('');
      formStates.setOsis('');
      formStates.setUid('');

      // Close the modal
      closeModal();
    } else {
      formStates.setError([...formStates.error, body.message]);
    }
  };

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
              value={formStates.name}
              onChange={(e) => formStates.setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="osis">
            <Form.Label>OSIS</Form.Label>
            <Form.Control
              type="number"
              value={formStates.osis}
              onChange={(e) => formStates.setOsis(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="uid">
            <Form.Label>UID</Form.Label>
            <Form.Control
              type="number"
              value={formStates.uid}
              onChange={(e) => formStates.setUid(e.target.value)}
            />
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
