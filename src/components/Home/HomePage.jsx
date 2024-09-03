import videoHomepage from '../../assets/videos/video-homepage.mp4';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

function HomePage({ props }) {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="homepage-container container">
            <div className="homepage-header">
                <video autoPlay muted loop>
                    <source src={videoHomepage} type="video/mp4" />
                </video>
                <div className="homepage-content">
                    <h2>{t('homepage.title1')}</h2>
                    <p>{t('homepage.description')}</p>
                    {isAuthenticated === false ? (
                        <button className="btn btn-dark" onClick={() => navigate('/login')}>
                            {t('homepage.btnStarted')}
                        </button>
                    ) : (
                        <button className="btn btn-dark" onClick={() => navigate('/users')}>
                            {t('homepage.btnDoingQuiz')}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
