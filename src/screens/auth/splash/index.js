import React, {Component} from 'react';
import {
  Wrapper,
  Text,
  Logos,
  Icons,
  StatusBars,
  Images,
  Spacer,
} from '../../../components';
import {
  appFonts,
  appIcons,
  appImages,
  appStyles,
  appSvgs,
  colors,
  fontSizes,
  responsiveHeight,
  responsiveWidth,
} from '../../../services';
import {Image, StatusBar} from 'react-native';
import {color} from '@rneui/base';

function Splash() {
  return (
    <Wrapper isMain>
      <StatusBars.Dark />
      {/* <Spacer isStatusBarHeigt /> */}
      <Wrapper
        backgroundColor={colors.appColor11}
        flex={1}
        animation={'fadeIn'}
        duration={2000}
        alignItemsCenter
        justifyContentCenter>
        <Text
          alignTextCenter
          isBoldFont
          isLargeTitle
          style={{
            color: colors.appTextColor6,
          }}
          children={'Pay It Forward'}
        />
      </Wrapper>
    </Wrapper>
  );
}

export default Splash;
