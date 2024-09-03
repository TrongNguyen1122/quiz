import { FloatingLabel, Form } from 'react-bootstrap';
import './AddAnswers.scss';
import Tippy from '@tippyjs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleMinus, faCirclePlay, faCirclePlus, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
function AddAnswers({ dataAnswer, questionId, handleDataAnswer, listAnswer, listquestion, setListQuestion }) {
    const { t } = useTranslation();
    const handleOnchange = (type, value) => {
        let listquestionClone = _.cloneDeep(listquestion);
        let index = listquestionClone.findIndex((item) => item.id === questionId);
        if (index > -1) {
            listquestionClone[index].answers = listquestionClone[index].answers.map((answer) => {
                if (answer.id === dataAnswer.id) {
                    if (type === 'CHECKBOX') {
                        answer.isCorrect = value;
                        console.log(answer.isCorrect);
                    } else if (type === 'INPUT') {
                        answer.description = value;
                    }
                }
                return answer;
            });
            setListQuestion(listquestionClone);
        }
    };
    return (
        <div className="add-answers-container m-2">
            <Form.Check // prettier-ignore
                className="mx-2 fs-4"
                type={'checkbox'}
                checked={dataAnswer.isCorrect}
                onChange={(e) => handleOnchange('CHECKBOX', e.target.checked)}
            />
            <div className="col-7">
                <FloatingLabel
                    className="lb-floating"
                    controlId="floatingInputGrid"
                    label={t('admin.questions.answers')}
                >
                    <Form.Control
                        type="text"
                        placeholder=""
                        value={dataAnswer.description}
                        onChange={(e) => handleOnchange('INPUT', e.target.value)}
                    />
                </FloatingLabel>
            </div>
            <div className="control-add-qus">
                <Tippy content={t('admin.tippy.add')}>
                    <i className="fs-4 text-primary mx-3" onClick={() => handleDataAnswer('ADD', '')}>
                        <FontAwesomeIcon icon={faCirclePlus} />
                    </i>
                </Tippy>
                {listAnswer && listAnswer.length > 1 && (
                    <Tippy content={t('admin.tippy.delete')}>
                        <i className="subtract-ans fs-4" onClick={() => handleDataAnswer('DELETE', dataAnswer.id)}>
                            <FontAwesomeIcon icon={faCircleMinus} />
                        </i>
                    </Tippy>
                )}
            </div>
        </div>
    );
}

export default AddAnswers;
