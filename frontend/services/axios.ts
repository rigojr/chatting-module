import axios from 'axios';

const axiosInstance = axios.create({
  'baseURL': "http://127.0.0.1:3500/" // FIXME: should be an .env variable.
});

export default axiosInstance;
