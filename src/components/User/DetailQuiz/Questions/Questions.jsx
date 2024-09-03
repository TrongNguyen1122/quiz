import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Questions.scss';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import CountDown from './CountDown/CountDown';
import ModalStartOver from '../../ModalStartOver';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Questions({ dataQuiz, timeQuiz, onTimeUp, index, setIndex, setDataQuiz, dataQuizOrigin }) {
    const [showModalStartOver, setShowModalStartOver] = useState(false);
    const { t } = useTranslation();
    const handleClassNameForBtn = (indexBtn, question) => {
        let nameClass = 'question-btn';
        if (question && question.answers.length > 0) {
            let isSelected = question.answers.find((a) => a.isSelected === true);
            if (isSelected) {
                nameClass = 'question-btn done';
            }

            if (indexBtn === index) {
                nameClass = 'question-btn focus';
            }
        }
        return nameClass;
    };

    const handleClickQuestion = (index) => {
        setIndex(index);
    };

    const handleStartOver = () => {
        setShowModalStartOver(true);
    };

    const handleConfirm = () => {
        setIndex(0);
        setDataQuiz(dataQuizOrigin);
        setShowModalStartOver(false);
    };

    return (
        <>
            <div className="question-container">
                <div className="question-header">
                    <CountDown timeQuiz={timeQuiz} onTimeUp={onTimeUp} />
                </div>
                <div className="question-content">
                    {dataQuiz &&
                        dataQuiz.length > 0 &&
                        dataQuiz.map((item, index) => (
                            <div
                                key={index}
                                className={handleClassNameForBtn(index, item)}
                                onClick={() => handleClickQuestion(index)}
                            >
                                {index + 1}
                            </div>
                        ))}
                </div>
                <div className="question__start-over " onClick={() => handleStartOver()}>
                    <FontAwesomeIcon icon={faRotateLeft} />
                    <span className="ps-1 fs-5">{t('quiz.btnStartOver')}</span>
                </div>
            </div>
            <ModalStartOver show={showModalStartOver} setShow={setShowModalStartOver} handleConfirm={handleConfirm} />
        </>
    );
}

export default Questions;
