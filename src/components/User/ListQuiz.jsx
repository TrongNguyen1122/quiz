import { useEffect, useState } from 'react';
import { getQuizByUser } from '../../services/quizServices';
import './ListQuiz.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
function ListQuiz() {
    const [arrQuiz, setArrQuiz] = useState([]);
    const navigate = useNavigate();
    const { t } = useTranslation();
    useEffect(() => {
        const getQuizData = async () => {
            const res = await getQuizByUser();
            if (res && res.EC === 0) {
                setArrQuiz(res.DT);
            }
        };
        getQuizData();
    }, []);

    return (
        <div className="list-quiz-container container">
            <div className="row">
                {arrQuiz &&
                    arrQuiz.length > 0 &&
                    arrQuiz.map((quiz, index) => (
                        <div key={index} className="col col-lg-3 col-md-4 col-sm-6 col-12 ">
                            <div className="card card-container">
                                <div className="wrapper-card-image">
                                    <img
                                        className="card-image card-img-top"
                                        src={`data:image/jpeg;base64,${quiz.image}`}
                                        alt="..."
                                    />
                                </div>
                                <div className="card-body">
                                    <p className="quiz-card-desc card-text">
                                        <span className="card-title">Quiz: </span>
                                        {quiz.description}
                                    </p>
                                    <button
                                        className="btn-card-submit btn btn-primary"
                                        onClick={() =>
                                            navigate(`/quiz/${quiz.id}`, { state: { quizTitle: quiz.description } })
                                        }
                                    >
                                        {t('quiz.btnStart')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                {arrQuiz && arrQuiz.length === 0 && <div>{t('quiz.titleNoQuiz')}</div>}
            </div>
        </div>
    );
}

export default ListQuiz;
