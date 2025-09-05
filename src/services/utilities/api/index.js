// api.js

import axios from "axios";
import { baseURL, routes } from "../../constants";
import { Toasts } from "../../../components";
import { store } from "../../../store";

// Create a custom Axios instance with a base URL and default headers
const api = axios.create({
  baseURL: baseURL, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Set up a request interceptor to attach the authentication token (if available)
api.interceptors.request.use(
  (config) => {
    // Assuming you have a function to retrieve the authentication token
    const authToken = getAuthToken();
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Set up a response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    //__DEV__ && console.log( response.data);
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      // Handle token expiration or unauthorized access
      // Replace with your navigation logic to the login screen
      // replace(routes.auth, { loggedOut: true })
      // HelpingMethods.logout()
    } else if (error?.response?.data?.message) {
      Toasts.Error(error.response.data.message);
      __DEV__ && console.log(Error);
    }
    return Promise.reject(error);
  }
);

const getAuthToken = () => {
  const storeState = store.getState();
  return storeState.auth.token || null;
};

export default api;
