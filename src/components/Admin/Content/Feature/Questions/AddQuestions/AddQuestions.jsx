import { FloatingLabel, Form } from 'react-bootstrap';
import './AddQuestions.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faImages, faSquarePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import AddAnswers from '../AddAnswers/AddAnswers';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
function AddQuestions({ dataQuestion, index, listquestion, setListQuestion, refEndPage, callUpdate }) {
    const [previewImage, setPreviewImage] = useState('');
    const [listAnswer, setListAnswer] = useState(dataQuestion?.answers);
    const { t } = useTranslation();
    const handleAddQuestion = () => {
        let listquestionClone = _.cloneDeep(listquestion);
        const newQuestion = {
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
        };
        listquestionClone.push(newQuestion);
        setListQuestion(listquestionClone);
        refEndPage.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleDeleteQuestion = () => {
        setListQuestion((prev) => {
            const data = prev.filter((item) => item.id !== dataQuestion.id);
            return data;
        });
    };

    const handleDataAnswer = (type, idAnswer) => {
        let listquestionClone = _.cloneDeep(listquestion);
        let index = listquestionClone.findIndex((item) => item.id === dataQuestion.id);

        //add
        if (type === 'ADD') {
            let data = {
                id: uuidv4(),
                description: '',
                isCorrect: false,
            };
            listquestionClone[index].answers.push(data);
            setListAnswer(listquestionClone[index].answers);
        }
        //delete
        else if (type === 'DELETE') {
            listquestionClone[index].answers = listquestionClone[index].answers.filter((ans) => ans.id !== idAnswer);
            setListAnswer(listquestionClone[index].answers);
        }
        setListQuestion(listquestionClone);
    };

    const handleOnchange = (type, value) => {
        switch (type) {
            case 'QUESTION':
                let questionsClone = _.cloneDeep(listquestion);
                let index = questionsClone.findIndex((item) => item.id === dataQuestion.id);
                if (index > -1) {
                    questionsClone[index].description = value;
                    setListQuestion(questionsClone);
                }
                break;

            default:
        }
    };

    const handleOnchangeFileQuestion = (e) => {
        let questionsClone = _.cloneDeep(listquestion);
        let index = questionsClone.findIndex((item) => item.id === dataQuestion.id);

        if (index > -1 && e?.target?.files[0]) {
            questionsClone[index].imageFile = e.target.files[0];
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
            setListQuestion(questionsClone);
        }
    };
    return (
        <>
            <div className="add-questions-container ">
                <label className="pt-1 pb-2">
                    {' '}
                    {t('admin.questions.titleAdd')} {index + 1}:
                </label>

                <div className="add-qus-header ">
                    <div className="col-6">
                        <FloatingLabel
                            className="lb-floating "
                            controlId="floatingInputGrid"
                            label={t('admin.questions.inputDescription')}
                        >
                            <Form.Control
                                type="text"
                                placeholder=""
                                value={dataQuestion.description}
                                onChange={(e) => handleOnchange('QUESTION', e.target.value)}
                            />
                        </FloatingLabel>
                    </div>
                    <div className="upload-img-qus ms-4 ">
                        <label htmlFor={`inputUploadImage${dataQuestion.id}`}>
                            <Tippy content={t('admin.tippy.uploadImage')}>
                                <i>
                                    <FontAwesomeIcon icon={faImages} />
                                </i>
                            </Tippy>
                        </label>
                        <input
                            type="file"
                            id={`inputUploadImage${dataQuestion.id}`}
                            hidden
                            onChange={(e) => handleOnchangeFileQuestion(e)}
                        />
                        <PhotoProvider maskOpacity={'0.5'}>
                            <PhotoView
                                src={
                                    callUpdate && dataQuestion.imageFile
                                        ? URL.createObjectURL(dataQuestion.imageFile)
                                        : previewImage
                                }
                            >
                                <button className="qus-show-image text-white bg-primary mx-3">
                                    <Tippy content={t('admin.tippy.previewImage')}>
                                        <i>
                                            <FontAwesomeIcon icon={faEye} />
                                        </i>
                                    </Tippy>
                                </button>
                            </PhotoView>
                        </PhotoProvider>
                    </div>
                    <div className="control-add-qus ">
                        <Tippy content={t('admin.tippy.add')}>
                            <i className="add text-primary me-2" onClick={() => handleAddQuestion()}>
                                <FontAwesomeIcon icon={faSquarePlus} />
                            </i>
                        </Tippy>
                        {listquestion && listquestion.length > 1 && (
                            <Tippy content={t('admin.tippy.delete')}>
                                <i className="subtract" onClick={() => handleDeleteQuestion()}>
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </i>
                            </Tippy>
                        )}
                    </div>
                </div>
                <div className="add-qus-content ">
                    {dataQuestion &&
                        dataQuestion.answers?.length > 0 &&
                        dataQuestion.answers.map((ans, idx) => (
                            <AddAnswers
                                key={idx}
                                questionId={dataQuestion.id}
                                dataAnswer={ans}
                                handleDataAnswer={handleDataAnswer}
                                listAnswer={listAnswer}
                                listquestion={listquestion}
                                setListQuestion={setListQuestion}
                            />
                        ))}
                </div>
            </div>
        </>
    );
}

export default AddQuestions;
