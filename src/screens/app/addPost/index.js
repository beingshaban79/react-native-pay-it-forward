import React from 'react';
import {
  Wrapper,
  Text,
  Headers,
  StatusBars,
  Spacer,
  TextInputs,
  Buttons,
} from '../../../components';
import {useHooks} from './hooks';
import {goBack} from '../../../navigation/rootNavigation';
import {
  colors,
  responsiveHeight,
  responsiveWidth,
  sizes,
  useImagePicker,
} from '../../../services';
import {ScrollView, TouchableOpacity, View, Image, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from '../../../components/icons';
export default function Index() {
  const {images, openLibrary, removeImage} = useImagePicker();
  const handleAddPhoto = () => {
    openLibrary();
  };
  const handleRemovePhoto = imageId => {
    Alert.alert('Remove Photo', 'Are you sure you want to remove this photo?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Remove', onPress: () => removeImage(imageId)},
    ]);
  };
  return (
    <Wrapper isMain>
      <Headers.Primary
        title={'New Listing'}
        onBackPress={goBack}
        showBackArrow
        IconLeftSize={20}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Wrapper paddingVerticalBase paddingHorizontalBase>
          <Text isBoldFont children={'Add a photo'} />
          <Spacer height={responsiveHeight(2)} />
          {images?.length > 0 ? (
            <Wrapper>
              <Wrapper
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-start',
                }}>
                {images.map((image, index) => (
                  <Wrapper
                    key={image.id}
                    style={{
                      width: responsiveWidth(29),
                      height: responsiveWidth(29),
                      marginBottom: responsiveHeight(2),
                      position: 'relative',
                    }}>
                    <Image
                      source={{uri: image.uri}}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 10,
                      }}
                      resizeMode="cover"
                    />
                    <TouchableOpacity
                      onPress={() => handleRemovePhoto(image.id)}
                      style={{
                        position: 'absolute',
                        top: -10,
                        right: -10,
                        backgroundColor: colors.danger,
                        borderRadius: 15,
                        width: 30,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1,
                      }}>
                      <Icon name="times" size={16} color={colors.white} />
                    </TouchableOpacity>
                  </Wrapper>
                ))}
              </Wrapper>
              <Spacer isSmall />
              <TouchableOpacity activeOpacity={0.7} onPress={handleAddPhoto}>
                <Wrapper
                  style={{
                    borderRadius: 10,
                  }}
                  backgroundColor={colors.silver}
                  paddingVerticalSmall
                  paddingHorizontalBase
                  alignItemsCenter>
                  <Text isSmall isBoldFont children={'Add More Photos'} />
                </Wrapper>
              </TouchableOpacity>
            </Wrapper>
          ) : (
            <Wrapper
              style={{
                borderWidth: 1,
                borderColor: '#00000020',
                borderStyle: 'dashed',
                borderRadius: 10,
              }}
              paddingHorizontalBase
              paddingVerticalLarge
              alignItemsCenter
              justifyContentCenter>
              <Icon name="camera" size={40} color={colors.gray} />
              <Spacer isSmall />
              <Text isBoldFont children={'Add a photo'} />
              <Spacer isSmall />
              <Text
                alignTextCenter
                children={`Add a photo to your listing to help people see\nwhat you're offering.  `}
              />
              <Spacer isBasic />
              <TouchableOpacity activeOpacity={0.7} onPress={handleAddPhoto}>
                <Wrapper
                  style={{
                    borderRadius: 10,
                  }}
                  backgroundColor={colors.silver}
                  paddingVerticalSmall
                  paddingHorizontalBase>
                  <Text isSmall isBoldFont children={'Add a photo'} />
                </Wrapper>
              </TouchableOpacity>
            </Wrapper>
          )}
          <Spacer isBasic />
          <TextInputs.Colored
            fullWidth
            title={'Title'}
            placeholder={'What are you offering?'}
            inputContainerStyle={{borderRadius: 7}}
          />
          <Spacer isBasic />
          <TextInputs.Colored
            fullWidth
            title={'Description'}
            placeholder={''}
            inputContainerStyle={{
              borderRadius: 7,
              paddingBottom: responsiveHeight(10),
            }}
          />
          <Spacer isBasic />
          <TextInputs.Colored
            fullWidth
            title={'Category'}
            placeholder={'select a category'}
            inputContainerStyle={{
              borderRadius: 7,
            }}
          />
          <Spacer isBasic />
          <TextInputs.Colored
            fullWidth
            title={'Subcategory'}
            placeholder={'select a subcategory'}
            inputContainerStyle={{
              borderRadius: 7,
            }}
          />
          <Spacer isBasic />
          <TextInputs.Colored
            fullWidth
            title={'Pick-up Location'}
            placeholder={'Enter pick-up location'}
            inputContainerStyle={{
              borderRadius: 7,
            }}
          />
          <Spacer isBasic />

          <Button
            text="Submit"
            buttonColor={colors.appColor11}
            textColor={colors.snow}
            buttonSize={{width: '100%'}}
            buttonStyle={{
              marginTop: sizes.baseMargin,
              borderRadius: 8,
              paddingVertical: 15,
            }}
          />
        </Wrapper>
      </ScrollView>
    </Wrapper>
  );
}
