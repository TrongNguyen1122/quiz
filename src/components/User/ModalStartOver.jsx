import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalStartOver({ show, setShow, handleConfirm }) {
    const handleClose = () => setShow(false);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Start Over</Modal.Title>
                </Modal.Header>
                <Modal.Body>The data will be refreshed, do you want to start over?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirm()}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalStartOver;
