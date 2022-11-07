import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function KeyModal(props) {
    const { show, closeModal, formStates } = props;

    return (
        <Modal show={show} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Key</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Control
                    type="text"
                    onChange={(e) => formStates.setKey(e.target.value)}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={closeModal}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
}