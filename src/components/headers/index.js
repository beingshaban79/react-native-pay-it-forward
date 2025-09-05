import React from 'react';
import {
  appFonts,
  appStyles,
  appSvgs,
  colors,
  fontSize,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  sizes,
  useSizes,
} from '../../services';
//import {Icons, Wrapper, Text } from '..'
import {goBack} from '../../navigation/rootNavigation';
import * as Icons from '../icons';
import Wrapper from '../wrapper';
import Text from '../text';
import {Pressable} from 'react-native';
import Spacer from '../spacer';
import * as StatusBars from '../statusBars';

// export const Primary = ({ onBackPress, title, right, left, showBackArrow,shadow,titleStyle,titleContainerStyle,containerStyle }) => {
//     return (
//         <Wrapper style={[appStyles.headerStyle,appStyles.justifyContentFlexstart, {  paddingTop: sizes.statusBarHeight*1.25,backgroundColor:'red' },shadow&&appStyles.shadow,containerStyle]}>
//             <Wrapper flexDirectionRow justifyContentSpaceBetween>
//                 <Wrapper isAbsolute style={[appStyles.center, { right: 0, left: 0, },titleContainerStyle]}>
//                     <Text style={[appStyles.headerTitleStyle,appStyles.textCenter,titleStyle]}>{title}</Text>
//                 </Wrapper>
//                 {
//                     left ? left :
//                         showBackArrow ?
//                             <Icons.Back
//                                 onPress={onBackPress ?onBackPress : goBack}
//                                 style={[appStyles.paddingHorizontalSmall,appStyles.paddingVerticalTiny,]}
//                             />
//                             :
//                             null
//                 }
//                 {right ? right : null}
//             </Wrapper>
//         </Wrapper>
//     )
// }

export const Primary = ({
  onBackPress,
  search,
  title,
  right,
  searchPress,
  left,
  IconLeftSize,
  titleContainerStyle,
  centerTitle,
  tintColor,
  containerStyle,
  headerTitle,
  alignTitleLeft,
  showBackArrow,
  invertColors,
  titleStyle,
  leftContainerStyle,
  rightContainerStyle,
  shadow,
  NoBottomLine,
  auth,
}) => {
  const {statusBarHeight, headerHeight} = useSizes();
  const defaultTintColor = !invertColors
    ? colors.appTextColor1
    : colors.appColor1;
  const defaultBackgroundColor = !invertColors
    ? colors.appBgMain
    : colors.appBgColor1;
  return (
    <Wrapper
      style={[
        appStyles.headerStyle,
        {
          height: headerHeight,
          backgroundColor: defaultBackgroundColor,
          borderBottomWidth: NoBottomLine ? 0 : 1,
          borderColor: colors.steel,
          paddingTop: statusBarHeight,
          //paddingBottom: responsiveHeight(1),
        },
        shadow && appStyles.shadowLight,
        containerStyle,
      ]}>
      <StatusBars.Dark />
      <Wrapper flex={1} flexDirectionRow alignItemsCenter style={{}}>
        {/* <Wrapper isAbsolute
                      style={[
                          { right: 0, left: 0, backgroundColor: 'green', },
                          alignTitleLeft ?
                              {
                                  paddingLeft: responsiveWidth(17.5),
                                  paddingRight: sizes.marginHorizontal
                              }
                              :
                              appStyles.center,
                          titleContainerStyle]}>
                      {
                          headerTitle ? headerTitle :
                              <Text isTinyTitle numberOfLines={1} style={{ color: tintColor ? tintColor : defaultTintColor }}>{title}</Text>
                      }
                  </Wrapper> */}
        <Wrapper
          flex={1.5}
          style={[
            // { backgroundColor: 'red' },
            leftContainerStyle,
          ]}>
          {left ? (
            left
          ) : showBackArrow ? (
            <Pressable
              style={[{flex: 1}, appStyles.center]}
              onPress={onBackPress ? onBackPress : goBack}>
              <Icons.Back
                //onPress={onBackPress}
                //onPress={onBackPress ? onBackPress : goBack}
                // style={{ marginLeft: sizes.marginHorizontal }}
                color={tintColor ? tintColor : defaultTintColor}
                size={IconLeftSize ? IconLeftSize : responsiveWidth(4)}
              />
            </Pressable>
          ) : null}
        </Wrapper>
        <Wrapper
          flex={7}
          style={[
            // { backgroundColor: 'green', },
            alignTitleLeft
              ? appStyles.alignItemsFlexStart
              : appStyles.alignItemsCenter,
            titleContainerStyle,
          ]}>
          {headerTitle ? (
            headerTitle
          ) : (
            <Text
              alignTextCenter
              style={[
                appStyles.headerTitleStyle,
                {
                  color: colors.appTextColor3,
                  fontFamily: appFonts.RedHatDisplayTextBold,
                  fontSize: !auth
                    ? responsiveFontSize(18)
                    : responsiveFontSize(18),
                },
                titleStyle,
              ]}>
              {title}
            </Text>
          )}
        </Wrapper>

        {/* {right ?
                      right
                      :
                      <Wrapper flex={1.5}></Wrapper>
                  } */}
        <Wrapper flex={1.5} style={rightContainerStyle}>
          {right ? right : <></>}
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
};

export function Auth({...PrimaryProps}) {
  return (
    <Wrapper animation={'slideInDown'}>
      <Primary showBackArrow {...PrimaryProps} />
      <Wrapper
        alignItemsCenter
        backgroundColor={colors.appColor1}
        style={{borderBottomRightRadius: 40, borderBottomLeftRadius: 40}}>
        <Spacer isBasic />
        <appSvgs.logo_white
          height={responsiveHeight(10)}
          width={responsiveWidth(80)}
        />
        <Spacer isDoubleBase />
        <Spacer isBasic />
      </Wrapper>
    </Wrapper>
  );
}
