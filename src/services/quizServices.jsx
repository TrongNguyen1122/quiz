import request from '../utils/httpRequest';

export const getQuizByUser = () => {
    return request.get('api/v1/quiz-by-participant');
};

export const getDataQuiz = (quizId) => {
    return request.get('api/v1/questions-by-quiz', {
        params: {
            quizId,
        },
    });
};

export const postSubmitQuiz = (data) => {
    return request.post(`api/v1/quiz-submit`, { ...data });
};

export const postCreateNewQuiz = (name, description, difficulty, image) => {
    const data = new FormData();
    data.append('name', name);
    data.append('description', description);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);
    let res = request.post('api/v1/quiz', data);
    return res;
};

export const getAllQuizForAdmin = () => {
    return request.get('api/v1/quiz/all');
};

export const putQuiz = (id, name, description, difficulty, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('name', name);
    data.append('description', description);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);
    let res = request.put('api/v1/quiz', data);
    return res;
};

export const deleteQuiz = (quizId) => {
    return request.delete(`api/v1/quiz/${quizId}`);
};

export const postCreateNewQuestionForQuiz = (quiz_id, description, image) => {
    const data = new FormData();
    data.append('quiz_id', quiz_id);
    data.append('description', description);
    data.append('questionImage', image);
    let res = request.post('api/v1/question', data);
    return res;
};

export const postCreateNewAnswerForQuestion = (description, correct_answer, question_id) => {
    return request.post('api/v1/answer', {
        description,
        correct_answer,
        question_id,
    });
};

export const postAssignQuiz = (quizId, userId) => {
    return request.post('api/v1/quiz-assign-to-user', {
        quizId,
        userId,
    });
};

export const getQuizWithQA = (quizId) => {
    return request.get(`api/v1/quiz-with-qa/${quizId}`);
};

export const postUpsertQA = (data) => {
    return request.post(`api/v1/quiz-upsert-qa`, { ...data });
};

export const getOverview = () => {
    return request.get(`api/v1/overview`);
};
