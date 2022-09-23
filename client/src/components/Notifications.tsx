import Toast from "react-bootstrap/Toast";
import ToastContainer, { ToastPosition } from "react-bootstrap/ToastContainer";
import { createContext, useState } from "react";

type Tnotify = {
  date: string;
  body: string;
};

function Notifications(props: Tnotify) {
  const [position, setPosition] = useState<ToastPosition | undefined>(
    "top-end"
  );
  const [showNotification, setShowNotification] = useState(true);
  const toggleShowNotification = () => setShowNotification(!showNotification);

  return (
    <ToastContainer className="p-3" position={position}>
      <Toast show={showNotification} onClose={toggleShowNotification}>
        <Toast.Header closeButton={true}>
          <strong className="me-auto">System</strong>
          <small>{props.date}</small>
        </Toast.Header>
        <Toast.Body>{props.body}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default Notifications;
