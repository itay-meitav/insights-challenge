import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
type toast = {
  showA: boolean;
  toggleShowA: () => void;
  content: string;
};

function Notifications(props: toast) {
  return (
    <ToastContainer className="p-3" position={"top-end"}>
      <Toast show={props.showA} onClose={props.toggleShowA}>
        <Toast.Header>
          <strong className="me-auto">System</strong>
          <small className="text-muted">just now</small>
        </Toast.Header>
        <Toast.Body>{props.content}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default Notifications;
