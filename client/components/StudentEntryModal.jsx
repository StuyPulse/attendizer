import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function StudentEntryModal(props) {
  const { show, closeModal, action, refresh, formStates } = props;

  const saveAction = async (e) => {
    e.preventDefault();

    // Choose the corresponding URL for the action Add or Edit
    const url = action === 'Add' ? process.env.REG_URL : 'edit link here';

    // Send a POST request to the server
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        students: [
          { name: formStates.name, osis: formStates.osis, uid: formStates.uid }
        ]
      })
    });

    // Update table
    refresh();

    // Clear form
    formStates.setName('');
    formStates.setOsis('');
    formStates.setUid('');

    // Close the modal
    closeModal();
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
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="osis">
            <Form.Label>OSIS</Form.Label>
            <Form.Control
              type="number"
              value={formStates.osis}
              onChange={(e) => formStates.setOsis(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="uid">
            <Form.Label>UID</Form.Label>
            <Form.Control
              type="number"
              value={formStates.uid}
              onChange={(e) => formStates.setUid(e.target.value)}
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
