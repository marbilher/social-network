import axios from "../axios/axiosConfig"
require('dotenv').config();


// const baseUrl = process.env.REACT_APP_API_URL + `/users`;
const baseUrl = 'http://localhost:8080/api/users'

export function login(userData) {
  const config = {
    method: "POST",
    data: userData
  };
  
  return axios(baseUrl + '/login', config)
      .then(responseSuccessHandler)
      .catch(responseErrorHandler);

}

export function registerNew(userData) {
    const config = {
      method: "POST",
      data: userData
    };
  
    return axios(baseUrl + '/register', config)
      .then(responseSuccessHandler)
      .catch(responseErrorHandler);
  }


  const responseSuccessHandler = response => {
    return response.data;
  };
  
  const responseErrorHandler = error => {
    console.log(error);
    return Promise.reject(error);
  };
  
  