import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import * as userServices from '../../../../../services/userServices';
import { toast } from 'react-toastify';

import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Col, Form, Row } from 'react-bootstrap';
import _ from 'lodash';

function ModalCreateUser({ show, setShow, fetchApiListUsers, infoUser = undefined, setInfoUser, setcurrentPage }) {
    const [titleModal, setTitleModal] = useState('Add New User ');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const handleClose = () => {
        setShow(false);
        handleClearData();
    };
    //value

    useEffect(() => {
        if (!_.isEmpty(infoUser)) {
            setTitleModal('Edit User');
            setEmail(infoUser.email || '');
            setUsername(infoUser.username || '');
            setRole(infoUser.role || '');
            setImage(infoUser.image || '');
            if (infoUser.image) setPreviewImage(`data:image/jpeg;base64,${infoUser.image}`);
        } else {
            handleClearData();
        }
    }, [infoUser]);

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        } else {
            setPreviewImage();
        }
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            );
    };

    const handleClearData = () => {
        setTitleModal('Add New User');
        setEmail('');
        setPassword('');
        setUsername('');
        setRole('USER');
        setImage('');
        setPreviewImage('');
        setInfoUser(undefined);
    };
    const handleSubmitCreateUser = async () => {
        //validate

        if (!!infoUser) {
            const res = await userServices.putUser(infoUser.id, username, role, image);
            if (res && res.EC === 0) {
                toast.success(res.EM);
                fetchApiListUsers();
                handleClose();
            }
            if (res && res.EC !== 0) {
                toast.error(res.EM);
            }
            return;
        }

        const isValidateEmail = validateEmail(email);
        if (!isValidateEmail) {
            toast.error('Invalid Email');
            return;
        }
        if (!password) {
            toast.error('Invalid Password');
            return;
        }

        //submit data
        let data = await userServices.postCreateNewUser(email, password, username, role, image);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            setcurrentPage(1);
            fetchApiListUsers();
            handleClose();
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    };
    return (
        <>
            <PhotoProvider maskOpacity={'0.5'}>
                <Modal
                    className="modal-add-user"
                    backdrop="static"
                    show={show}
                    onHide={handleClose}
                    animation={true}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">{titleModal}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        disabled={!!infoUser}
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        disabled={!!infoUser}
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="User name"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Role</Form.Label>
                                    <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
                                        <option value="USER">USER</option>
                                        <option value="ADMIN">ADMIN</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>

                            <Row>
                                <Form.Group as={Col}>
                                    <Form.Label htmlFor="labelUpload" className="label-upload">
                                        <i>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </i>
                                        Upload File Image
                                    </Form.Label>
                                    <input type="file" hidden id="labelUpload" onChange={handleUploadImage} />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col}>
                                    <Form.Label className="image-preview">
                                        {previewImage ? (
                                            <PhotoView src={previewImage}>
                                                <img src={previewImage} alt="preview"></img>
                                            </PhotoView>
                                        ) : (
                                            <span>Preview Image</span>
                                        )}
                                    </Form.Label>
                                </Form.Group>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={() => handleClose()}>
                            Close
                        </button>
                        <Button onClick={() => handleSubmitCreateUser()}>Save</Button>
                    </Modal.Footer>
                </Modal>
            </PhotoProvider>
        </>
    );
}

export default ModalCreateUser;
