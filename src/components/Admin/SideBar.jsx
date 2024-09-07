import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

function SideBar({ colapsed }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <>
            <Sidebar collapsed={colapsed}>
                <Menu
                    className="sidebar"
                    menuItemStyles={{
                        button: {
                            // the active class will be added automatically by react router
                            // so we can use it to style the active menu item
                            [`&.active`]: {
                                backgroundColor: '#13395e',
                                color: '#b6c8d9',
                            },
                        },
                    }}
                >
                    <p onClick={() => navigate('/')} className="sidebar-header">
                        QUIZ
                    </p>
                    <MenuItem component={<Link to="dashboard" />}>
                        <i>
                            <FontAwesomeIcon icon={faChartLine} />
                        </i>
                        {t('admin.sidebar.dashboard')}
                    </MenuItem>
                    <SubMenu
                        label={
                            <>
                                <i>
                                    <FontAwesomeIcon icon={faNetworkWired} />
                                </i>
                                {t('admin.sidebar.feature')}
                            </>
                        }
                    >
                        <MenuItem component={<Link to={'manage-users'} />}> {t('admin.users.title')}</MenuItem>
                        <MenuItem component={<Link to={'manage-quizzes'} />}>
                            {t('admin.quizzes.quizzes.title')}
                        </MenuItem>
                        <MenuItem component={<Link to={'manage-questions'} />}> {t('admin.questions.title')}</MenuItem>
                    </SubMenu>
                </Menu>
            </Sidebar>
        </>
    );
}

export default SideBar;
