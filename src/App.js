import { useEffect } from 'react';
import './App.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { Outlet, Link, useLocation } from 'react-router-dom';
function App() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return (
        <>
            <div className="app-container container">
                <div className="header-container">
                    <Header />
                </div>
                <div className="content-container"></div>
                <div className="sidenav-container"></div>
                <div className="app-content">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default App;
