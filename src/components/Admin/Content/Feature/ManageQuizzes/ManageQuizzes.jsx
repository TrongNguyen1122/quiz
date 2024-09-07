import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ManageQuiz.scss';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import ModalQuiz from './ModalQuiz';
import TableQuiz from './TableQuiz/TableQuiz';

import { getAllQuizForAdmin } from '../../../../../services/quizServices';
import { Accordion, Tab, Tabs } from 'react-bootstrap';
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
                <Tabs defaultActiveKey="0" id="justify-tab-example" className="mb-3" justify>
                    <Tab eventKey="0" title={t('admin.quizzes.quizzes.title')}>
                        <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
                            <i className="pe-2">
                                <FontAwesomeIcon icon={faPlus} />
                            </i>
                            {t('admin.quizzes.quizzes.btnAddQuiz')}
                        </button>
                        <div className="quiz-list-detail">
                            <TableQuiz listQuiz={listQuiz} fetchApiQuizAll={fetchApiQuizAll} />
                        </div>
                    </Tab>
                    <Tab eventKey="1" title={t('admin.quizzes.assign.title')}>
                        <AssignQuiz />
                    </Tab>
                    <Tab eventKey="2" title={t('admin.quizzes.update.title')}>
                        <QuizQA />
                    </Tab>
                </Tabs>
            </div>
            <ModalQuiz show={showModal} setShow={setShowModal} fetchApiQuizAll={fetchApiQuizAll} />
        </>
    );
}

export default ManageQuiz;
