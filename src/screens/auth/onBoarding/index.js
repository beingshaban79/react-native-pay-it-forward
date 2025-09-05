import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import Wrapper from '../../../components/wrapper';
import Text from '../../../components/text';
import { Buttons, Icons, Spacer, StatusBars } from '../../../components';
import Swiper from 'react-native-swiper';
import { appFonts, appIcons, appImages, colors, fontSizes, responsiveHeight, responsiveWidth, routes } from '../../../services';
import { navigate } from '../../../navigation/rootNavigation';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    id: '1',
    image: appImages.onboarding3,
    title: 'Workouts',
    textimage: appIcons.onboardingtext,
    subtitle: 'At every Stage of life',
  },
  {
    id: '2',
    image: appImages.onboarding2,
    textimage: appIcons.onboardingtext2,
    description: "Just try it! You've Got\nNothing to lose!",
  },
  {
    id: '3',
    image: appImages.onboarding1,
    textimage: appIcons.onboardingtext3,
    description: 'What are You waiting for?',
  },
];

export default function OnBoarding() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calculate the position of the white line based on the current index
  const linePosition = (responsiveWidth(15) - 20) / (onboardingData.length - 1) * currentIndex;

  return (
    <Wrapper isMain>
      <StatusBars.Dark />
      <Wrapper flex={1}>
        <Swiper
          loop={false}
          showsPagination={false} // Disable default pagination dots
          onIndexChanged={(index) => setCurrentIndex(index)}
        >
          {onboardingData.map((item, index) => (
            <Wrapper key={item.id} style={styles.wrapper}>
              <ImageBackground
                resizeMode='cover'
                source={item.image} style={styles.image}>
                {index === 0 && (
                  <Icons.Custom
                    icon={appIcons.play}
                    size={50}
                  />
                )}
              </ImageBackground>
              <Spacer isMedium />
              {index === 0 ? (
                <Wrapper 
                // backgroundColor={'red'}
                 alignItemsCenter gap={5}>
                  <Text style={{
                    fontFamily: appFonts.KulimTextItalic,
                  }} isDarkGray isLarge>{item.title}</Text>
                  <Image
                    source={item.textimage}
                    style={{
                      resizeMode: 'contain',
                      height: responsiveHeight(5),
                      width: responsiveWidth(90),
                    }}
                  />
                  <Text isDarkGray isLarge style={{
                    fontFamily: appFonts.KulimTextItalic,
                  }}>{item.subtitle}</Text>
                </Wrapper>
              ) : (
                <>
                  <Image
                    source={item.textimage}
                    style={{
                      resizeMode: 'contain',
                      height: responsiveHeight(6),
                      width: responsiveWidth(90),
                    }} />
                  <Text alignTextCenter isDarkGray isTinyTitle style={{
                    fontFamily: appFonts.KulimTextItalic,
                  }}>{item.description}</Text>
                </>
              )}
            </Wrapper>
          ))}
        </Swiper>
        <Wrapper style={styles.progressBarContainer}>
          <Wrapper style={[styles.progressBar, { left: linePosition }]} />
        </Wrapper>
        <Wrapper style={{
          height: responsiveHeight(6),
          bottom:responsiveHeight(0)
        }} alignItemsCenter>
          <Buttons.Colored
            isGradient
            buttonColor={colors.appPrimaryColor}
            text={'Get started'}
            textStyle={{ fontSize: fontSizes.small }}
            buttonStyle={{ width: responsiveWidth(80) }}
            onPress={() => navigate(routes.signin)} />
        </Wrapper>
      </Wrapper>
      <Spacer isDoubleBase />
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: responsiveWidth(100),
    height: responsiveHeight(65),
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  progressBarContainer: {
    width: responsiveWidth(15),
    height: responsiveHeight(0.5),
    backgroundColor: colors.appBgColor6,
    borderRadius: responsiveWidth(3),
    overflow: 'hidden',
    marginVertical: responsiveHeight(2),
    alignSelf: 'center',
    bottom:responsiveHeight(2),
  },
  progressBar: {
    height: '100%',
    borderWidth:1,
    borderColor:colors.appBgColor6,
    borderRadius:responsiveWidth(3),
    width: responsiveWidth(5),
    backgroundColor: colors.appBgColor1,
  },
});
