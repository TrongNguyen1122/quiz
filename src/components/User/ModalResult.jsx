import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';

function ModalResult({ show, setShow, data, setShowCorrectAnswers, handleShowCorrect }) {
    const handleClose = () => setShow(false);
    const { t } = useTranslation();
    const handleClickShowCorrect = () => {
        setShowCorrectAnswers(true);
        handleShowCorrect();
        setShow(false);
    };

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal backdrop="static" centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{t('quiz.result.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {t('quiz.result.totalQuestion')}
                        <b>{data?.countTotal}</b>
                    </div>
                    <div>
                        {t('quiz.result.totalCorrect')} <b>{data?.countCorrect}</b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={() => handleClickShowCorrect()}>
                        {t('quiz.result.btnShowCorrect')}
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('quiz.result.btnClose')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalResult;
