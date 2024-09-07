import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Footer.scss';
import { faFacebook, faGithub, faTiktok, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
function Footer() {
    const { t } = useTranslation();
    return (
        <div className="footer-container">
            <h3>QUIZ</h3>
            <div className="row">
                <div className="col-lg-6 col-md-6">
                    <p className="fs-4">{t('footer.info')}:</p>
                    <ul className="">
                        <li className="m-3 p-2">Email: nguyenluu2723@gmail.com</li>
                        <li className="m-3 p-2">{t('footer.phone')}: 0855 940 774</li>
                        <li className="m-3 p-2">{t('footer.address')}: Cà Mau</li>
                    </ul>
                </div>
                <div className="col-lg-6 col-md-6">
                    <p className="fs-4">{t('footer.social')}:</p>
                    <ul className=" d-flex gap-2 fs-2">
                        <li className="m-3 p-2">
                            <FontAwesomeIcon icon={faFacebook} />
                        </li>
                        <li className="m-3 p-2">
                            <FontAwesomeIcon icon={faTwitter} />
                        </li>
                        <li className="m-3 p-2">
                            <FontAwesomeIcon icon={faTiktok} />
                        </li>
                        <li className="m-3 p-2">
                            <FontAwesomeIcon icon={faGithub} />
                        </li>
                    </ul>
                </div>
                <div className="col-lg-6 col-md-6">
                    <ul>
                        <li className="m-3 p-2">{t('footer.tech')}</li>
                        <li className="m-3 p-2">{t('footer.intro')}</li>
                        <li className="m-3 p-2">{t('footer.member')}</li>
                    </ul>
                </div>
                <div className="col-lg-6 col-md-6">
                    <p className="fs-4">{t('footer.titleLogin')}</p>
                    <Link to={'/login'} className="btn btn-primary m-2 ">
                        {t('footer.btnLogin')}
                    </Link>
                    <Link to={'/register'} className="btn btn-secondary m-2">
                        {t('footer.btnSignup')}
                    </Link>
                </div>
                <div className="col-12 text-center text-secondary">© Copyright</div>
            </div>
        </div>
    );
}

export default Footer;
