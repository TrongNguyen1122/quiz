import _ from 'lodash';
import './Answers.scss';
import { memo } from 'react';
import { PhotoProvider, PhotoSlider, PhotoView } from 'react-photo-view';
function Answers({ data, index, handleCheckbox, showCorrectAnswers }) {
    const handleClickCheckbox = (event, aId, qId) => {
        handleCheckbox(aId, qId);
    };

    if (_.isEmpty(data)) {
        return <></>;
    }

    return (
        <div className="answer-content-container">
            <div className="answer-header">
                <div className="answer-image">
                    {data && data.image && (
                        <PhotoProvider>
                            <PhotoView src={`data:image/jpeg;base64,${data.image}`}>
                                <img
                                    className="img-question"
                                    src={`data:image/jpeg;base64,${data.image}`}
                                    alt="image-answer"
                                />
                            </PhotoView>
                        </PhotoProvider>
                    )}
                </div>
            </div>
            <div className="answer-content">
                <div className="answer-body-title">{data.questionDescription}</div>
                <div className="answer">
                    {data.answers &&
                        data?.answers?.length > 0 &&
                        data.answers.map((answer, index) => {
                            return (
                                <div key={`answer-${index}`} className="answer-item">
                                    <div className="form-check">
                                        <input
                                            disabled={showCorrectAnswers}
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={answer.isSelected || false}
                                            id={`flexCheckDefault${index}`}
                                            onChange={(e) => handleClickCheckbox(e, answer.answers.id, data.questionId)}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor={`flexCheckDefault${index}`}
                                            style={answer.isCorrect ? { color: 'green', fontWeight: '600' } : {}}
                                        >
                                            {answer.answers.description}
                                        </label>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default memo(Answers);
