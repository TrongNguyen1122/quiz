import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as userServices from '../../../../../services/userServices';
import { toast } from 'react-toastify';

function ModalDeleteUser({ show, setShow, infoUser, fetchApiListUsers }) {
    const handleClose = () => setShow(false);
    const handleDeleteUser = async () => {
        try {
            if (!!infoUser && !!infoUser.id) {
                console.log(infoUser.id);
                const res = await userServices.deleteUser(infoUser.id);
                if (res && res.EC === 0) {
                    toast.success(res.EM);
                    fetchApiListUsers();
                    handleClose();
                }
                if (res && res.EC !== 0) {
                    toast.error(res.EM);
                }
            }
        } catch (error) {}
    };

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal backdrop="static" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete the User?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure to delete this user.</p>
                    <p>
                        email = <b>{(infoUser && infoUser.email) || ''}</b>
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleDeleteUser()}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;
