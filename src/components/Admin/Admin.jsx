import SideBar from './SideBar';
import './Admin.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Menu from '../Header/Menu/Menu';
function Admin() {
    const [colapsed, setColapsed] = useState(true);

    const handleToggle = () => {
        setColapsed(!colapsed);
    };

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar colapsed={colapsed} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <div className="admin-toggle-sidebar" onClick={() => handleToggle()}>
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                    <Menu />
                </div>
                <div className="admin-main">
                    <Outlet />
                </div>
            </div>

            {/* Same as */}
        </div>
    );
}

export default Admin;
