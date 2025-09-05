import React, {useState, useEffect, useMemo} from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {Wrapper, Text, Spacer, Icons} from '../../../components';
import {
  colors,
  responsiveWidth,
  responsiveHeight,
  categories,
  appStyles,
  sizes,
  fontSizes,
  appFonts,
} from '../../../services';
import {Icon} from '@rneui/base';
import ListHeader from '../../../components/listHeader';
import {useFocusEffect} from '@react-navigation/native';
import {useHooks} from './hooks';
import {Button} from '../../../components/icons';

export default function Categories() {
  const [selected, setSelected] = useState([]);
  const [initialSelected, setInitialSelected] = useState([]);
  const {getCategories, handleSaveCategories} = useHooks();

  const normalize = str => str.trim().toLowerCase();

  const toggleSelect = title => {
    const key = normalize(title);
    setSelected(prev =>
      prev.includes(key) ? prev.filter(x => x !== key) : [...prev, key],
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const res = await getCategories();
        if (Array.isArray(res)) {
          const normalized = res.map(item => normalize(item));
          setSelected(normalized);
          setInitialSelected(normalized);
        }
      };
      fetchData();
    }, []),
  );

  const hasChanges = useMemo(() => {
    return !(
      selected.length === initialSelected.length &&
      selected.every(val => initialSelected.includes(val))
    );
  }, [selected, initialSelected]);

  const handleUpdate = async () => {
    await handleSaveCategories(selected);
    setInitialSelected(selected);
  };

  return (
    <Wrapper isMain style={{backgroundColor: colors.appBgColor3}}>
      <Spacer isStatusBarHeigt />
      <ListHeader
        title="Categories"
        subtitle="Browse items by categories"
        showSearchInput={false}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {categories.map(cat => {
            const isChecked = selected.includes(normalize(cat.title));
            return (
              <TouchableOpacity
                key={cat.id}
                style={styles.card}
                activeOpacity={0.9}
                onPress={() => toggleSelect(cat.title)}>
                <CustomCheckBox
                  checked={isChecked}
                  onPress={() => toggleSelect(cat.title)}
                  containerStyle={styles.checkbox}
                />

                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Icon
                    name={cat.icon}
                    type={cat.type}
                    size={25}
                    color={cat.color}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      padding: 10,
                      width: 50,
                      height: 50,
                      borderRadius: 16,
                      opacity: 0.2,
                      backgroundColor: cat.color,
                    }}
                  />
                </View>

                <Spacer height={15} />
                <Text isMedium isDarkGray>
                  {cat.title}
                </Text>

                <View style={styles.itemBadge}>
                  <Text isTiny isGray>{`${cat.items} items`}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {hasChanges && (
        <View style={{padding: 15}}>
          <Button
            buttonColor={colors.appColor11}
            text="Update"
            textStyle={{
              fontFamily: appFonts.LatoTextBold,
              fontSize: fontSizes.small,
            }}
            textColor={colors.snow}
            buttonSize={{width: '100%'}}
            buttonStyle={{
              marginBottom: sizes.TinyMargin,
              borderRadius: 8,
              paddingVertical: 15,
            }}
            onPress={handleUpdate}
          />
        </View>
      )}
    </Wrapper>
  );
}

function CustomCheckBox({checked, onPress, containerStyle}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.checkBoxContainer, containerStyle]}>
      <Icon
        name={checked ? 'checkbox-marked' : 'checkbox-blank-outline'}
        type="material-community"
        size={22}
        color={checked ? colors.appColor1 : colors.coal}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 15,
  },
  card: {
    width: responsiveWidth(44),
    height: responsiveHeight(18),
    backgroundColor: colors.appBgColor1,
    borderRadius: 5,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    position: 'relative',
  },
  checkbox: {
    position: 'absolute',
    top: 5,
    left: 5,
    margin: 0,
    padding: 0,
    backgroundColor: 'transparent',
  },
  checkBoxContainer: {
    backgroundColor: 'transparent',
  },
  itemBadge: {
    backgroundColor: colors.appBgColor3,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 15,
  },
});
