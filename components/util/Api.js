import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = 'https://ilearn.test.at.sfsu.edu/ma2/api';


export function getUser() {
  let userApi = `${API_URL}/user`;
  let params = { params: { 
    a: Constants.manifest.extra.apiKey,
    d: Constants.deviceId 
  }};
  // console.log('params: ', params);
  // console.log('api url: ', userApi);

  return axios.get(userApi, params).then(response => {
    return response.data;
  }).catch(error => {
    console.log('error getting user from API');
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
}