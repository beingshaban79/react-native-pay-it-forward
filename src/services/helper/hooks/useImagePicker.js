import { useState, useCallback } from "react";
import * as ImagePicker from "react-native-image-picker";
import { imagePickerOptions } from "../../constants";

const useImagePicker = (config = {}) => {
  const {
    selectionLimit = 0, // default: unlimited
    mediaType = "photo", // default: photo
  } = config;

  const [images, setImages] = useState([]);

  const options = {
    ...imagePickerOptions,
    selectionLimit,
    mediaType,
  };

  const openLibrary = useCallback(() => {
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.log("ImagePicker Error: ", response.errorMessage);
      } else if (response.assets) {
        const newImages = response.assets.map((asset) => ({
          uri: asset.uri,
          type: asset.type,
          name: asset.fileName || `image-${Date.now()}`,
          id: `${asset.uri}-${Date.now()}`,
        }));
        setImages(
          selectionLimit === 1 ? [newImages[0]] : [...images, ...newImages]
        );
      }
    });
  }, [selectionLimit, images]);

  const removeImage = useCallback((imageId) => {
    setImages((prevImages) => prevImages.filter((img) => img.id !== imageId));
  }, []);

  const clearImages = useCallback(() => {
    setImages([]);
  }, []);

  return {
    images,
    openLibrary,
    removeImage,
    clearImages,
  };
};

export default useImagePicker;
