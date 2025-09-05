import React, { useState } from "react";
import {
  Wrapper,
  Text,
  Headers,
  StatusBars,
  Spacer,
  Buttons,
  CheckBoxes,
} from "../../../components";
import { goBack } from "../../../navigation/rootNavigation";
import { colors, responsiveHeight, responsiveWidth } from "../../../services";
import { ScrollView, TouchableOpacity, View, StyleSheet } from "react-native";

const mockCategories = ["Food", "Electronics", "Clothing", "Books", "Toys"];
const mockSubcategories = ["Mobile", "Laptops", "Fiction", "Shirts", "Shoes"];

const Filter = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  const toggleSelection = (item, selectedItems, setSelectedItems) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const renderOptions = (items, selectedItems, setSelectedItems) => (
    <View style={styles.optionContainer}>
      {items.map((item, index) => {
        const isSelected = selectedItems.includes(item);
        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionBox,
              isSelected && {
                borderColor: colors.primary,
                backgroundColor: colors.appColor11,
              },
            ]}
            onPress={() =>
              toggleSelection(item, selectedItems, setSelectedItems)
            }
          >
            <Text style={{ color: colors.black }}>{item}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <Wrapper isMain>
      <StatusBars.Dark />
      <Headers.Primary
        title="Select a category"
        onBackPress={goBack}
        showBackArrow
        IconLeftSize={20}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Wrapper paddingHorizontalBase paddingVerticalBase>
          <Text isBoldFont>Category</Text>
          <Spacer isSmall />
          {renderOptions(
            mockCategories,
            selectedCategories,
            setSelectedCategories
          )}

          <Spacer isMedium />

          <Text isBoldFont>Subcategory</Text>
          <Spacer isSmall />
          {renderOptions(
            mockSubcategories,
            selectedSubcategories,
            setSelectedSubcategories
          )}
        </Wrapper>
      </ScrollView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  optionBox: {
    // borderWidth: 1,
    borderColor: colors.border || "#ccc",
    backgroundColor: colors.lightGreen,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 15,
    marginBottom: 8,
  },
});

export default Filter;
