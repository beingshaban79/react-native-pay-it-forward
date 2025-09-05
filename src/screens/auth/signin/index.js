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
} from '../../../services';
import {useHooks} from './hooks';
import {Image} from 'react-native';
import {color, fonts} from '@rneui/base';
import {Button} from '../../../components/icons';
import Toast from 'react-native-root-toast';
export default function Index(props) {
  const {navigate} = props.navigation;

  const {
    RememberMe,
    setRememberMe,
    isPasswordVisible,
    setPasswordVisible,
    togglePasswordVisibility,
    handleLogin,
    handleRememberMe,
    errors,
    email,
    setEmail,
    password,
    setPassword,
  } = useHooks();
  return (
    <Wrapper isMain style={[{}]}>
      <Spacer isStatusBarHeigt />
      <Spacer height={responsiveHeight(7)} />
      <ScrollViews.KeyboardAvoiding>
        <Wrapper>
          <Text
            isTinyTitle
            alignTextCenter
            style={{
              fontSize: responsiveFontSize(22),
              fontFamily: appFonts.RedHatDisplayTextBold,
            }}
            children={'Welcome Back!'}
          />
          <Spacer isSmall />
          <Text
            isTiny
            alignTextCenter
            style={{
              marginTop: responsiveHeight(1),
              fontSize: responsiveFontSize(16),
              color: colors.appTextColor1,
              fontFamily: appFonts.RedHatDisplayTextMedium,
            }}
            children={'Sign in to continue donating'}
          />
          <Spacer isDoubleBase />
          <Text
            style={{
              marginLeft: responsiveWidth(8),
              color: colors.appTextColor3,
            }}
            isSmall
            children={'Email / Phone Number'}
          />
          <Spacer isTiny />
          <TextInputs.Colored
            value={email}
            onChangeText={setEmail}
            placeholder={'example@email.com'}
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
          {errors.email && (
            <Text
              style={{
                color: 'red',
                marginLeft: responsiveWidth(8),
                marginTop: responsiveHeight(0.5),
                fontSize: responsiveFontSize(10),
              }}>
              {errors.email}
            </Text>
          )}
          <Spacer isBasic />
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
            onChangeText={setPassword}
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
            containerStyle={{
              height: responsiveHeight(6),
            }}
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
                marginTop: responsiveHeight(0.5),
              }}>
              {errors.password}
            </Text>
          )}
          <Spacer isBasic />
          <Wrapper
            paddingHorizontalBase
            alignItemsCenter
            justifyContentSpaceBetween
            flexDirectionRow>
            <CheckBoxes.Primary
              checkedIconName={'checkbox-marked'}
              checkIconType={'material-community'}
              uncheckedIconName={'checkbox-blank-outline'}
              uncheckIconType={'material-community'}
              uncheckedIconColor={colors.coal}
              checked={RememberMe}
              onPress={handleRememberMe}
              text={'Remember Me'}
              textStyle={{
                fontFamily: appFonts.RedHatDisplayTextSemiBold,
                color: colors.appTextColor8,
                fontSize: responsiveFontSize(11),
              }}
            />
            <Wrapper>
              <Text
                alignTextRight
                children={'Forgot Password?'}
                style={{
                  fontFamily: appFonts.RedHatDisplayTextSemiBold,
                  color: colors.appTextColor8,
                  fontSize: responsiveFontSize(11),
                }}
                onPress={() => navigate(routes.forgotPassword)}
              />
            </Wrapper>
          </Wrapper>

          <Spacer isBasic />
          <Wrapper paddingHorizontalBase>
            <Button
              buttonColor={colors.appColor11}
              text="Login"
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
              onPress={handleLogin}
            />
            <Spacer height={responsiveHeight(5)} />
            <Text
              alignTextCenter
              style={{
                fontSize: responsiveFontSize(11),
                fontFamily: appFonts.RedHatDisplayTextSemiBold,
                color: colors.appTextColor1,
              }}>
              Don't have an account?
            </Text>
            <Spacer isSmall />

            <Button
              buttonColor={colors.appBgColor3}
              text={'Create an Account'}
              textColor={colors.snow}
              textStyle={{
                color: colors.appTextColor1,
                fontFamily: appFonts.LatoTextBold,
                fontSize: fontSizes.small,
              }}
              buttonSize={{width: '100%'}}
              buttonStyle={{
                marginTop: sizes.baseMargin,
                borderRadius: 8,
                paddingVertical: 15,
              }}
              onPress={() => navigate(routes.createAccount)}
            />
          </Wrapper>
          <Spacer isBasic />
        </Wrapper>
      </ScrollViews.KeyboardAvoiding>
    </Wrapper>
  );
}
