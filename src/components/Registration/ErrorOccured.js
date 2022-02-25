import { Alert } from "react-bootstrap";
import { useState } from "react";

function ErrorOccured({ Error, Handle, variant }) {
  const [show, setShow] = useState(true);
  if (show) {
    return (
      <Alert variant= {variant || 'danger'} onClose={() => {Handle(false);setShow(false)}} dismissible>
        <Alert.Heading>{variant && variant === 'success' ? 'Voila!' : 'Oh snap! You got an error!'}</Alert.Heading>
        <p>{Error}</p>
      </Alert>
    );
  }
}

export default ErrorOccured;
