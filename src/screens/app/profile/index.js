import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Switch,
  Image,
  Linking,
  Alert,
} from "react-native";
import { Text, Wrapper, Spacer } from "../../../components";
import {
  colors,
  responsiveWidth,
  responsiveHeight,
  routes,
} from "../../../services";
import { color, Icon } from "@rneui/base";
import { useHooks } from "./hooks";
import { navigate } from "../../../navigation/rootNavigation";
import { useSelector } from "react-redux";
export default function ProfileScreen() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const savedItems = useSelector((state) => state.saved?.items) || [];
  const togglePush = () => setPushEnabled(!pushEnabled);
  const { handleLogout } = useHooks();
  return (
    <Wrapper isMain style={{ backgroundColor: colors.appBgColor3 }}>
      <Spacer isStatusBarHeigt />
      <Wrapper
        style={{
          marginHorizontal: 5,
          borderRadius: 8,
        }}
        backgroundColor={colors.appBgColor1}
        paddingVerticalBase
      >
        <View style={styles.header}>
          <Image
            source={{ uri: "https://picsum.photos/300/200?random=4" }}
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
              <Text isSmall style={{ marginLeft: 4 }}>
                4.9 rating
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigate(routes.createAccount, { isEdit: true })}
            style={styles.editBtn}
          >
            <Wrapper
              style={{
                borderWidth: 1,
                borderRadius: 7,
                borderColor: colors.appBgColor5,
              }}
              gap={7}
              paddingHorizontalSmall
              paddingVerticalTiny
              flexDirectionRow
              alignItemsCenter
            >
              <Icon
                name="edit-3"
                type="feather"
                size={16}
                color={colors.appTextColor1}
              />
              <Text children={"Edit"} />
            </Wrapper>
          </TouchableOpacity>
        </View>
        <View style={styles.statsRow}>
          {[
            { label: "Items Given", value: 12 },
            { label: "Items Received", value: 8 },
            { label: "Member Since", value: 2024 },
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
      </Wrapper>
      <Spacer isBasic />
      {[
        {
          label: "Saved Items",
          icon: "heart",
          count: savedItems.length,
          press: () => navigate(routes.savedItems),
        },
        {
          label: "Notifications",
          icon: "bell",
          press: () => console.log("Pressed Notifications"),
        },
        {
          label: "Settings",
          icon: "settings",
          press: () => navigate(routes.settings),
        },
        {
          label: "Privacy & Support",
          icon: "user",
          press: () => Linking.openURL("https://www.google.com"),
        },

        {
          label: "Logout",
          icon: "log-out",
          press: () => {
            Alert.alert(
              "Confirm Logout",
              "Are you sure you want to logout?",
              [
                { text: "Cancel", style: "cancel" },
                { text: "Logout", onPress: handleLogout, style: "destructive" },
              ],
              { cancelable: true }
            );
          },
        },
      ].map((item, id) => (
        <TouchableOpacity key={id} style={styles.menuItem} onPress={item.press}>
          <View style={styles.menuLeft}>
            <Icon
              style={{
                backgroundColor:
                  item.label === "Logout" ? colors.error2 : colors.appBgColor3,
                padding: 8,
                borderRadius: 12,
              }}
              name={item.icon}
              color={
                item.label === "Logout"
                  ? colors.appBgColor1
                  : colors.appTextColor1
              }
              type="feather"
              size={18}
            />
            <Text
              isSmall
              style={[
                styles.menuText,
                {
                  color:
                    item.label === "Logout"
                      ? colors.error2
                      : colors.appTextColor1,
                },
              ]}
            >
              {item.label}
            </Text>
          </View>
          <View style={styles.menuRight}>
            {item.count && (
              <View style={styles.countBadge}>
                <Text isMediumFont isTiny style={{ color: "black" }}>
                  {item.count}
                </Text>
              </View>
            )}
            <Icon name="chevron-right" type="feather" size={18} />
          </View>
        </TouchableOpacity>
      ))}
      <View style={styles.notificationPref}>
        <Text isSmall isBoldFont>
          Push Notifications
        </Text>
        <Wrapper flexDirectionRow alignItemsCenter justifyContentSpaceBetween>
          <Text isSmall isGray>
            Get notified about new items and requests
          </Text>
          <Switch
            thumbColor={colors.appBgColor1}
            trackColor={{ false: colors.appBgColor4, true: colors.appColor11 }}
            value={pushEnabled}
            onValueChange={togglePush}
          />
        </Wrapper>
      </View>
    </Wrapper>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
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
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  editBtn: {
    padding: 6,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  statBox: {
    alignItems: "center",
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 22,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.appBgColor1,
    marginBottom: 7,
    marginHorizontal: 5,
    borderRadius: 8,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuText: {
    marginLeft: 12,
  },
  menuRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  countBadge: {
    backgroundColor: colors.appBgColor3,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 8,
  },
  notificationPref: {
    padding: 16,
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
});
