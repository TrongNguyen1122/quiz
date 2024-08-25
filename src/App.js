import './App.scss';
import Header from './components/Header/Header';
import { Outlet, Link } from 'react-router-dom';
function App() {
    return (
        <div className="app-container">
            <div className="header-container">
                <Header />
            </div>
            <div className="content-container"></div>
            <div className="sidenav-container"></div>
            <div className="app-content">
                <Outlet />
            </div>
        </div>
    );
}

export default App;
