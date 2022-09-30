import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function StudentDeleteModal(props) {
    const { show, closeModal, refresh, formStates } = props;
    const deleteAction = async (e) => {
        e.preventDefault();
        const url = process.env.DEL_URL;
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: formStates.id }),
        });
        console.log(res.body);

        refresh();
        closeModal();
    }
    return (
        <Modal show={show} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Student</Modal.Title>
                <Modal.Body>
                    Are you sure you want to delete this student?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={closeModal}>No</Button>
                    <Button variant="danger" onClick={deleteAction}>Yes</Button>
                </Modal.Footer>
            </Modal.Header>
        </Modal>
    )
}