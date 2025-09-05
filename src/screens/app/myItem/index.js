import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import ListHeader from "../../../components/listHeader";
import { Text, Wrapper, Spacer } from "../../../components";
import {
  colors,
  responsiveHeight,
  responsiveWidth,
  routes,
} from "../../../services";
import { Icon } from "@rneui/base";
import { navigate } from "../../../navigation/rootNavigation";

const activeItems = [
  {
    id: "1",
    title: "Vintage Coffee Table",
    category: "Furniture",
    date: "2 days ago",
    image: "https://picsum.photos/300/200?random=1",
    views: 23,
    requests: 3,
  },
  {
    id: "2",
    title: "Study Lamp",
    category: "Home",
    date: "5 days ago",
    image: "https://picsum.photos/300/200?random=2",
    views: 15,
    requests: 1,
  },
  {
    id: "3",
    title: "Winter Jacket",
    category: "Clothing",
    date: "1 week ago",
    image: "https://picsum.photos/300/200?random=3",
    views: 8,
    requests: 0,
  },
];

const pastItems = [
  {
    id: "4",
    title: "Old Radio",
    category: "Electronics",
    date: "2 weeks ago",
    image: "https://picsum.photos/300/200?random=4",
    views: 12,
    requests: 0,
  },
];

export default function MyItem() {
  const [activeTab, setActiveTab] = useState("active");
  const [menuVisibleId, setMenuVisibleId] = useState(null);

  const data = activeTab === "active" ? activeItems : pastItems;

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.image }}
        style={styles.cardImage}
        resizeMode="cover"
      />

      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text isSmall isBoldFont numberOfLines={1}>
            {item.title}
          </Text>
          <View style={{ position: "relative" }}>
            <TouchableOpacity onPress={() => setMenuVisibleId(item.id)}>
              <Icon name="more-vertical" type="feather" size={18} />
            </TouchableOpacity>

            {menuVisibleId === item.id && (
              <View style={styles.popupMenu}>
                <TouchableOpacity
                  onPress={() => {
                    setMenuVisibleId(null);
                    // navigate(routes.editItem, { itemId: item.id });
                  }}
                  style={styles.menuOption}
                >
                  <Icon
                    name="edit-2"
                    type="feather"
                    size={14}
                    color={colors.appTextColor1}
                  />
                  <Text isTiny style={styles.menuOptionText}>
                    Edit
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setMenuVisibleId(null);
                  }}
                  style={styles.menuOption}
                >
                  <Icon name="trash-2" type="feather" size={14} color="red" />
                  <Text
                    isTiny
                    style={[styles.menuOptionText, { color: "red" }]}
                  >
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <Text isSmall isGray>
          {item.category} • {item.date}
        </Text>

        <Spacer isTiny />

        <Wrapper flexDirectionRow alignItemsCenter justifyContentSpaceBetween>
          <View style={styles.badge}>
            <Text isTiny style={{ color: "#60B17C" }}>
              Active
            </Text>
          </View>
          <TouchableOpacity
            style={styles.requestsButton}
            onPress={() => navigate(routes.myRequests, { itemId: item.id })}
          >
            <Icon
              name="users"
              type="feather"
              size={14}
              color={colors.appColor11}
            />
            <Spacer isSmall horizontal />
            <Text isTiny style={styles.requestsText}>
              {item.requests} requests
            </Text>
          </TouchableOpacity>
        </Wrapper>
        <Spacer isTiny />
      </View>
    </View>
  );

  return (
    <Wrapper isMain style={{ backgroundColor: colors.appBgColor3 }}>
      <Spacer isStatusBarHeigt />

      <ListHeader
        title="My Listings"
        subtitle="Manage your donations"
        showSearchInput={false}
        showAddButton
        onAddItemPress={() => navigate(routes.addPost)}
      />

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => {
            setMenuVisibleId(null);
            setActiveTab("active");
          }}
          style={[
            styles.tabButton,
            activeTab === "active" && styles.activeTabButton,
          ]}
        >
          <Text
            isSmall
            isBoldFont
            style={activeTab === "active" && styles.activeTabText}
          >
            Active ({activeItems.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setMenuVisibleId(null);
            setActiveTab("past");
          }}
          style={[
            styles.tabButton,
            activeTab === "past" && styles.activeTabButton,
          ]}
        >
          <Text
            isSmall
            isBoldFont
            style={activeTab === "past" && styles.activeTabText}
          >
            Past ({pastItems.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Add Pressable here to detect outside clicks */}
      <Pressable onPress={() => setMenuVisibleId(null)} style={{ flex: 1 }}>
        <FlashList
          data={data}
          keyExtractor={(item) => item.id}
          estimatedItemSize={120}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 12, paddingTop: 10 }}
        />
      </Pressable>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    backgroundColor: colors.appBgColor2,
    marginHorizontal: 12,
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 10,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  activeTabButton: {
    backgroundColor: colors.appBgColor1,
    borderRadius: 10,
  },
  activeTabText: {
    color: colors.appTextColor1,
  },
  card: {
    flexDirection: "row",
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
    justifyContent: "center",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badge: {
    backgroundColor: colors.lightGreen,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  popupMenu: {
    position: "absolute",
    top: 24,
    right: 0,
    width: 100,
    backgroundColor: colors.appBgColor1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 10,
  },
  menuOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  menuOptionText: {
    marginLeft: 6,
    color: colors.appTextColor1,
  },
});
