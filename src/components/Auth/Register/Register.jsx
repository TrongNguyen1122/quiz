import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import '../Auth.scss';
import { faCircleCheck, faEnvelope, faLock, faShield, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import * as userServices from '../../../services/userServices';
import { toast } from 'react-toastify';

import validator from './validator';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        validator({
            form: '#form-register',
            formGroupSelector: '.login-form-group',
            errorSelector: '.mess',
            rules: [
                validator.isRequired('#inputEmail', 'Please enter this field'),
                validator.isEmail('#inputEmail', 'Please enter a valid email'),
                validator.isRequired('#inputPassword', 'Please enter this field'),
                validator.minLength('#inputPassword', 6, 'Password must be more than 6 characters'),
                validator.isRequired('#inputConfirmPassword', 'Please enter this field'),
                validator.isConfirmed(
                    '#inputConfirmPassword',
                    function () {
                        return document.querySelector('#form-register #inputPassword').value;
                    },
                    'Password does not match',
                ),
            ],
            onSubmit: function (data) {
                if (data) {
                    handleSignin();
                }
            },
        });
    }, [email, password, confirmPassword]);

    const handleSignin = async () => {
        try {
            let res = await userServices.postRegister(email, password, username);
            if (res && res.EC === 0) {
                toast.success(res.EM);
                navigate('/login');
            }
            if (res && res.EC !== 0) {
                toast.error(res.EM);
            }
        } catch (error) {}
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
                    <span>Already have an account? </span>
                    <button className="btn btn-primary mx-1" onClick={() => navigate('/login')}>
                        Log in
                    </button>
                </div>
            </header>
            <form id="form-register" className="login-body mx-auto mt-3 ">
                <h2 className="login-title text-center">Sign up</h2>
                <p className="text-center p-1">Start your journey?</p>
                <div className="login-form-group">
                    <label htmlFor="inputEmail" className="login-label form-label">
                        <i>
                            <FontAwesomeIcon icon={faEnvelope} />
                        </i>
                        Email (*):
                    </label>
                    <input
                        type="text"
                        placeholder="Enter email..."
                        id="inputEmail"
                        name="inputEmail"
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
                        Password (*):
                    </label>
                    <input
                        type="password"
                        placeholder="Enter password..."
                        id="inputPassword"
                        name="inputPassword"
                        className="form-control border-secondary"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <span className="mess"></span>
                </div>
                <div className="login-form-group">
                    <label htmlFor="inputConfirmPassword" className="login-label form-label">
                        <i>
                            <FontAwesomeIcon icon={faShield} />
                        </i>
                        Confirm Password (*):
                    </label>
                    <input
                        type="password"
                        placeholder="Confirm password..."
                        id="inputConfirmPassword"
                        name="inputConfirmPassword"
                        className="form-control border-secondary"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></input>
                    <span className="mess"></span>
                </div>
                <div className="login-form-group">
                    <label htmlFor="inputUsername" className="login-label form-label">
                        <i>
                            <FontAwesomeIcon icon={faUserCircle} />
                        </i>
                        Username:
                    </label>
                    <input
                        type="text"
                        placeholder="Enter password..."
                        id="inputUsername"
                        name="inputUsername"
                        className="form-control border-secondary"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    ></input>
                    <span className="mess"></span>
                </div>
                <button type="submit" className="btn-submit btn btn-dark my-4 p-2">
                    Sign in to QUIZ
                </button>
            </form>
        </div>
    );
}

export default Register;
