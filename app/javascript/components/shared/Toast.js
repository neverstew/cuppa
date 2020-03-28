import React, {useState} from 'react';
import Toast from 'react-bootstrap/Toast'

const ToastNotification = ({message}) => {
  const [show, setShow] = useState(true);

  return (
    <Toast data-toast-visible={show} className="toast-notification" onClose={() => setShow(false)} show={show} delay={10000} autohide>
      <Toast.Header className="toast-notification__header">
        <strong className="mr-auto">Notification</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}

export default ToastNotification;
