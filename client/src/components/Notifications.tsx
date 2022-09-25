import { useState } from "react";
import Toast from "react-bootstrap/Toast";

type Tnotify = {
  date: string;
  body: string;
};

function Notification(props: Tnotify) {
  const [showNotification, setShowNotification] = useState(true);
  const toggleShowNotification = () => setShowNotification(!showNotification);
  setTimeout(() => {
    setShowNotification(false);
  }, 10000);

  return (
    <Toast show={showNotification} onClose={toggleShowNotification}>
      <Toast.Header closeButton={true}>
        <strong className="me-auto">System</strong>
        <small>{props.date}</small>
      </Toast.Header>
      <Toast.Body>{props.body}</Toast.Body>
    </Toast>
  );
}

export default Notification;
