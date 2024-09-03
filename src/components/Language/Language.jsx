import { useSelector } from 'react-redux';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAsia } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function Language() {
    const [title, setTitle] = useState('');
    const { t, i18n } = useTranslation();
    const account = useSelector((state) => state.user.account);

    const typeLanguage = [
        {
            code: 'en',
            language: 'English',
        },
        {
            code: 'vi',
            language: 'Việt Nam',
        },
    ];

    useEffect(() => {
        typeLanguage.map((item) => {
            return item.code === i18n.language ? setTitle(item.language) : setTitle('English');
        });
    }, [i18n.language]);

    const handleChangeLanguage = (code) => {
        i18n.changeLanguage(code);
    };

    return (
        <div>
            <Tippy
                placement="left-start"
                interactive
                render={(attrs) => (
                    <div className="box" tabIndex="-1" {...attrs}>
                        <div className="popup-user">
                            <div className="popup-item" onClick={() => handleChangeLanguage('en')}>
                                English
                            </div>
                            <div className="popup-item" onClick={() => handleChangeLanguage('vi')}>
                                Việt Nam
                            </div>
                        </div>
                    </div>
                )}
            >
                <div className="popup-item">
                    <i className="me-1" style={{ color: '#605c5c' }}>
                        <FontAwesomeIcon icon={faEarthAsia} />
                    </i>
                    {title}
                </div>
            </Tippy>
        </div>
    );
}

export default Language;
