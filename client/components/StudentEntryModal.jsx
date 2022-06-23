import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function StudentEntryModal(props) {
  const { show, closeModal } = props;

  const updateStudent = () => {
    // TODO: Send req to server to update data

    // Update table
    props.refresh();

    // Close the modal
    closeModal();
  };

  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Student</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              defaultValue={props.student.name}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="osis">
            <Form.Label>OSIS</Form.Label>
            <Form.Control
              type="number"
              defaultValue={props.student.osis}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="uid">
            <Form.Label>UID</Form.Label>
            <Form.Control
              type="number"
              defaultValue={props.student.uid}
            ></Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={updateStudent}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
