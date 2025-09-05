import { endPoints } from "../constants";
import { api } from "../utilities";

export const getListings = async () => {
  let response = null;
  const { url_1 } = endPoints.listings;
  const url = `${url_1}`;

  __DEV__ && console.log("Fetching listings from:", url);

  await api
    .get(url)
    .then((responseJson) => {
      __DEV__ && console.log("Listings response:", responseJson.data);
      if (responseJson.data) {
        response = responseJson.data;
      }
    })
    .catch((error) => {
      __DEV__ && console.log("Listings fetch error:", error);
    });

  return response;
};
