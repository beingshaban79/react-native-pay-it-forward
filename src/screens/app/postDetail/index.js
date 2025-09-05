import React from 'react';
import {
  Image,
  TouchableOpacity,
  Dimensions,
  View,
  ScrollView,
  Share,
  Linking,
  Alert,
} from 'react-native';
import {Wrapper, Text, Headers, Spacer} from '../../../components';
import {useHooks} from './hooks';
import Carousel from 'react-native-reanimated-carousel';
import {useSharedValue} from 'react-native-reanimated';
import {Button, WithText} from '../../../components/icons';
import {colors, responsiveHeight, sizes} from '../../../services';
import {goBack, navigate} from '../../../navigation/rootNavigation';
import {Round} from '../../../components/images';
import {useDispatch, useSelector} from 'react-redux';
import {toggleSave} from '../../../store/reducers/savedSlice';
import MapView, {Marker} from 'react-native-maps';
const {width, height} = Dimensions.get('window');

export default function Index({route}) {
  const {handleCall, handleMessage} = useHooks();
  const dispatch = useDispatch();
  const data = route.params || {}; // item from navigation param
  const savedItems = useSelector(state => state.saved?.items) || [];

  // check if item is already saved
  const isSaved = id => savedItems.some(item => item.id === id);

  // toggle save/unsave
  const handleToggleSave = () => {
    dispatch(toggleSave(data));
  };

  // share functionality
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this item: ${data.title}\n\nDownload the app: https://yourapp.link`,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  // dummy donor details
  const donor = {
    name: 'Sarah Johnson',
    image: 'https://picsum.photos/300/200?random=1',
    rating: 4.8,
    itemsGiven: 23,
  };

  const scrollOffsetValue = useSharedValue(0);

  return (
    <Wrapper isMain>
      <Spacer isStatusBarHeigt />
      <Wrapper>
        {/* Carousel */}
        <Wrapper>
          <Carousel
            loop
            width={width * 1}
            height={height * 0.3}
            data={[data.image]}
            defaultScrollOffsetValue={scrollOffsetValue}
            renderItem={({item}) => (
              <Image
                source={{uri: item}}
                style={{
                  width: width * 1,
                  height: height * 0.3,
                }}
                resizeMode="cover"
              />
            )}
          />
        </Wrapper>

        {/* Top Buttons */}
        <Wrapper
          isAbsolute
          style={{
            top: 15,
            left: 15,
            right: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Button
            isRound
            iconName="arrow-back"
            iconType="ionicon"
            iconColor={colors.black}
            iconSize={18}
            buttonSize={25}
            buttonColor={colors.ricePaper}
            onPress={() => goBack()}
          />
          <Wrapper
            flexDirectionRow
            style={{width: width * 0.15, justifyContent: 'space-between'}}>
            {/*Save Button */}
            <Button
              isRound
              iconName={isSaved(data.id) ? 'heart' : 'heart-outline'}
              iconType="ionicon"
              iconColor={isSaved(data.id) ? 'red' : colors.black}
              iconSize={18}
              buttonSize={25}
              buttonColor={colors.ricePaper}
              onPress={handleToggleSave}
            />

            {/*Share Button */}
            <Button
              isRound
              iconName="share-social-outline"
              iconType="ionicon"
              iconColor={colors.black}
              iconSize={18}
              buttonSize={25}
              buttonColor={colors.ricePaper}
              onPress={handleShare}
            />
          </Wrapper>
        </Wrapper>

        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}>
          {/* Category Tag */}
          <Wrapper
            marginHorizontalBase
            style={{
              marginTop: sizes.baseMargin,
              alignSelf: 'flex-start',
              backgroundColor: '#E6F9EC',
              borderRadius: 6,
              paddingHorizontal: 10,
              paddingVertical: 4,
            }}>
            <Text isRegular style={{color: colors.appColor11}}>
              {data.category}
            </Text>
          </Wrapper>

          {/* Title + Location + Time */}
          <Wrapper paddingHorizontalBase marginVerticalSmall>
            <Text isLarge isBoldFont>
              {data.title}
            </Text>

            <Wrapper flexDirectionRow marginVerticalTiny gap={20}>
              <WithText
                iconName="location-outline"
                iconType="ionicon"
                iconSize={15}
                textStyle={{fontSize: 13}}
                text={`${data.km} · ${data.location}`}
                tintColor={colors.appTextColor4}
              />
              <WithText
                iconName="time-outline"
                iconType="ionicon"
                iconSize={15}
                textStyle={{fontSize: 13}}
                text={data.time}
                tintColor={colors.appTextColor4}
              />
            </Wrapper>
          </Wrapper>

          {/* Description */}
          <Wrapper paddingHorizontalBase marginVerticalTiny>
            <Text isMedium isBoldFont>
              Description
            </Text>
            <Text isRegular isGray>
              {data.description}
            </Text>
          </Wrapper>

          {/* Donor Section */}
          <Wrapper
            background2
            marginHorizontalBase
            marginVerticalTiny
            paddingVerticalBase
            paddingHorizontalBase
            style={{borderRadius: 8}}>
            <Text isRegular isBoldFont>
              About the Donor
            </Text>

            <Wrapper
              flexDirectionRow
              paddingVerticalBase
              alignItemsCenter
              justifyContentSpaceBetween>
              <Wrapper flexDirectionRow alignItemsCenter gap={5}>
                <Round source={{uri: donor.image}} size={25} />
                <View>
                  <Text isRegular isBoldFont>
                    {donor.name}
                  </Text>
                  <Text isRegular>
                    ⭐ {donor.rating} · {donor.itemsGiven} items given
                  </Text>
                </View>
              </Wrapper>
              <Button
                text="View Profile"
                buttonColor={colors.white}
                onPress={() => navigate('otherUserProfile')}
                textColor={colors.black}
                buttonStyle={{
                  borderRadius: 3,
                  borderWidth: 1,
                  borderColor: colors.black,
                  backgroundColor: 'transparent',
                  width: '40%',
                  height: 30,
                }}
              />
            </Wrapper>

            {/* Message + Call */}
            <Wrapper
              flexDirectionRow
              justifyContentSpaceBetween
              marginVerticalSmall>
              <Button
                iconName="chatbubble-outline"
                iconType="ionicon"
                text="Message"
                iconSize={20}
                iconColor={colors.black}
                textColor={colors.black}
                buttonStyle={{
                  borderRadius: 3,
                  borderWidth: 1,
                  borderColor: colors.black,
                  backgroundColor: 'transparent',
                  width: '48%',
                  height: 40,
                }}
                onPress={handleMessage}
              />
              <Button
                iconName="call-outline"
                iconType="ionicon"
                iconColor={colors.black}
                iconSize={20}
                text="Call"
                textColor={colors.black}
                buttonStyle={{
                  borderRadius: 3,
                  borderWidth: 1,
                  borderColor: colors.black,
                  backgroundColor: 'transparent',
                  width: '48%',
                  height: 40,
                }}
                onPress={handleCall}
              />
            </Wrapper>

            {/* Show Map */}
          </Wrapper>
          <View
            style={{
              height: 300,
              marginTop: 10,
              marginHorizontal: 18,
              overflow: 'hidden',
              borderRadius: 8,
            }}>
            <MapView
              style={{flex: 1}}
              initialRegion={{
                latitude: data.lat || 37.7749, // fallback (e.g. San Francisco)
                longitude: data.lng || -122.4194,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              showsMyLocationButton
              onPress={() => {
                const lat = data.lat || 37.7749;
                const lng = data.lng || -122.4194;
                const label = encodeURIComponent(data.title);
                const url = `https://www.google.com/maps?q=${lat},${lng}(${label})`;
                Linking.canOpenURL(url)
                  .then(supported => {
                    if (supported) {
                      Linking.openURL(url);
                    } else {
                      Alert.alert(
                        'Google Maps not available',
                        'Please install Google Maps to view this location.',
                      );
                    }
                  })
                  .catch(err => console.error('Error opening map:', err));
              }}>
              <Marker
                coordinate={{
                  latitude: data.lat || 37.7749,
                  longitude: data.lng || -122.4194,
                }}
                title={data.title}
                description={data.location}
              />
            </MapView>
          </View>
          {/* Request Pickup */}
          <Button
            text="Request Pickup"
            buttonColor={colors.appColor11}
            textColor={colors.snow}
            buttonSize={{width: '100%'}}
            buttonStyle={{
              marginHorizontal: sizes.baseMargin,
              marginTop: sizes.baseMargin,
              borderRadius: 8,
              paddingVertical: 15,
            }}
          />
          <Spacer height={responsiveHeight(35)} />
        </ScrollView>
      </Wrapper>
    </Wrapper>
  );
}
