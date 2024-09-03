import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../Auth.scss';
import { useNavigate } from 'react-router-dom';
import { faCircleNotch, faEnvelope, faLock, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import * as userServices from '../../../services/userServices';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { doLogin } from '../../../redux/action/userAction';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        if (isLoading) return;
        try {
            setIsLoading(true);
            const isValidateEmail = validateEmail(email);
            if (!isValidateEmail) {
                toast.error('Invalid Email');
                return;
            }
            if (!password) {
                toast.error('Invalid Password');
                return;
            }

            const res = await userServices.userLogin(email, password);

            //success
            if (res && res.EC === 0) {
                dispatch(doLogin(res.DT));
                toast.success(res.EM);
                setIsLoading(false);
                navigate('/');
            }

            //error
            if (res && res.EC !== 0) {
                toast.error(res.EM);
                setIsLoading(false);
            }
        } catch (error) {}
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            );
    };

    const handleKeyDown = (e) => {
        if (e && e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className="container login-container">
            <header className="login-header">
                <h1
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    QUIZ
                </h1>
                <div>
                    <span>Don't have an account yet?</span>
                    <button className="btn btn-dark mx-1" onClick={() => navigate('/register')}>
                        Sign up
                    </button>
                </div>
            </header>
            <div id="form-login" className="login-body mx-auto mt-3 ">
                <h2 className="login-title text-center">Login</h2>
                <p className="text-center p-1">Hello, who's this?</p>
                <div className="login-form-group">
                    <label htmlFor="inputEmail" className="login-label form-label">
                        <i>
                            <FontAwesomeIcon icon={faEnvelope} />
                        </i>
                        Email:
                    </label>
                    <input
                        type="text"
                        placeholder="Enter email..."
                        id="inputEmail"
                        className="border-secondary form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                    <span className="mess"></span>
                </div>
                <div className="login-form-group">
                    <label htmlFor="inputPassword" className="login-label form-label">
                        <i>
                            <FontAwesomeIcon icon={faLock} />
                        </i>
                        Password:
                    </label>
                    <input
                        type="password"
                        placeholder="Enter password..."
                        id="inputPassword"
                        className="form-control border-secondary"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e)}
                    ></input>
                    <span className="mess"></span>
                </div>
                <div className="mt-3 forgot-password">Forgot password?</div>
                <button className="btn-submit btn btn-primary my-4 p-2" onClick={() => handleLogin()}>
                    <i hidden={!isLoading}>
                        <FontAwesomeIcon className="icon-loading" icon={faSpinner} />
                    </i>
                    <span>Login to QUIZ</span>
                </button>
            </div>
        </div>
    );
}

export default Login;
