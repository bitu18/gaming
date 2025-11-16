import axios from 'axios';

const httpRequest = axios.create({
    // baseURL: process.env.REACT_APP_BASE_URL,
    baseURL: 'http://localhost:3002/api', // Adjust if your server runs on a different port
    withCredentials: true,
});

// export const get = async (path, options = {}) => {
//     const response = await httpRequest.get(path, options);
//     return response.data;
// };

httpRequest.interceptors.response.use((response) => {
    return response;
});

export default httpRequest;
