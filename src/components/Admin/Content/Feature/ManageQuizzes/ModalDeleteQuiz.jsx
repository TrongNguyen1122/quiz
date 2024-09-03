import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as quizServices from '../../../../../services/quizServices';
import { toast } from 'react-toastify';
import _ from 'lodash';

function ModalDeleteQuiz({ show, setShow, data, fetchApiQuizAll }) {
    const handleDeleteQuiz = async () => {
        try {
            if (!_.isEmpty(data)) {
                const res = await quizServices.deleteQuiz(data.id);
                if (res && res.EC === 0) {
                    toast.success(res.EM);
                    fetchApiQuizAll();
                    handleClose();
                }
                if (res && res.EC !== 0) {
                    toast.error(res.EM);
                }
            }
        } catch (error) {}
    };
    const handleClose = () => setShow(false);

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal backdrop="static" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete quiz?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure to delete this quiz.</p>
                    <p>
                        name = <b>{(data && data.name) || ''}</b>
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleDeleteQuiz()}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;
