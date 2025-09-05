import {endPoints} from '../constants';
import {api} from '../utilities';

export const addPreferencesCategories = async selected => {
  let response = null;
  const {url_1} = endPoints.preferencesCategories;
  const url = `${url_1}`;

  const formData = new FormData();

  selected.forEach(item => {
    if (item) {
      formData.append('preferred_categories[]', item);
    }
  });

  __DEV__ &&
    console.log('PreferencesCategories \n\n url: ', url, 'sending: ', selected);

  try {
    const responseJson = await api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    __DEV__ && console.log('response', responseJson.data);

    if (responseJson.data) {
      response = responseJson.data;
    }
  } catch (error) {
    console.log('Error saving categories:', error.response?.data || error);
  }

  return response;
};

export const getPreferencesCategories = async () => {
  let response = null;
  const {url_1} = endPoints.preferencesCategories;
  let url = `${url_1}`;
  await api
    .get(url)
    .then(async responseJson => {
      __DEV__ && console.log('response', responseJson.data);
      if (responseJson.data) {
        response = responseJson.data;
      }
    })
    .catch(Error => {});
  return response;
};
