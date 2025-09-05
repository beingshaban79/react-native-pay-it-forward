import React, {Component} from 'react';
import {
  Text,
  TextInputs,
  Buttons,
  ScrollViews,
  Wrapper,
  Spacer,
  Headers,
  Icons,
  Images,
  CheckBoxes,
  StatusBars,
} from '../../../components';
import {
  responsiveFontSize,
  responsiveHeight,
  routes,
  appSvgs,
  responsiveWidth,
  sizes,
  appIcons,
  appFonts,
  colors,
  fontSizes,
  useImagePicker,
} from '../../../services';
import {useHooks} from './hooks';

import {goBack} from '../../../navigation/rootNavigation';
import {Button} from '../../../components/icons';
import {useRoute} from '@react-navigation/native';
import {Icon} from '@rneui/base';
import {Image, Pressable} from 'react-native';
export default function Index(props) {
  const {navigate} = props.navigation;
  // const route = useRoute();
  const isEdit = props?.route?.params?.isEdit;

  const {
    handleCreateAccount,
    handleChange,
    RememberMe,
    isPasswordVisible,
    isConfirmPasswordVisible,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    email,
    phone,
    password,
    firstName,
    lastName,
    state,
    suburb,
    errors,
    handleRememberMe,
  } = useHooks();
  const {images, openLibrary} = useImagePicker({selectionLimit: 1});

  return (
    <Wrapper isMain style={[{}]}>
      <StatusBars.Dark />
      <Headers.Primary
        title={isEdit ? 'Edit Profile' : 'Create Account'}
        onBackPress={goBack}
        showBackArrow
        IconLeftSize={20}
      />

      <ScrollViews.KeyboardAvoiding>
        <Wrapper>
          {isEdit && (
            <>
              <Spacer isLarge />
              <Wrapper alignItemsCenter>
                <Wrapper style={{position: 'relative'}}>
                  {/* Profile Picture Circle */}
                  <Wrapper
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 60,
                      backgroundColor: colors.appBgColor4,
                      justifyContent: 'center',
                      alignItems: 'center',
                      overflow: 'hidden',
                    }}>
                    {images.length > 0 ? (
                      <Image
                        source={{uri: images[0].uri}}
                        style={{width: '100%', height: '100%'}}
                        resizeMode="cover"
                      />
                    ) : (
                      <Pressable onPress={openLibrary}>
                        <Icon
                          name="camera"
                          type="entypo"
                          size={30}
                          color={colors.appTextColor3}
                        />
                      </Pressable>
                    )}
                  </Wrapper>

                  {/* Show floating camera icon ONLY if image is selected */}
                  {images.length > 0 && (
                    <Pressable onPress={openLibrary}>
                      <Wrapper
                        style={{
                          position: 'absolute',
                          bottom: 4,
                          right: 10,
                          backgroundColor: colors.white,
                        }}>
                        <Icon name="camera" type="feather" size={22} />
                      </Wrapper>
                    </Pressable>
                  )}
                </Wrapper>
              </Wrapper>
              <Spacer isLarge />
            </>
          )}

          <Text
            isTinyTitle
            alignTextCenter
            style={{
              marginTop: responsiveHeight(2),
              fontSize: responsiveFontSize(16),
              color: colors.appTextColor1,
              fontFamily: appFonts.RedHatDisplayTextMedium,
            }}>
            {isEdit
              ? 'Update your profile information below.'
              : 'Join our giving community today!'}
          </Text>

          <Spacer isMedium />

          <Text
            style={{
              marginLeft: responsiveWidth(8),
              color: colors.appTextColor3,
            }}
            isSmall
            children={'First Name'}
          />
          <Spacer isTiny />
          <TextInputs.Colored
            value={firstName}
            onChangeText={text => handleChange('firstName', text)}
            placeholder={'Type here...'}
            titleStyle={{
              color: colors.appTextColor1,
              marginLeft: responsiveWidth(3),
            }}
            containerStyle={{
              height: responsiveHeight(6),
            }}
            inputContainerStyle={{
              borderRadius: 7,
            }}
          />
          {errors.firstName && (
            <Text
              style={{
                color: 'red',
                marginLeft: responsiveWidth(8),
                fontSize: responsiveFontSize(10),
                marginTop: responsiveHeight(2),
              }}>
              {errors.firstName}
            </Text>
          )}

          <Spacer height={responsiveHeight(1.5)} />
          <Text
            style={{
              marginLeft: responsiveWidth(8),
              color: colors.appTextColor3,
            }}
            isSmall
            children={'Last Name'}
          />
          <Spacer isTiny />
          <TextInputs.Colored
            value={lastName}
            onChangeText={text => handleChange('lastName', text)}
            placeholder={'Type here...'}
            titleStyle={{
              color: colors.appTextColor1,
              marginLeft: responsiveWidth(3),
            }}
            containerStyle={{
              height: responsiveHeight(6),
            }}
            inputContainerStyle={{
              borderRadius: 7,
            }}
          />
          {errors.lastName && (
            <Text
              style={{
                color: 'red',
                marginLeft: responsiveWidth(8),
                fontSize: responsiveFontSize(10),
                marginTop: responsiveHeight(2),
              }}>
              {errors.lastName}
            </Text>
          )}

          <Spacer height={responsiveHeight(1.5)} />
          <Text
            style={{
              marginLeft: responsiveWidth(8),
              color: colors.appTextColor3,
            }}
            isSmall
            children={'Email Address'}
          />
          <Spacer isTiny />
          <TextInputs.Colored
            value={email}
            onChangeText={text => handleChange('email', text.trim())}
            placeholder={'example@email.com'}
            titleStyle={{
              color: colors.appTextColor1,
              marginLeft: responsiveWidth(3),
            }}
            containerStyle={{height: responsiveHeight(6)}}
            inputContainerStyle={{
              borderRadius: 7,
            }}
          />
          {errors.email && (
            <Text
              style={{
                color: 'red',
                marginLeft: responsiveWidth(8),
                fontSize: responsiveFontSize(10),
                marginTop: responsiveHeight(2),
              }}>
              {errors.email}
            </Text>
          )}

          <Spacer height={responsiveHeight(1.5)} />
          <Text
            style={{
              marginLeft: responsiveWidth(8),
              color: colors.appTextColor3,
            }}
            isSmall
            children={'Phone Number'}
          />
          <Spacer isTiny />
          <TextInputs.Colored
            value={phone}
            onChangeText={text =>
              handleChange('phone', text.replace(/\s+/g, ''))
            }
            placeholder={'+1 234 567 890'}
            titleStyle={{
              color: colors.appTextColor1,
              marginLeft: responsiveWidth(3),
            }}
            containerStyle={{height: responsiveHeight(6)}}
            inputContainerStyle={{
              borderRadius: 7,
            }}
          />
          {errors.phone && (
            <Text
              style={{
                color: 'red',
                marginLeft: responsiveWidth(8),
                fontSize: responsiveFontSize(10),
                marginTop: responsiveHeight(2),
              }}>
              {errors.phone}
            </Text>
          )}

          {!isEdit && (
            <>
              <Spacer height={responsiveHeight(1.5)} />
              <Text
                style={{
                  color: colors.appTextColor3,
                  marginLeft: responsiveWidth(8),
                }}
                isSmall
                children={'Password'}
              />
              <Spacer isTiny />
              <TextInputs.Colored
                value={password}
                onChangeText={text => handleChange('password', text)}
                placeholder={'minimum 8 characters'}
                iconNameRight={isPasswordVisible ? 'eye-off' : 'eye'}
                iconTypeRight={'feather'}
                iconColorRight={colors.appTextColor3}
                iconSizeRight={20}
                onPressIconRight={togglePasswordVisibility}
                secureTextEntry={!isPasswordVisible}
                titleStyle={{
                  color: colors.appTextColor1,
                  marginLeft: responsiveWidth(3),
                }}
                containerStyle={{height: responsiveHeight(6)}}
                inputContainerStyle={{
                  borderRadius: 7,
                }}
              />
              {errors.password && (
                <Text
                  style={{
                    color: 'red',
                    marginLeft: responsiveWidth(8),
                    fontSize: responsiveFontSize(10),
                    marginTop: responsiveHeight(2),
                  }}>
                  {errors.password}
                </Text>
              )}
            </>
          )}

          <Spacer height={responsiveHeight(1.5)} />
          <Text
            style={{
              marginLeft: responsiveWidth(8),
              color: colors.appTextColor3,
            }}
            isSmall
            children={'State'}
          />
          <Spacer isTiny />
          <TextInputs.Colored
            value={state}
            onChangeText={text => handleChange('state', text)}
            placeholder={'Select...'}
            titleStyle={{
              color: colors.appTextColor1,
              marginLeft: responsiveWidth(3),
            }}
            containerStyle={{
              height: responsiveHeight(6),
            }}
            inputContainerStyle={{
              borderRadius: 7,
            }}
          />
          {errors.state && (
            <Text
              style={{
                color: 'red',
                marginLeft: responsiveWidth(8),
                fontSize: responsiveFontSize(10),
                marginTop: responsiveHeight(2),
              }}>
              {errors.state}
            </Text>
          )}

          <Spacer height={responsiveHeight(1.5)} />
          <Text
            style={{
              marginLeft: responsiveWidth(8),
              color: colors.appTextColor3,
            }}
            isSmall
            children={'Suberb'}
          />
          <Spacer isTiny />
          <TextInputs.Colored
            value={suburb}
            onChangeText={text => handleChange('suburb', text)}
            placeholder={'Type...'}
            titleStyle={{
              color: colors.appTextColor1,
              marginLeft: responsiveWidth(3),
            }}
            containerStyle={{
              height: responsiveHeight(6),
            }}
            inputContainerStyle={{
              borderRadius: 7,
            }}
          />
          {errors.suburb && (
            <Text
              style={{
                color: 'red',
                marginLeft: responsiveWidth(8),
                fontSize: responsiveFontSize(10),
                marginTop: responsiveHeight(2),
              }}>
              {errors.suburb}
            </Text>
          )}

          {/* <Spacer height={responsiveHeight(1.5)} /> */}
          {/* <Text
            style={{
              color: colors.appTextColor3,
              marginLeft: responsiveWidth(8),
            }}
            isSmall
            children={'Confirm Password'}
          />
          <Spacer isTiny />
          <TextInputs.Bordered
            // value={'minimum 8 characters'}
            placeholder={'minimum 8 characters'}
            iconNameRight={isConfirmPasswordVisible ? 'eye-off' : 'eye'}
            iconTypeRight={'feather'}
            iconColorRight={colors.appTextColor3}
            iconSizeRight={20}
            onPressIconRight={toggleConfirmPasswordVisibility}
            secureTextEntry={!isConfirmPasswordVisible}
            titleStyle={{
              color: colors.appTextColor1,
              marginLeft: responsiveWidth(3),
            }}
            containerStyle={{
              height: responsiveHeight(6),
            }}
          />
          <Spacer height={responsiveHeight(1.5)} /> */}
          {/* <Wrapper marginHorizontalBase>
            <CheckBoxes.Primary
              checkedIconName={'checkbox-marked'}
              checkIconType={'material-community'}
              uncheckedIconName={'checkbox-blank-outline'}
              uncheckIconType={'material-community'}
              uncheckedIconColor={colors.coal}
              checked={RememberMe}
              onPress={handleRememberMe}
              text={
                <Text
                  style={{
                    fontFamily: appFonts.RedHatDisplayTextSemiBold,
                    color: colors.appTextColor8,
                    fontSize: responsiveFontSize(10),
                  }}>
                  Accept{' '}
                  <Text style={{textDecorationLine: 'underline'}}>
                    Terms Of Use
                  </Text>
                </Text>
              }
            />
          </Wrapper> */}
          <Spacer isMedium />
          <Wrapper paddingHorizontalBase>
            <Button
              buttonColor={colors.appColor11}
              text={isEdit ? 'Save Changes' : 'Create Account'}
              textStyle={{
                fontFamily: appFonts.LatoTextBold,
                fontSize: fontSizes.small,
              }}
              textColor={colors.snow}
              buttonSize={{width: '100%'}}
              buttonStyle={{
                marginTop: sizes.baseMargin,
                borderRadius: 8,
                paddingVertical: 15,
              }}
              onPress={handleCreateAccount}
            />

            {!isEdit && (
              <>
                <Spacer height={responsiveHeight(5)} />
                <Text
                  alignTextCenter
                  style={{
                    fontSize: responsiveFontSize(11),
                    fontFamily: appFonts.RedHatDisplayTextSemiBold,
                    color: colors.appTextColor1,
                  }}>
                  Already have an account?
                </Text>
                <Spacer isSmall />
                <Button
                  buttonColor={colors.appBgColor3}
                  text={'Login'}
                  textStyle={{
                    color: colors.appTextColor1,
                    fontFamily: appFonts.LatoTextBold,
                    fontSize: fontSizes.small,
                  }}
                  textColor={colors.snow}
                  buttonSize={{width: '100%'}}
                  buttonStyle={{
                    marginTop: sizes.baseMargin,
                    borderRadius: 8,
                    paddingVertical: 15,
                  }}
                  onPress={() => navigate(routes.signin)}
                />
              </>
            )}
          </Wrapper>
          <Spacer isBasic />
        </Wrapper>
      </ScrollViews.KeyboardAvoiding>
    </Wrapper>
  );
}
