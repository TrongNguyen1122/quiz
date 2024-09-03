import { useEffect, useState, useCallback } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getDataQuiz, postSubmitQuiz } from '../../../services/quizServices';
import _ from 'lodash';
import './DetailQuiz.scss';
import Answers from './Answers/Answers';
import Questions from './Questions/Questions';
import ModalResult from '../ModalResult';
import { useTranslation } from 'react-i18next';
const DetailQuiz = () => {
    const [dataQuiz, setDataQuiz] = useState([]);
    const [dataQuizOrigin, setDataQuizOrigin] = useState([]);

    const [index, setIndex] = useState(0);
    const [showModaResult, setShowModalResult] = useState(false);
    const [dataModalResult, setDataModalResult] = useState({});
    const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
    const [finish, setFinish] = useState(false);
    const params = useParams();
    const quizId = +params.id;
    const location = useLocation();

    const { t } = useTranslation();

    const [timeQuiz, setTimeQuiz] = useState(0);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = ''; // Trình duyệt sẽ hiển thị thông báo mặc định
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        const fetchDataQuiz = async () => {
            let isTime = false;
            const res = await getDataQuiz(quizId);
            if (res && res.EC === 0) {
                let raw = res.DT;
                let data = _.chain(raw)
                    .groupBy('id')
                    .map((value, key) => {
                        let answers = [];
                        let questionDescription;
                        let image = null;
                        value.forEach((item, index) => {
                            const parts = item.description.split('@#$');
                            item.description = parts[0];
                            if (parts.length > 1) {
                                setTimeQuiz(+parts[1] * 60);
                            }
                            if (index === 0) {
                                questionDescription = item.description;
                                image = item.image;
                            }
                            item.isSelected = false;
                            answers.push(item);
                        });
                        answers = _.orderBy(answers, ['id'], ['asc']);
                        return { questionId: key, answers, questionDescription, image };
                    })
                    .value();
                setDataQuiz(data);
                setDataQuizOrigin(data);
            }
        };
        fetchDataQuiz();
    }, [quizId]);
    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1) {
            setIndex((prev) => prev + 1);
        }
    };
    const handlePrev = () => {
        if (index - 1 < 0) {
            return;
        }
        setIndex((prev) => prev - 1);
    };

    const handleCheckbox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);

        let question = dataQuizClone.find((item) => {
            return +item.questionId === +questionId;
        });

        if (question && question.answers) {
            let newArrForItemIsSelected = question.answers.map((item) => {
                if (+item.answers.id === +answerId) {
                    item.isSelected = !item.isSelected;

                    //set isCorrect
                }
                return item;
            });
            question.answers = newArrForItemIsSelected;
        }

        let index = dataQuizClone.findIndex((item) => +item.questionId === +questionId);
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }
    };

    const handleShowCorrect = () => {
        const quizDataClone = _.cloneDeep(dataQuiz);
        quizDataClone?.forEach((question) => {
            question?.answers?.forEach((answer) => {
                answer.isCorrect = false;
                dataModalResult?.quizData?.forEach((result) => {
                    if (+question.questionId === +result.questionId) {
                        result?.systemAnswers?.forEach((itemSystem) => {
                            if (answer?.answers.id === itemSystem.id) {
                                answer.isCorrect = true;
                                return;
                            }
                        });
                    }
                });
            });
        });
        setIndex(0);
        setDataQuiz(quizDataClone);
    };

    const handleFinish = () => {
        let payload = { quizId, answers: [] };
        let arrAnswers = [];
        if (dataQuiz?.length > 0) {
            dataQuiz.forEach((question) => {
                let questionId = +question.questionId;
                let userAnswerId = [];

                question.answers.forEach((a) => {
                    if (a.isSelected) {
                        userAnswerId.push(a.answers.id);
                    }
                });

                arrAnswers.push({
                    questionId,
                    userAnswerId,
                });
            });
            payload.answers = arrAnswers;

            //submit api
            submitQuiz(payload);
            setFinish(true);
            setTimeQuiz(0);
        }
    };
    const submitQuiz = async (payload) => {
        const res = await postSubmitQuiz(payload);
        if (res && res.EC === 0) {
            setDataModalResult({
                countCorrect: res.DT.countCorrect,
                countTotal: res.DT.countTotal,
                quizData: res.DT.quizData,
            });
            setShowModalResult(true);
        } else {
        }
    };

    return (
        <>
            <nav className="m-4" aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to={'/'}>{t('header.home')}</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={'/users'}>{t('header.user')}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Quiz
                    </li>
                </ol>
            </nav>
            <div className="detail-quiz-container container">
                <div className="row">
                    <div className="  col-lg-8 col-md-8 col-sm-12 col-xs">
                        <div className="left-content">
                            <div className="answer-title">
                                <h4>Quiz: {location?.state?.quizTitle}</h4>
                                <hr />
                            </div>

                            <Answers
                                handleCheckbox={handleCheckbox}
                                index={index}
                                data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : ''}
                                showCorrectAnswers={finish}
                            />
                            <div className="answer-footer">
                                <button
                                    disabled={index > 0 ? false : true}
                                    className="btn btn-secondary"
                                    onClick={() => handlePrev()}
                                >
                                    {t('quiz.btnPrev')}
                                </button>
                                <button
                                    disabled={dataQuiz?.length <= index + 1 ? true : false}
                                    className="btn btn-primary"
                                    onClick={() => handleNext()}
                                >
                                    {t('quiz.btnNext')}
                                </button>
                                {!finish && (
                                    <button className="btn btn-warning" onClick={() => handleFinish()}>
                                        {t('quiz.btnFinish')}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs">
                        <div className="right-content">
                            <Questions
                                dataQuiz={dataQuiz}
                                index={index}
                                setIndex={setIndex}
                                timeQuiz={timeQuiz}
                                onTimeUp={handleFinish}
                                setDataQuiz={setDataQuiz}
                                dataQuizOrigin={dataQuizOrigin}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <ModalResult
                show={showModaResult}
                setShow={setShowModalResult}
                data={dataModalResult}
                setShowCorrectAnswers={setShowCorrectAnswers}
                handleShowCorrect={handleShowCorrect}
            />
        </>
    );
};

export default DetailQuiz;
