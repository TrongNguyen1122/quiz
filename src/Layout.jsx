import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import ManageUsers from './components/Admin/Content/Feature/ManageUsers/ManageUsers';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import ManageQuizzes from './components/Admin/Content/Feature/ManageQuizzes/ManageQuizzes';
import Questions from './components/Admin/Content/Feature/Questions/Questions';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ListQuiz from './components/User/ListQuiz';
import DetailQuiz from './components/User/DetailQuiz/DetailQuiz';
import PrivateRoute from './routes/PrivateRoute';
import { Suspense } from 'react';

const NotFound = () => {
    return (
        <div className="container mt-3 alert alert-danger text-center">404.Not found data with your current URL</div>
    );
};

const Layout = () => {
    return (
        <Suspense fallback={<div>Loading ...</div>}>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route
                        path="users"
                        element={
                            <PrivateRoute>
                                <ListQuiz />
                            </PrivateRoute>
                        }
                    />
                </Route>
                <Route path="/quiz/:id" element={<DetailQuiz />} />

                <Route
                    path="/admin"
                    element={
                        <PrivateRoute admin>
                            <Admin />
                        </PrivateRoute>
                    }
                >
                    <Route path="manage-users" element={<ManageUsers />} />
                    <Route path="manage-quizzes" element={<ManageQuizzes />} />
                    <Route path="manage-questions" element={<Questions />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </Suspense>
    );
};

export default Layout;
