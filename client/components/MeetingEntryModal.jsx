import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function StudentEntryModal(props) {
  const { show, closeModal, action, refresh, formStates } = props;

  const saveAction = async (e) => {
    e.preventDefault();

    // Choose the corresponding URL for the action Add or Edit
    // const url = action === 'Add' ? process.env.REG_URL : process.env.EDIT_URL;
    const url = process.env.EDIT_URL;

    // Send a POST request to the server
    const meetingObject = {
      id: formStates.id,
      date: formStates.date
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ meeting: meetingObject })
    });

    const body = await res.json()

    // Update table
    refresh();

    if (res.ok) {
      // Close the modal
      closeModal();
    } else {
      formStates.setError([...formStates.error, body.message]);
    }
  };

  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{action} Meeting</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="id">
            <Form.Label>Student Stored ID</Form.Label>
            <Form.Control
              type="number"
              value={formStates.id}
              onChange={(e) => formStates.setId(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="date">
            <Form.Label>Meeting Date</Form.Label>
            <Form.Control
              type="text"
              value={formStates.date}
              onChange={(e) => formStates.setDate(e.target.value)}
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
