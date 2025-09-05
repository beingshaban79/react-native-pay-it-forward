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
import { ScrollView, Switch } from "react-native";
import Slider from "@react-native-community/slider";
import CustomCheckbox from "../../../components/settingsCheckbox";

const Settings = () => {
  const [notificationRadiusEnabled, setNotificationRadiusEnabled] =
    useState(false);
  const [categoryNotificationsEnabled, setCategoryNotificationsEnabled] =
    useState(false);
  const [radius, setRadius] = useState(5);

  const [categories, setCategories] = useState({
    Electronics: false,
    Furniture: false,
    Clothing: false,
    Books: false,
    Other: false,
  });

  const toggleCategory = (key) => {
    setCategories((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <Wrapper isMain>
      <StatusBars.Dark />
      <Headers.Primary
        title="Settings"
        onBackPress={goBack}
        showBackArrow
        IconLeftSize={20}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Wrapper paddingHorizontalBase paddingVerticalBase>
          {/* Notifications */}
          <Text isBoldFont>Notifications</Text>
          <Spacer isSmall />
          <Wrapper>
            <Text isMediumFont>Notification Radius</Text>
            <Wrapper flexDirectionRow justifyContentSpaceBetween>
              <Text
                style={{
                  color: colors.appTextColor9,
                }}
                isSmall
              >
                Receive notifications for items within a{"\n"}certain radius of
                your location.
              </Text>
              <Switch
                value={notificationRadiusEnabled}
                onValueChange={setNotificationRadiusEnabled}
                trackColor={{ false: "#ccc", true: colors.appColor11 }}
                thumbColor={
                  notificationRadiusEnabled ? colors.white : colors.gray
                }
              />
            </Wrapper>
          </Wrapper>

          {notificationRadiusEnabled && (
            <>
              <Spacer isMedium />
              <Wrapper flexDirectionRow justifyContentSpaceBetween>
                <Text
                  style={{
                    color: colors.appBgColor6,
                  }}
                  isSmall
                  isMediumFont
                >
                  Radius
                </Text>
                <Text
                  isSmall
                  isMediumFont
                  style={{ marginRight: responsiveWidth(1) }}
                >
                  {radius}km
                </Text>
              </Wrapper>
              <Spacer isTiny />
              <Slider
                style={{ flex: 1 }}
                minimumValue={1}
                maximumValue={50}
                step={1}
                value={radius}
                minimumTrackTintColor={colors.appColor11}
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor={colors.appColor11}
                onValueChange={(val) => setRadius(val)}
              />
            </>
          )}

          <Spacer isBasic />

          {/* Categories */}
          <Text isBoldFont>Categories</Text>
          <Spacer isSmall />
          <Wrapper flexDirectionRow justifyContentSpaceBetween alignItemsCenter>
            <Wrapper>
              <Text isMediumFont>Category Notifications</Text>
              <Text isSmall style={{ color: colors.appTextColor9 }}>
                Receive notifications for items in specific{"\n"}categories.
              </Text>
            </Wrapper>
            <Switch
              value={categoryNotificationsEnabled}
              onValueChange={setCategoryNotificationsEnabled}
              trackColor={{ false: "#ccc", true: colors.appColor11 }}
              thumbColor={
                categoryNotificationsEnabled ? colors.white : colors.gray
              }
            />
          </Wrapper>
          <Spacer isBasic />
          {categoryNotificationsEnabled && (
            <Wrapper gap={10}>
              {Object.keys(categories).map((key) => (
                <Wrapper
                  key={key}
                  flexDirectionRow
                  justifyContentSpaceBetween
                  alignItemsCenter
                >
                  <Text>{key}</Text>
                  <CustomCheckbox
                    checked={categories[key]}
                    onPress={() => toggleCategory(key)}
                  />
                </Wrapper>
              ))}
            </Wrapper>
          )}

          <Spacer isLarge />
        </Wrapper>
      </ScrollView>
    </Wrapper>
  );
};

export default Settings;
