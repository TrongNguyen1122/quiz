import './Menu.scss';

import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import MenuItem from '../MenuItem/MenuItem';
import { useSelector } from 'react-redux';
function Menu() {
    const account = useSelector((state) => state.user.account);

    return (
        <div>
            <Tippy
                interactive
                placement="bottom"
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
