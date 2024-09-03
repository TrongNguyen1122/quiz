import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ManageQuiz.scss';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import ModalQuiz from './ModalQuiz';
import TableQuiz from './TableQuiz/TableQuiz';

import { getAllQuizForAdmin } from '../../../../../services/quizServices';
import { Accordion } from 'react-bootstrap';
import QuizQA from './QuizQA/QuizQA';
import AssignQuiz from './AssignQuiz/AssignQuiz';
import { useTranslation } from 'react-i18next';
function ManageQuiz() {
    const [showModal, setShowModal] = useState(false);
    const [listQuiz, setListQuiz] = useState([]);
    const { t } = useTranslation();
    useEffect(() => {
        fetchApiQuizAll();
    }, []);
    const fetchApiQuizAll = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            setListQuiz(res.DT);
        }
    };

    return (
        <>
            <div className="quiz-container">
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>{t('admin.quizzes.quizzes.title')}</Accordion.Header>
                        <Accordion.Body>
                            <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
                                <i className="pe-2">
                                    <FontAwesomeIcon icon={faPlus} />
                                </i>
                                {t('admin.quizzes.quizzes.btnAddQuiz')}
                            </button>
                            <div className="quiz-list-detail">
                                <TableQuiz listQuiz={listQuiz} fetchApiQuizAll={fetchApiQuizAll} />
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header> {t('admin.quizzes.assign.title')}</Accordion.Header>
                        <Accordion.Body>
                            <AssignQuiz />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>{t('admin.quizzes.update.title')}</Accordion.Header>
                        <Accordion.Body>
                            <QuizQA />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>

            <ModalQuiz show={showModal} setShow={setShowModal} fetchApiQuizAll={fetchApiQuizAll} />
        </>
    );
}

export default ManageQuiz;
