import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Switch, Image} from 'react-native';
import {Text, Wrapper, Spacer} from '../../../components';
import {
  colors,
  responsiveWidth,
  responsiveHeight,
  routes,
  postData,
} from '../../../services';
import {color, Icon} from '@rneui/base';
import {useHooks} from './hooks';
import {goBack, navigate} from '../../../navigation/rootNavigation';
import {useDispatch, useSelector} from 'react-redux';
import ListHeader from '../../../components/listHeader';
import {FlashList} from '@shopify/flash-list';
import {toggleSave} from '../../../store/reducers/savedSlice';

export default function OtherUserProfile() {
  const dispatch = useDispatch();
  const savedItems = useSelector(state => state?.saved?.items) || [];

  const isSaved = id => savedItems.some(item => item.id === id);

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Image
        source={{uri: item.image}}
        style={styles.cardImage}
        resizeMode="cover"
      />

      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text isSmall isBoldFont numberOfLines={1}>
            {item.title}
          </Text>
          <TouchableOpacity
            style={styles.heartIcon}
            onPress={() => dispatch(toggleSave(item))}>
            <Icon
              name={isSaved(item.id) ? 'heart' : 'heart-outline'}
              type="ionicon"
              size={22}
              color={isSaved(item.id) ? 'red' : colors.appTextColor1}
            />
          </TouchableOpacity>
        </View>

        <Text isSmall isGray>
          {item.category} • {item.time}
        </Text>

        <Spacer isTiny />

        <Wrapper flexDirectionRow alignItemsCenter justifyContentSpaceBetween>
          <View style={styles.badge}>
            <Text isTiny style={{color: '#60B17C'}}>
              Active
            </Text>
          </View>
        </Wrapper>
        <Spacer isTiny />
      </View>
    </View>
  );
  return (
    <Wrapper isMain style={{backgroundColor: colors.appBgColor3}}>
      <Spacer isStatusBarHeigt />

      <Wrapper
        style={{
          paddingRight: 5,
          borderRadius: 8,
        }}
        backgroundColor={colors.appBgColor1}
        paddingVerticalBase>
        <View style={styles.header}>
          <TouchableOpacity style={{paddingRight: 6}} onPress={goBack}>
            <Icon
              name="arrow-back"
              type="ionicons"
              size={25}
              color={colors.appTextColor1}
            />
          </TouchableOpacity>
          <Image
            source={{uri: 'https://picsum.photos/300/200?random=4'}}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text isMedium isBoldFont>
              Alex Thompson
            </Text>
            <Text isSmall isGray>
              +1 (555) 123-4567
            </Text>
            <View style={styles.ratingRow}>
              <Icon name="star" type="feather" color="#F5A623" size={16} />
              <Text isSmall style={{marginLeft: 4}}>
                4.9 rating
              </Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            {[
              //  {label: 'Items Given', value: 12},
              //{label: 'Items Received', value: 8},
              {label: 'Member Since', value: 2024},
            ].map((item, id) => (
              <View key={id} style={styles.statBox}>
                <Text isMedium isBoldFont>
                  {item.value}
                </Text>
                <Text isTiny isGray>
                  {item.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </Wrapper>

      <FlashList
        data={postData}
        keyExtractor={item => item.id}
        estimatedItemSize={120}
        renderItem={renderItem}
        contentContainerStyle={{paddingHorizontal: 12, paddingTop: 10}}
        ListHeaderComponent={() => (
          <View style={{paddingBottom: 10, paddingLeft: 5}}>
            <Text isBoldFont isLarge>
              Items Shared
            </Text>
            <Text isGray isSmall>
              Browse items shared by Alex Thompson
            </Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text isGray isMedium>
              No items shared yet.
            </Text>
          </View>
        )}
      />
    </Wrapper>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 11,
    paddingRight: 16,
    marginTop: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  statBox: {
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.appBgColor1,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    // elevation: 1,
  },
  cardImage: {
    width: 75,
    height: 75,
    borderRadius: 8,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: colors.lightGreen,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  heartIcon: {},
});
