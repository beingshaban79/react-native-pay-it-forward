import React from 'react';
import {TouchableOpacity, View, TextInput, StyleSheet} from 'react-native';
import Wrapper from '../wrapper';
import Text from '../text';
import {Icon} from '@rneui/base';
import Spacer from '../spacer';
import {colors} from '../../services';

const ListHeader = ({
  showFilter = false,
  showAddButton = false,
  onFilterPress,
  onAddItemPress,
  title,
  subtitle,
  searchPlaceholder = 'Search...',
  showSearchInput = true,
  searchValue,
  onSearchChange,
  showClearAllButton,
  onPressClearAll,
  onPressBack,
  isBackIcon,
}) => (
  <Wrapper paddingHorizontalBase style={styles.headerContainer}>
    <View>
      <Wrapper
        flexDirectionRow
        justifyContentSpaceBetween
        style={{width: '100%'}}>
        <Wrapper flexDirectionRow alignItemsCenter gap={10}>
          {isBackIcon && (
            <TouchableOpacity onPress={onPressBack}>
              <Icon
                name="arrow-back"
                type="ionicons"
                size={25}
                color={colors.appTextColor1}
              />
            </TouchableOpacity>
          )}
          <View>
            <Text isMedium isBoldFont>
              {title}
            </Text>
            <Text isSmall isGray>
              {subtitle}
            </Text>
          </View>
        </Wrapper>

        {/* Right Side */}
        <View style={styles.headerIcons}>
          {showFilter && (
            <TouchableOpacity onPress={onFilterPress} style={styles.iconButton}>
              <Icon
                name="filter"
                type="feather"
                size={22}
                color={colors.appTextColor1}
              />
            </TouchableOpacity>
          )}

          {showAddButton && (
            <TouchableOpacity style={styles.addButton} onPress={onAddItemPress}>
              <Icon
                name="plus"
                type="feather"
                size={16}
                color="#fff"
                style={{marginRight: 6}}
              />
              <Text isSmall style={{color: '#fff'}}>
                Add Item
              </Text>
            </TouchableOpacity>
          )}
          {showClearAllButton && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={onPressClearAll}>
              <Icon
                name="trash"
                type="feather"
                size={16}
                color="#fff"
                style={{marginRight: 6}}
              />
              <Text isBoldFont style={{color: '#fff'}}>
                Clear All
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </Wrapper>

      {/* Custom Search Bar at the bottom */}
      {showSearchInput && (
        <>
          <Spacer isSmall />
          <View style={styles.searchContainer}>
            <Icon
              name="search"
              type="feather"
              size={22}
              color={colors.appTextColor3}
              style={{marginRight: 8}}
            />
            <TextInput
              placeholder={searchPlaceholder}
              placeholderTextColor={colors.appTextColor4}
              value={searchValue}
              onChangeText={onSearchChange}
              style={styles.searchInput}
            />
          </View>
        </>
      )}
    </View>
  </Wrapper>
);

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.appBgColor1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 15,
    padding: 6,
    borderRadius: 8,
    backgroundColor: colors.appBgColor2,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'green',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: colors.error2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: colors.appTextColor5,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: colors.appBgColor3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.appTextColor1,
    paddingVertical: 10,
  },
});

export default ListHeader;
