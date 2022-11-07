import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function MeetingDeleteModal(props) {
    const { show, closeModal, refresh, formStates, key } = props;
    const deleteAction = async (e) => {
        e.preventDefault();
        const url = process.env.DEL_MEETING_URL;
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              meetingId: formStates.meetingId,
              key: key
            })
        });

        const body = await res.json()

        if(res.ok){
          console.log(res.body);
        } else {
          formStates.setError([...formStates.error, body.message]);
        }

        refresh();
        closeModal();
    }
    return (
        <Modal show={show} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Meeting</Modal.Title>
            </Modal.Header>
            <Modal.Body closeButton>
                Are you sure you want to delete this meeting?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={closeModal}>No</Button>
                <Button variant="danger" onClick={deleteAction}>Yes</Button>
            </Modal.Footer>
        </Modal>
    )
}