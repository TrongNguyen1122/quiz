import './Home.scss';
import videoHomepage from '../../assets/videos/video-homepage.mp4';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import SliderQuiz from './SliderQuiz/SliderQuiz';

function HomePage({ props }) {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="homepage-container container">
            <div className="homepage-carousel">
                <SliderQuiz />
                <div className="mt-3">
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
            <div className="homepage-video row">
                <div className="col-lg-6 col-md-6 d-flex justify-content-center">
                    <video autoPlay muted loop>
                        <source src={videoHomepage} type="video/mp4" />
                    </video>
                </div>
                <div className="homepage-content col-lg-6 col-md-6">
                    <h2>{t('homepage.title1')}</h2>
                    <p>{t('homepage.description')}</p>
                </div>
            </div>
            <div className="homepage-"></div>
        </div>
    );
}

export default HomePage;
