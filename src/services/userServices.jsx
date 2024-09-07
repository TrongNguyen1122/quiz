import request from '../utils/httpRequest';
export const postCreateNewUser = (email, password, username, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    let res = request.post('api/v1/participant', data);
    return res;
};
export const putUser = (id, username, role, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    let res = request.put('api/v1/participant', data);
    return res;
};
export const getAllUsers = () => {
    return request.get('api/v1/participant/all');
};

export const deleteUser = (userId) => {
    return request.delete('api/v1/participant', { data: { id: userId } });
};

export const getUserPaginate = (page, limit) => {
    return request.get('api/v1/participant', {
        params: {
            page,
            limit,
        },
    });
};

export const userLogin = (email, password) => {
    return request.post('api/v1/login', { email, password });
};

export const postRegister = (email, password, username) => {
    return request.post('api/v1/register', { email, password, username });
};

export const logout = (email, refresh_token) => {
    return request.post('api/v1/logout', {
        email,
        refresh_token,
    });
};

export const updateProfile = (username, image) => {
    const data = new FormData();
    data.append('username', username);
    data.append('userImage', image);
    return request.post('api/v1/profile', data);
};

export const postChangePassword = (current_password, new_password) => {
    return request.post('/api/v1/change-password', {
        current_password,
        new_password,
    });
};

export const getHistory = () => {
    return request.get('api/v1/history');
};
