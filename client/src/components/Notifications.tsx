import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
type toast = {
  showA: boolean;
  toggleShowA: () => void;
};

function Notifications(props: toast) {
  return (
    <ToastContainer className="p-3" position={"top-end"}>
      <Toast show={props.showA} onClose={props.toggleShowA}>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Bootstrap</strong>
          <small className="text-muted">just now</small>
        </Toast.Header>
        <Toast.Body>See? Just like this.</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default Notifications;
