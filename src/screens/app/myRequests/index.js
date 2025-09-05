import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
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

export default function MyRequests() {
  const [activeTab, setActiveTab] = useState("active");

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
          <TouchableOpacity>
            <Icon name="more-vertical" type="feather" size={16} />
          </TouchableOpacity>
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
          <View style={styles.cardFooter}>
            <Text isTiny isGray>
              {item.views} views
            </Text>
            <Text isTiny isGray>
              {item.requests} requests
            </Text>
          </View>
        </Wrapper>
        <Spacer isTiny />
      </View>
    </View>
  );

  return (
    <Wrapper isMain style={{ backgroundColor: colors.appBgColor3 }}>
      <Spacer isStatusBarHeigt />
      <ListHeader
        title="Requests"
        subtitle="Manage your donation requests"
        showSearchInput={false}
      />

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => setActiveTab("active")}
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
          onPress={() => setActiveTab("past")}
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

      <FlashList
        data={data}
        keyExtractor={(item) => item.id}
        estimatedItemSize={120}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 12, paddingTop: 10 }}
      />
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
});
