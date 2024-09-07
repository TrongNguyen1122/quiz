import './Profile.scss';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { updateProfile } from '../../../../../services/userServices';
import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { doUpdateProfile } from '../../../../../redux/action/userAction';
function Profile() {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [username, setUsername] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [image, setImage] = useState('');

    const account = useSelector((state) => state.user.account);
    const dispatch = useDispatch();

    useEffect(() => {
        hanldeSetData();
    }, []);

    const hanldeSetData = async () => {
        let base64Image = account?.image;
        let cvImage = await urltoFile(`data:image/png;base64,${base64Image}`, `image${1}.png`, 'image/png');
        setEmail(account?.email || '');
        setUsername(account?.username || '');
        setPreviewImage(cvImage || '');
        setRole(account?.role || '');
        setImage(cvImage || '');
    };

    function urltoFile(url, filename, mimeType) {
        return fetch(url)
            .then(function (res) {
                return res.arrayBuffer();
            })
            .then(function (buf) {
                return new File([buf], filename, { type: mimeType });
            });
    }

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(event.target.files[0]);
            setImage(event.target.files[0]);
        } else {
            setPreviewImage();
        }
    };

    const handleUpdateUser = async () => {
        try {
            let res = await updateProfile(username, image);
            if (res && res.EC === 0) {
                toast.success(res.EM);
                let imageBase64 = await toBase64(image);
                let data = { username, image: imageBase64 };
                dispatch(doUpdateProfile(data));
            } else {
                toast.error(res.EM);
            }
        } catch (error) {}
    };
    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64String = reader.result.split(',')[1]; // Lấy phần sau dấu phẩy
                return resolve(base64String);
            };
            reader.onerror = (error) => reject(error);
        });
    return (
        <div>
            <div className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="inputEmail4" className="form-label">
                        Email
                    </label>
                    <input disabled type="email" className="form-control" id="inputEmail4" value={email} />
                </div>

                <div className="col-md-6">
                    <label htmlFor="username-profile" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="username-profile"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputState" className="form-label">
                        Role
                    </label>
                    <input disabled type="text" className="form-control" value={role} />
                </div>

                <div className="col-12">
                    <label htmlFor="labelUpload" className="label-upload">
                        <i>
                            <FontAwesomeIcon icon={faPlus} />
                        </i>
                        Upload File Image
                    </label>
                    <input type="file" hidden id="labelUpload" onChange={handleUploadImage} />
                </div>

                <div className="col-12">
                    <label className="image-preview">
                        {previewImage ? (
                            <PhotoProvider maskOpacity={0.6}>
                                <PhotoView src={URL.createObjectURL(previewImage)}>
                                    <img className="image" src={URL.createObjectURL(previewImage)} alt="preview"></img>
                                </PhotoView>
                            </PhotoProvider>
                        ) : (
                            <span>Preview Image</span>
                        )}
                    </label>
                </div>
                <div className="col-12">
                    <button className="btn btn-primary px-5" onClick={() => handleUpdateUser()}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
