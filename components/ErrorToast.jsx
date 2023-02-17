import Toast from 'react-bootstrap/Toast';
import { useState } from 'react';

// Creates an error message using toast.
// Takes in a props object that contains a message.

export default function ErrorToast(props) {
  const [show, setShow] = useState(true);

  return (
    <Toast
      bg="danger"
      show={show}
      onClose={() => setShow(false)}
      delay={3000}
      autohide
    >
      <Toast.Header>
        <p className="me-auto text-dark">
          <strong>Error:</strong> {props.message}
        </p>
      </Toast.Header>
    </Toast>
  );
}
