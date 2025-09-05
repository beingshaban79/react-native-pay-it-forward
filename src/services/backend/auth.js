import {endPoints} from '../constants';
import {api} from '../utilities';

export const register = async ({
  firstName,
  lastName,
  email,
  phone,
  password,
  state,
  suburb,
}) => {
  let response = null;
  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);
  formData.append('phone_number', phone);
  formData.append('first_name', firstName);
  formData.append('last_name', lastName);
  formData.append('state', state);
  formData.append('suburb', suburb);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const {url_1} = endPoints.register;
  let url = `${url_1}`;
  __DEV__ &&
    console.log(
      'register \n\n url: ',
      url,
      '\n\n data: ',
      formData,
      '\n\n config: ',
      config,
    );
  await api
    .post(url, formData, config)
    .then(async responseJson => {
      __DEV__ && console.log('response: ', responseJson.data);
      if (responseJson.data) {
        //handle flow after register
        response = responseJson.data;
      }
    })
    .catch(error => {});
  return response;
};

export const login = async ({login, password}) => {
  let response = null;
  let data = {
    login,
    password,
  };
  const {url_1} = endPoints.login;
  let url = `${url_1}`;
  __DEV__ && console.log('login \n\n url: ', url, 'data: ', data);
  await api
    .post(url, data)
    .then(async responseJson => {
      __DEV__ && console.log('response', responseJson.data);
      if (responseJson.data) {
        //handle flow after login
        response = responseJson.data;
      }
    })
    .catch(Error => {});
  return response;
};
export const VerifyOTP = async data => {
  let response = null;

  const {url_1} = endPoints.verify;
  let url = `${url_1}`;
  __DEV__ && console.log('login \n\n url: ', url, 'data: ', data);
  await api
    .post(url, data)
    .then(async responseJson => {
      __DEV__ && console.log('response', responseJson.data);
      if (responseJson.data) {
        //handle flow after login
        response = responseJson.data;
      }
    })
    .catch(Error => {});
  return response;
};
export const forgotPassword = async data => {
  let response = null;
  const {url_1} = endPoints.forgotPass;
  let url = `${url_1}`;
  __DEV__ && console.log('forgot Password \n\n url: ', url, 'data: ', data);
  await api
    .post(url, data)
    .then(async responseJson => {
      __DEV__ && console.log('response', responseJson.data);
      if (responseJson.data) {
        //handle flow after login
        response = responseJson.data;
      }
    })
    .catch(Error => {});
  return response;
};
