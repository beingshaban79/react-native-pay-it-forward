import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { Icon } from "@rneui/base";
import { colors } from "../../services";

const CustomCheckbox = ({ checked, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View
        style={[
          styles.box,
          {
            borderColor: checked ? colors.appColor11 : "#ccc",
            backgroundColor: checked ? colors.appColor11 : "transparent",
          },
        ]}
      >
        {checked && <Icon name="check" size={14} color={"white"} />}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomCheckbox;
