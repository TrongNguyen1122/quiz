import axios from 'axios';
import nProgress from 'nprogress';
import axiosRetry from 'axios-retry';
import { store } from '../redux/store';

nProgress.configure({
    showSpinner: false,
    trickleSpeed: 100,
});
const request = axios.create({
    baseURL: 'http://localhost:8081/',
});

axiosRetry(axios, {
    retries: 3,
    retryDelay: axiosRetry.linearDelay(),
});

const refreshAccessToken = async (refresh_token, email) => {
    const response = await request.post('api/v1/refresh-token', {
        refresh_token,
        email,
    });
    return response.data.access_token; // Giả định rằng response chứa access_token mới
};

// Add a request interceptor
request.interceptors.request.use(
    function (config) {
        const access_token = store?.getState()?.user?.account?.access_token;
        config.headers['Authorization'] = 'Bearer ' + access_token;
        nProgress.start();
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
request.interceptors.response.use(
    function (response) {
        nProgress.done();
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response && response.data ? response.data : response;
    },
    function (error) {
        let originalRequest = error.config;

        //token expired EC === -999
        if (error.response && error.response.data.EC === -999) {
            const account = store?.getState()?.user?.account;
            try {
                const newAccessToken = refreshAccessToken(account.refresh_token, account.email);

                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                return axios(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
    },
);

export default request;
