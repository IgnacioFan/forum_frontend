import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'https://forum-express-api.herokuapp.com/api';

const axiosInstance = axios.create({
  // baseURL: 'https://sheltered-sea-38412.herokuapp.com/api',
  baseURL: baseUrl,
  // timeout: 1000,
  // headers: {'Access-Control-Allow-Origin': '*'},
  // responseType: 'json'
})

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if(token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      config.headers['Access-Control-Allow-Origin'] = '*';
    }
    return config;
  },
  err => Promise.reject(err)
);

export const apiHelper = axiosInstance;

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000
})

export const validateForm = (string) => {
  Toast.fire({
    icon: 'warning',
    title: `Cannot submit ${string}!`
  });
}
