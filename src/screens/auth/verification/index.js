import React from 'react';
import {
  Text,
  ScrollViews,
  Wrapper,
  Spacer,
  Headers,
  StatusBars,
} from '../../../components';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  sizes,
  appFonts,
  colors,
  fontSizes,
} from '../../../services';
import {useHooks} from './hooks';
import {OtpInput} from 'react-native-otp-entry';
import {goBack} from '../../../navigation/rootNavigation';
import {TouchableOpacity} from 'react-native';
import {Button} from '../../../components/icons';
export default function Verification(props) {
  const phone_no = props.route.params || '';
  const {handleVerifyOTP, setForm} = useHooks(phone_no);
  return (
    <Wrapper isMain style={[{}]}>
      <StatusBars.Dark />
      <Headers.Primary
        title={'Verify Email/Phone'}
        onBackPress={goBack}
        showBackArrow
        IconLeftSize={20}
      />

      <ScrollViews.KeyboardAvoiding>
        <Wrapper>
          <Text
            isTinyTitle
            alignTextCenter
            style={{
              marginTop: responsiveHeight(2),
              fontSize: responsiveFontSize(14),
              color: colors.appTextColor1,
              fontFamily: appFonts.RedHatDisplayTextMedium,
            }}
            children={`Enter the 6-digit code sent to\n${phone_no}`}
          />

          <Spacer isSmall />

          <Wrapper paddingVerticalSmall style={{alignItems: 'center'}}>
            <Wrapper
              style={{
                width: responsiveWidth(85),
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <OtpInput
                numberOfDigits={6}
                focusColor={colors.appColor11}
                onTextChange={text => setForm(prev => ({...prev, otp: text}))}
                theme={{
                  pinCodeContainerStyle: {
                    width: responsiveWidth(12),
                    height: responsiveWidth(12),
                    borderRadius: 5,
                    backgroundColor: '#f0f0f0',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                  pinCodeTextStyle: {
                    fontSize: fontSizes.large,
                    color: colors.black,
                    fontFamily: appFonts.LatoTextBold,
                  },
                }}
              />
            </Wrapper>
          </Wrapper>

          <Spacer isBasic />
          <Wrapper paddingHorizontalBase>
            <Button
              buttonColor={colors.appColor11}
              text="Verify & Continue"
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
              onPress={handleVerifyOTP}
            />
          </Wrapper>
          <Spacer isBasic />
          <TouchableOpacity onPress={() => {}} activeOpacity={0.7}>
            <Text
              alignTextCenter
              style={{
                fontSize: responsiveFontSize(11),
                fontFamily: appFonts.RedHatDisplayTextSemiBold,
                color: colors.appColor11,
              }}
              children={'Resend Code in 30s'}
            />
          </TouchableOpacity>
        </Wrapper>
      </ScrollViews.KeyboardAvoiding>
    </Wrapper>
  );
}
