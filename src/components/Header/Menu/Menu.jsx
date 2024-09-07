import './Menu.scss';

import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';
import MenuItem from '../MenuItem/MenuItem';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
function Menu() {
    // const [image, setImage] = useState('');
    const account = useSelector((state) => state.user.account);
    // useEffect(() => {
    //     setImage(account?.image || '');
    // }, [account]);
    return (
        <div>
            <Tippy
                interactive
                placement="bottom-end"
                render={(attrs) => (
                    <div className="box" tabIndex="-1" {...attrs}>
                        <MenuItem />
                    </div>
                )}
            >
                <div className="header-user">
                    <div className="header-username">{account.username}</div>
                    <div className="user-image">
                        {account.image ? (
                            <img src={`data:image/png;base64,${account.image}`} alt="avatar" />
                        ) : (
                            <i>
                                <FontAwesomeIcon icon={faUserCircle} />
                            </i>
                        )}
                    </div>
                </div>
            </Tippy>
        </div>
    );
}

export default Menu;
