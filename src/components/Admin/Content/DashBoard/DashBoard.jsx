import { ResponsiveContainer, Bar, BarChart, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import './DashBoard.scss';
import { getOverview } from '../../../../services/quizServices';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
function DashBoard(props) {
    const [dataOverview, setDataOverview] = useState([]);
    const [dataChart, setDataChart] = useState([]);
    const { t } = useTranslation();
    useEffect(() => {
        fetchDataOverview();
    }, []);

    const fetchDataOverview = async () => {
        let res = await getOverview();
        if (res && res.EC === 0) {
            setDataOverview(res.DT);

            //process data
            let Qz = 0,
                Qs = 0,
                As = 0,
                Us = 0;
            Qz = res?.DT?.others?.countQuiz ?? 0;
            Qs = res?.DT?.others?.countQuestions ?? 0;
            As = res?.DT?.others?.countAnswers ?? 0;
            Us = res?.DT?.users?.total ?? 0;
            const data = [
                { name: 'Quizzes', Qz },
                { name: 'Questions', Qs },
                { name: 'Answers', As },
                { name: 'Users', Us },
            ];
            setDataChart(data);
        }
    };

    return (
        <div className="dashboard-container container">
            <h3> {t('admin.dashboard.title')}</h3>
            <div className="content row">
                <div className="c-left col-6">
                    <div className="row">
                        <div className="col-6">
                            <div className="item">
                                <span className="item-title">{t('admin.dashboard.user')}</span>
                                <span className="item-description">
                                    {dataOverview?.users?.total ? dataOverview?.users?.total : 0}
                                </span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="item">
                                <span className="item-title">{t('admin.dashboard.quiz')}</span>
                                <span className="item-description">
                                    {dataOverview?.others?.countQuiz ? dataOverview?.others?.countQuiz : 0}
                                </span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="item">
                                <span className="item-title">{t('admin.dashboard.question')}</span>
                                <span className="item-description">
                                    {dataOverview?.others?.countQuestions ? dataOverview?.others?.countQuestions : 0}
                                </span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="item">
                                <span className="item-title">{t('admin.dashboard.answer')}</span>
                                <span className="item-description">
                                    {dataOverview?.others?.countAnswers ? dataOverview?.others?.countAnswers : 0}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="c-right col-6">
                    <ResponsiveContainer width={'100%'} height={'100%'}>
                        <BarChart width={600} height={300} data={dataChart}>
                            <XAxis dataKey={'name'} stroke="#8884d8" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Qz" fill="#8884d8" barSize={50} />
                            <Bar dataKey="Qs" fill="#82ca9d" barSize={50} />
                            <Bar dataKey="As" fill="#fcb12a" barSize={50} />
                            <Bar dataKey="Us" fill="#f42def" barSize={50} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;
