import { useEffect, useState } from 'react';
import './ChangePassword.scss';
import validator from '../../../../Auth/Register/validator';

import { postChangePassword } from '../../../../../services/userServices';
import { toast } from 'react-toastify';
function ChangePassword() {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        validator({
            form: '#fm-change-passwrord',
            formGroupSelector: '.chpw-item',
            errorSelector: '.mess',
            rules: [
                validator.isRequired('#inputChangePw', 'Please enter this field'),
                validator.isRequired('#inputChangePwNew', 'Please enter this field'),
                validator.minLength('#inputChangePwNew', 6, 'Password must be more than 6 characters'),
                validator.isRequired('#inputChangePwCF', 'Please enter this field'),
                validator.isConfirmed(
                    '#inputChangePwCF',
                    function () {
                        return document.querySelector('#fm-change-passwrord #inputChangePwNew').value;
                    },
                    'Password does not match',
                ),
            ],
            onSubmit: function (data) {
                if (data) {
                    handleChangePassword();
                }
            },
        });
    }, [password, newPassword, confirmPassword]);

    const handleChangePassword = async () => {
        try {
            let res = await postChangePassword(password, newPassword);
            if (res && res.EC === 0) {
                toast.success(res.EM);
                setPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                toast.error(res.EM);
            }
        } catch (error) {}
    };

    return (
        <form id="fm-change-passwrord">
            <div className="change-password-group mt-5">
                <div className="col-md-6 chpw-item">
                    <label htmlFor="inputChangePw" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="inputChangePw"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="mess"></span>
                </div>

                <div className="col-md-6 mt-3 chpw-item">
                    <label htmlFor="inputChangePwNew" className="form-label">
                        New Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="inputChangePwNew"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <span className="mess"></span>
                </div>
                <div className="col-md-6 mt-3 chpw-item">
                    <label htmlFor="inputChangePwCF" className="form-label">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="inputChangePwCF"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <span className="mess"></span>
                </div>

                <div className="col-12 d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary px-5 mt-3">
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
}

export default ChangePassword;
