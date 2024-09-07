import './Profile.scss';
import { useTranslation } from 'react-i18next';
import { Tab, Tabs } from 'react-bootstrap';
import ProfileItem from './TabItem/Profile/Profile';
import ChangePassword from './TabItem/ChangePassword/ChangePassword';
import History from './TabItem/History/History';
function Profile() {
    const { t } = useTranslation();

    return (
        <div className="profile-container container">
            <Tabs defaultActiveKey="profile" transition={false} id="noanim-tab-example" className="mb-3">
                <Tab eventKey="profile" title="Profile">
                    <ProfileItem />
                </Tab>
                <Tab eventKey="change-password" title="Change Password">
                    <ChangePassword />
                </Tab>
                <Tab eventKey="history" title="history">
                    <History />
                </Tab>
            </Tabs>
        </div>
    );
}

export default Profile;
