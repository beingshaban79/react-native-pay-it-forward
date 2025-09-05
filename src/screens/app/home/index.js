import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "../../../services/helper/hooks/useLocation";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Wrapper, Text, Spacer, TextInputs } from "../../../components";
import {
  colors,
  getListings,
  responsiveHeight,
  routes,
} from "../../../services";
import { Icon } from "@rneui/base";
import ListHeader from "../../../components/listHeader";
import { useHooks } from "./hooks";
import { useDispatch, useSelector } from "react-redux";
import { toggleSave } from "../../../store/reducers/savedSlice";
import { navigate } from "../../../navigation/rootNavigation";

export default function Home() {
  const { handleOpenPostDetail } = useHooks();
  const [searchQuery, setSearchQuery] = useState("");
  const [listings, setListings] = useState([]);
  const [loadingListings, setLoadingListings] = useState(false);

  const dispatch = useDispatch();
  const { location, loading, error, refresh } = useLocation();
  const savedItems = useSelector((state) => state.saved?.items) || [];

  const isSaved = (id) => savedItems.some((item) => item.id === id);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    setLoadingListings(true);
    try {
      const res = await getListings();

      if (res?.listing_id && Array.isArray(res.listing_id)) {
        const normalized = res.listing_id.map((item, index) => {
          // Safely parse images field
          let parsedImages = [];
          try {
            if (typeof item.images === "string" && item.images !== "[]") {
              parsedImages = JSON.parse(item.images);
            }
          } catch (e) {
            console.warn("Failed to parse images for item:", item.id);
          }

          const imageBaseUrl = "https://yourdomain.com/uploads/"; // Replace with your actual image base URL if needed
          const firstImage = parsedImages?.[0]
            ? `${imageBaseUrl}${parsedImages[0]}`
            : `https://picsum.photos/300/200?random=${index}`;

          return {
            ...item,
            image: firstImage,
            km: item.km || "1.2km",
            time: item.time || "Just now",
            location: item.pickup_address || "Unknown",
          };
        });
        setListings(normalized);
      } else {
        console.warn("No valid listing data found in response.");
      }
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
    setLoadingListings(false);
  };

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return listings;
    const lower = searchQuery.toLowerCase();
    return listings.filter(
      (item) =>
        item.title?.toLowerCase().includes(lower) ||
        item.category?.toLowerCase().includes(lower) ||
        item.location?.toLowerCase().includes(lower)
    );
  }, [searchQuery, listings]);

  const renderItem = ({ item }) => {
    return (
      <Wrapper style={styles.card}>
        <TouchableOpacity onPress={() => handleOpenPostDetail(item)}>
          <View>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.tag}>
              <Text isTiny isBoldFont style={{ color: colors.appTextColor1 }}>
                {item.category}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.heartIcon}
              onPress={() => dispatch(toggleSave(item))}
            >
              <Icon
                name={isSaved(item.id) ? "heart" : "heart-outline"}
                type="ionicon"
                size={22}
                color={isSaved(item.id) ? "red" : colors.appTextColor1}
              />
            </TouchableOpacity>
          </View>
          <Wrapper paddingHorizontalSmall paddingVerticalSmall>
            <Text isMedium isBoldFont numberOfLines={1}>
              {item.title}
            </Text>
            <Text isSmall isGray numberOfLines={2}>
              {item.description}
            </Text>
            <Spacer height={5} />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Icon
                  name="location-outline"
                  type="ionicon"
                  size={15}
                  color={colors.appTextColor4}
                />
                <Text isTiny isLightGray>
                  {`${item.km}`} +
                </Text>
                <Text isTiny isLightGray>{`${item.location}`}</Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Icon
                  name="time-outline"
                  type="ionicon"
                  size={15}
                  color={colors.appTextColor4}
                />
                <Text isTiny isLightGray>{`${item.time}`}</Text>
              </View>
            </View>
          </Wrapper>
        </TouchableOpacity>
      </Wrapper>
    );
  };

  return (
    <Wrapper isMain style={{ backgroundColor: colors.appBgColor3 }}>
      <Spacer isStatusBarHeigt />
      <ListHeader
        title="Good Morning!"
        subtitle="Find Items near you"
        showSearchInput={true}
        searchPlaceholder="Search for items..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        showFilter
        onFilterPress={() => navigate(routes.filter)}
      />

      <FlashList
        data={filteredData}
        renderItem={renderItem}
        estimatedItemSize={200}
        keyExtractor={(item) => item.id?.toString()}
        contentContainerStyle={{ padding: 15 }}
        ItemSeparatorComponent={() => <Spacer height={15} />}
        refreshing={loadingListings}
        onRefresh={fetchListings}
      />
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: colors.appBgColor1,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.appBgColor3,
    borderRadius: 50,
    justifyContent: "center",
  },
  iconButton: {
    padding: 8,
  },
  card: {
    borderRadius: 15,
    backgroundColor: colors.appBgColor1,
    borderColor: colors.appBgColor4,
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: responsiveHeight(21),
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: colors.appBgColor1,
    borderRadius: 20,
    padding: 5,
    opacity: 0.7,
  },
  tag: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: colors.appBgColor1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    opacity: 0.7,
  },
});
