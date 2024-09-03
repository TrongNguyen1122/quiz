import './Header.scss';

import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import Menu from './Menu/Menu';

function Header() {
    const role = useSelector((state) => state.user.account.role);

    const { t } = useTranslation();

    return (
        <div className="header container">
            <nav className="navbar-header">
                <Link to={'/'} className="brand">
                    QUIZ
                </Link>
                <div className="navbar-list">
                    <Link className="item" to="/">
                        {t('header.home')}
                    </Link>
                    <Link className="item" to="/users">
                        {t('header.user')}
                    </Link>

                    {role === 'ADMIN' ? (
                        <Link className="item" to="/admin">
                            {t('header.admin')}
                        </Link>
                    ) : (
                        <></>
                    )}
                </div>
            </nav>
            <div className="header-user-container">
                <>
                    <Menu />
                </>
            </div>
        </div>
    );
}

export default Header;
