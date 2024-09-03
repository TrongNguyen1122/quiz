import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../ManageUsers/ManageUsers.scss';

import { Col, Form, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import * as quizServices from '../../../../../services/quizServices';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { toast } from 'react-toastify';
import _ from 'lodash';
function ModalQuiz({ show, setShow, fetchApiQuizAll, data, setData }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('EASY');
    const [previewImage, setPreviewImage] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        if (!_.isEmpty(data)) {
            setName(data.name || '');
            setDescription(data.description || '');
            setType(data.difficulty || '');

            const blob = base64ToBlob(data.image, 'image/png');
            const file = new File([blob], 'temp', { type: 'image/png' });

            setPreviewImage(URL.createObjectURL(file));
            setImage(file);
        }
    }, [data]);

    function base64ToBlob(base64, mimeType) {
        const byteCharacters = atob(base64);
        const byteNumbers = new Uint8Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        return new Blob([byteNumbers], { type: mimeType });
    }

    const handleClose = () => {
        handleClearData();
        if (!_.isEmpty(data)) setData({});
        setShow(false);
    };

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        } else {
            setPreviewImage();
        }
    };

    const handleSubmitQuiz = async () => {
        //validata
        if (!name || !description) {
            toast.error('Name/Description is required');
            return;
        }

        if (!_.isEmpty(data)) {
            const resEdit = await quizServices.putQuiz(data.id, name, description, type, image);
            if (resEdit && resEdit.EC === 0) {
                toast.success(resEdit?.EM);
                fetchApiQuizAll();
                handleClose();
            } else {
                toast.error(resEdit?.EM);
            }
            return;
        }

        const res = await quizServices.postCreateNewQuiz(name, description, type, image);
        if (res && res.EC === 0) {
            toast.success(res?.EM);
            fetchApiQuizAll();
            handleClose();
        } else {
            toast.error(res?.EM);
        }
    };

    const handleClearData = () => {
        setName('');
        setDescription('');
        setType('EASY');
        setImage('');
        setPreviewImage('');
    };

    return (
        <>
            <PhotoProvider maskOpacity={'0.5'}>
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{_.isEmpty(data) ? 'Add New Quiz' : 'Edit Quiz'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Form.Group>
                            </Row>

                            <Row className="mb-2">
                                <Form.Group as={Col}>
                                    <Form.Label>Quiz Type</Form.Label>
                                    <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
                                        <option value="EASY">EASY</option>
                                        <option value="MEDIUM">MEDIUM</option>
                                        <option value="HARD">HARD</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Upload File Image</Form.Label>

                                    <Form.Label htmlFor="labelUpload" className="label-upload ">
                                        <i>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </i>
                                        Upload
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
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => handleSubmitQuiz()}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </PhotoProvider>
        </>
    );
}

export default ModalQuiz;
