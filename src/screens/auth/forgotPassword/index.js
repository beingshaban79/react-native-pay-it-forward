import React, {Component, useState} from 'react';
import {
  Wrapper,
  Text,
  Logos,
  Icons,
  StatusBars,
  Images,
  Spacer,
  Headers,
  ScrollViews,
  TextInputs,
  Buttons,
} from '../../../components';
import {
  appFonts,
  appIcons,
  appImages,
  appStyles,
  appSvgs,
  colors,
  fontSizes,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  routes,
  sizes,
} from '../../../services';
import {Image, StatusBar, TouchableOpacity} from 'react-native';
import {color} from '@rneui/base';
import {goBack, navigate} from '../../../navigation/rootNavigation';
import {useHooks} from './hooks';
import {Button} from '../../../components/icons';

function ForgotPassword() {
  const [value, setValue] = useState('');
  const {handleForgotPass, errors} = useHooks(value);
  return (
    <Wrapper isMain>
      <StatusBars.Dark />
      <Headers.Primary
        title={'Reset Password'}
        onBackPress={goBack}
        showBackArrow
        IconLeftSize={20}
      />
      {/* <Spacer isStatusBarHeigt /> */}
      <ScrollViews.KeyboardAvoiding>
        <Text
          isTinyTitle
          alignTextCenter
          style={{
            marginTop: responsiveHeight(2),
            fontSize: responsiveFontSize(12),
            color: colors.appTextColor1,
            fontFamily: appFonts.RedHatDisplayTextMedium,
          }}
          children={'Enter your email or phone to reset your password'}
        />
        <Spacer isBasic />
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
          value={value}
          onChangeText={setValue}
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
        {errors && (
          <Text
            style={{
              color: 'red',
              marginLeft: responsiveWidth(8),
              marginTop: responsiveHeight(0.5),
              fontSize: responsiveFontSize(10),
            }}>
            {errors}
          </Text>
        )}
        <Spacer isBasic />
        <Wrapper paddingHorizontalBase>
          <Button
            buttonColor={colors.appColor11}
            text="Send Reset Code"
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
            onPress={handleForgotPass}
          />
        </Wrapper>
        <Spacer height={responsiveHeight(2)} />
        <TouchableOpacity onPress={goBack}>
          <Text
            style={{
              color: colors.appColor11,
              alignSelf: 'center',
              fontWeight: '500',
            }}
            isSmall
            isMediumFont
            children={'Back to Sign In'}
          />
        </TouchableOpacity>
      </ScrollViews.KeyboardAvoiding>
    </Wrapper>
  );
}

export default ForgotPassword;
