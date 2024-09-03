import { useEffect, useRef, useState } from 'react';
import AddQuestions from './AddQuestions/AddQuestions';
import './Questions.scss';
import Select from 'react-select';

import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import {
    getAllQuizForAdmin,
    postCreateNewQuestionForQuiz,
    postCreateNewAnswerForQuestion,
    getQuizWithQA,
    postUpsertQA,
} from '../../../../../services/quizServices';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

function Questions({ callUpdate }) {
    const initQuestion = [
        {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false,
                },
            ],
        },
    ];
    const [listquestion, setListQuestion] = useState(initQuestion);
    const [timeQuiz, setTimeQUiz] = useState(0);
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState([]);

    const refEndPage = useRef();
    //
    useEffect(() => {
        fetchApiQuizAll();
    }, []);

    useEffect(() => {
        if (callUpdate && !_.isEmpty(selectedQuiz)) {
            fetchApiQA();
        }
    }, [selectedQuiz]);

    const fetchApiQA = async () => {
        let res = await getQuizWithQA(selectedQuiz.value);
        if (res && res.EC === 0) {
            let newQA = [];
            let isTime = false;
            for (let i = 0; i < res.DT.qa.length; i++) {
                let q = res.DT.qa[i];

                //slipt time
                const parts = q.description.split('@#$');
                q.description = parts[0];
                if (parts.length > 1) {
                    setTimeQUiz(+parts[1]);
                    isTime = true;
                } else if (i === res.DT.qa.length - 1 && !isTime) {
                    setTimeQUiz(0);
                }

                //handle image to File
                if (q.imageFile) {
                    q.imageFile = await urltoFile(
                        `data:image/png;base64,${q.imageFile}`,
                        `image-${q.id}.png`,
                        'image/png',
                    );
                }
                newQA.push(q);
            }
            setListQuestion(newQA);
        }
    };

    function urltoFile(url, filename, mimeType) {
        return fetch(url)
            .then(function (res) {
                return res.arrayBuffer();
            })
            .then(function (buf) {
                return new File([buf], filename, { type: mimeType });
            });
    }

    const fetchApiQuizAll = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.name}`,
                };
            });
            setListQuiz(newQuiz);
        }
    };

    const handleSubmitQuestionForQuiz = async () => {
        //validate
        if (_.isEmpty(selectedQuiz)) {
            toast.error('Please choose a Quiz');
            return;
        }

        let isValid = true;
        let isValidQ = true;
        let indexQ = 0,
            indexA = 0;
        let countIsCorrect = 0;
        let checkIsCorrect = true;
        for (let i = 0; i < listquestion.length; i++) {
            countIsCorrect = 0;
            if (!listquestion[i].description) {
                isValidQ = false;
                indexQ = i;
                break;
            }
            for (let j = 0; j < listquestion[i].answers.length; j++) {
                if (!listquestion[i].answers[j].description) {
                    isValid = false;
                    indexA = j;
                    break;
                }
                if (listquestion[i].answers[j].isCorrect) {
                    countIsCorrect++;
                }
                if (j === listquestion[i].answers.length - 1 && countIsCorrect === 0) {
                    checkIsCorrect = false;
                    listquestion[i].isError = true;
                    indexA = j;
                    break;
                }
            }
            if (!isValid) {
                indexQ = i;
                break;
            }
            if (!checkIsCorrect) {
                indexQ = i;
                break;
            }
        }
        if (!isValidQ) {
            toast.error(`Not empty Question ${indexQ + 1}`);
            return;
        }
        if (!isValid) {
            toast.error(`Not empty Answer ${indexA + 1} at Question ${indexQ + 1}`);
            return;
        }

        if (countIsCorrect === 0) {
            toast.error(`Not check correct Answer at Question ${indexQ + 1}`);
            return;
        }
        console.log(timeQuiz);
        if (+timeQuiz === 0) {
            toast.error(`Set time for the QUIZ`);
            return;
        }

        if (callUpdate) {
            let questionsClone = _.cloneDeep(listquestion);
            questionsClone[0].description = questionsClone[0].description + `@#$${timeQuiz}`;
            for (let i = 0; i < questionsClone.length; i++) {
                if (questionsClone[i].imageFile) {
                    questionsClone[i].imageFile = await toBase64(questionsClone[i].imageFile);
                } else {
                    questionsClone[i].imageFile = '';
                }
            }
            let res = await postUpsertQA({
                quizId: selectedQuiz.value,
                questions: questionsClone,
            });
            if (res && res.EC === 0) {
                toast.success(res.EM);
                fetchApiQA();
            } else {
                toast.error(res.EM);
            }

            return;
        }
        for (let index = 0; index < listquestion.length; index++) {
            const question = listquestion[index];
            if (index === 0) {
                question.description = question.description + `@#$${timeQuiz}`;
                console.log(question.description);
            }
            const q = await postCreateNewQuestionForQuiz(+selectedQuiz.value, question.description, question.imageFile);

            for (let answerIndex = 0; answerIndex < question.answers.length; answerIndex++) {
                const answer = question.answers[answerIndex];
                await postCreateNewAnswerForQuestion(answer.description, answer.isCorrect, q.DT.id);
            }
        }

        toast.success('Create questions and answers succed!');
        setListQuestion(initQuestion);
        setTimeQUiz(0);
    };

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const { t } = useTranslation();

    return (
        <div className="questions-container mx-1">
            {!callUpdate && <h3 className="qus-title">{t('admin.questions.title')} </h3>}

            <label className=" pb-2 ">{t('admin.questions.selectQuiz')} </label>
            <div className="select-quiz row d-flex align-items-center">
                <div className="col-5">
                    <Select
                        placeholder={t('admin.questions.selectQuiz')}
                        className="sl  p-0"
                        options={listQuiz}
                        onChange={(e) => setSelectedQuiz(e)}
                    />
                </div>
                <div className="col-4 d-flex align-items-center">
                    <label className="col-3">{t('admin.questions.time')}:</label>
                    <input
                        className="form-control mx-2"
                        type="number"
                        min={0}
                        value={timeQuiz}
                        placeholder="Minute..."
                        onChange={(e) => setTimeQUiz(e.target.value)}
                    />
                    <label>({t('admin.questions.minute')})</label>
                </div>
                <div className="col-3 d-flex justify-content-end">
                    {listquestion && listquestion.length > 0 && (
                        <button className=" btn btn-warning" onClick={() => handleSubmitQuestionForQuiz()}>
                            {t('admin.questions.btnSave')}
                        </button>
                    )}
                </div>
            </div>
            <div className="add-questions mt-1">
                {listquestion &&
                    listquestion.length > 0 &&
                    listquestion.map((qus, index) => (
                        <AddQuestions
                            key={index}
                            index={index}
                            dataQuestion={qus}
                            listquestion={listquestion}
                            setListQuestion={setListQuestion}
                            refEndPage={refEndPage}
                            callUpdate
                        />
                    ))}
                <div className="end-page" ref={refEndPage}></div>
            </div>
        </div>
    );
}

export default Questions;
