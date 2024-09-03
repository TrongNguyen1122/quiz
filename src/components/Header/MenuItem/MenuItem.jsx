import './MenuItem.scss';

import {
    faAddressCard,
    faEarthAsia,
    faRightFromBracket,
    faUserCheck,
    faUserLock,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/userServices';
import { toast } from 'react-toastify';
import { doLogout } from '../../../redux/action/userAction';
import Language from '../../Language/Language';
import { useTranslation } from 'react-i18next';

function MenuItem({ data }) {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const navigate = useNavigate();
    const account = useSelector((state) => state.user.account);

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const handleLogOut = async () => {
        let res = await logout(account.email, account.refresh_token);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            dispatch(doLogout());
            navigate('/login');
        } else {
            toast.error(res.EM);
        }
    };
    return (
        <>
            <div className="popup-user">
                {<div className=" username-mobile">{account.username}</div>}
                <Language />
                {isAuthenticated ? (
                    <>
                        <div className="popup-item">
                            <i className="me-1" style={{ color: '#605c5c' }}>
                                <FontAwesomeIcon icon={faAddressCard} />
                            </i>
                            {t('header.popup.profile')}
                        </div>
                        <div className="popup-item " onClick={() => handleLogOut()}>
                            <i className="me-1" style={{ color: '#605c5c' }}>
                                <FontAwesomeIcon icon={faRightFromBracket} />
                            </i>
                            {t('header.popup.logout')}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="popup-item text-primary" onClick={() => navigate('/login')}>
                            <i className="me-1 text-primary" style={{ color: '#605c5c' }}>
                                <FontAwesomeIcon icon={faUserCheck} />
                            </i>
                            {t('header.popup.login')}
                        </div>
                        <div className="popup-item text-dark" onClick={() => navigate('/register')}>
                            <i className="me-1 text-dark" style={{ color: '#605c5c' }}>
                                <FontAwesomeIcon icon={faUserLock} />
                            </i>
                            {t('header.popup.signup')}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default MenuItem;
