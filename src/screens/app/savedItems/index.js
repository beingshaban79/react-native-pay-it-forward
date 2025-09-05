import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {FlashList} from '@shopify/flash-list';
import {Wrapper, Text, Spacer} from '../../../components';
import {colors, responsiveHeight} from '../../../services';
import {Icon} from '@rneui/base';
import {clearAllSaved, removeSaved} from '../../../store/reducers/savedSlice';
import ListHeader from '../../../components/listHeader';
import {goBack} from '../../../navigation/rootNavigation';

export default function SavedItems() {
  const dispatch = useDispatch();
  const savedItems = useSelector(state => state.saved?.items) || [];

  const renderItem = ({item}) => (
    <Wrapper style={styles.card}>
      <View style={styles.row}>
        <Image source={{uri: item.image}} style={styles.image} />
        <View style={{flex: 0.9, marginLeft: 10}}>
          <Text isMedium isBoldFont numberOfLines={1}>
            {item.title}
          </Text>
          <Text isSmall isGray numberOfLines={2}>
            {item.description}
          </Text>
          <Spacer height={5} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text isTiny isLightGray>
              {item.location}
            </Text>
            <Text isTiny isLightGray>
              {item.time}
            </Text>
          </View>
        </View>
        {/* Delete Button */}
        <Wrapper style={{height: '100%'}} justifyContentCenter flex={0.1}>
          <TouchableOpacity onPress={() => dispatch(removeSaved(item.id))}>
            <Icon name="trash" type="feather" size={20} color="red" />
          </TouchableOpacity>
        </Wrapper>
      </View>
    </Wrapper>
  );

  return (
    <Wrapper isMain style={{backgroundColor: colors.appBgColor3}}>
      <Spacer isStatusBarHeigt />
      <ListHeader
        title="Saved Items"
        subtitle="All your saved items"
        showSearchInput={false}
        showClearAllButton={savedItems.length > 0 ? true : false}
        onPressClearAll={() => dispatch(clearAllSaved())}
        isBackIcon={true}
        onPressBack={goBack}
      />

      <FlashList
        data={savedItems}
        renderItem={renderItem}
        estimatedItemSize={80}
        keyExtractor={item => item.id}
        contentContainerStyle={{padding: 15}}
        ItemSeparatorComponent={() => <Spacer height={10} />}
        ListEmptyComponent={
          <Wrapper isCenter style={{marginTop: responsiveHeight(40)}}>
            <Text isGray isMedium>
              No saved items yet
            </Text>
          </Wrapper>
        }
      />
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: colors.appBgColor1,
    borderColor: colors.appBgColor4,
    borderWidth: 1,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: responsiveHeight(8),
    height: responsiveHeight(8),
    borderRadius: 8,
  },
});
