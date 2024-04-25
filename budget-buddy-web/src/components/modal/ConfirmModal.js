import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";

export default function ConfirmModal({show, onHide, question, action, actionColor, onAction}) {

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton/>
            <Modal.Body>
                <h4>{question}</h4>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Cancel</Button>
                <Button variant={actionColor} onClick={onAction}>{action}</Button>
            </Modal.Footer>
        </Modal>
    );
}