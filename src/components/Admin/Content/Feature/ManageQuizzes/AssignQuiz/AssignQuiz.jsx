import { useEffect, useState } from 'react';
import { getAllQuizForAdmin, postAssignQuiz } from '../../../../../../services/quizServices';
import { getAllUsers } from '../../../../../../services/userServices';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
function AssignQuiz() {
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState([]);
    const { t } = useTranslation();
    const [listUser, setListUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState([]);
    useEffect(() => {
        fetchApiQuizAll();
        fetchUsers();
    }, []);

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
    const fetchUsers = async () => {
        let res = await getAllUsers();
        if (res && res.EC === 0) {
            let newUsers = res.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`,
                };
            });
            setListUser(newUsers);
        }
    };

    const handleAssign = async () => {
        let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value);

        if (res && res.EC === 0) {
            toast.success(res.EM);
        } else {
            toast.error(res.EM);
        }
    };
    return (
        <div className="assign-container row">
            <div className="select-quiz col-6">
                <label className="pt-2 pb-2">{t('admin.quizzes.assign.selectQuiz')}:</label>
                <Select
                    placeholder={t('admin.quizzes.assign.selectQuiz')}
                    className="sl"
                    options={listQuiz}
                    onChange={(e) => setSelectedQuiz(e)}
                />
            </div>
            <div className="select-user col-6">
                <label className="pt-2 pb-2">{t('admin.quizzes.assign.selectUser')}:</label>
                <Select
                    placeholder={t('admin.quizzes.assign.selectUser')}
                    className="sl"
                    options={listUser}
                    onChange={setSelectedUser}
                />
            </div>
            <div>
                <button className="btn btn-warning mt-3" onClick={() => handleAssign()}>
                    {t('admin.quizzes.assign.btnAssign')}
                </button>
            </div>
        </div>
    );
}

export default AssignQuiz;
