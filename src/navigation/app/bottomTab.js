import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Icon} from '@rneui/base';
import {
  colors,
  routes,
  responsiveFontSize,
  responsiveWidth,
} from '../../services';
import * as App from '../../screens/app';

const BottomTabStack = createBottomTabNavigator();

function CustomTabBar({state, descriptors, navigation}) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        // Middle FAB (+) Button
        if (route.name === routes.addPost) {
          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              onPress={() => navigation.navigate(route.name)}
              style={styles.fabButton}>
              <Icon name="plus" type="feather" color="#fff" size={28} />
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            onPress={() => navigation.navigate(route.name)}
            style={styles.tabItem}>
            {options.tabBarIcon &&
              options.tabBarIcon({
                color: isFocused ? colors.appColor11 : colors.appBgColor4,
                size: responsiveFontSize(24),
                focused: isFocused,
              })}
            <Text
              style={{
                color: isFocused ? colors.appColor11 : colors.appBgColor4,
                fontSize: 12,
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function BottomTabNavigation() {
  const tabIconSize = responsiveFontSize(25);

  return (
    <BottomTabStack.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{headerShown: false}}>
      <BottomTabStack.Screen
        name={routes.home}
        component={App.Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, focused}) => (
            <Icon name="home" type="feather" size={tabIconSize} color={color} />
          ),
        }}
      />
      <BottomTabStack.Screen
        name={routes.categories}
        component={App.Categories}
        options={{
          tabBarLabel: 'Categories',
          tabBarIcon: ({color}) => (
            <Icon
              name="globe"
              type="feather"
              size={tabIconSize}
              color={color}
            />
          ),
        }}
      />
      <BottomTabStack.Screen
        name={routes.addPost}
        component={App.AddPost}
        options={{
          tabBarLabel: 'AddPost',
          tabBarIcon: () => null,
        }}
      />
      <BottomTabStack.Screen
        name={routes.myItem}
        component={App.MyItem}
        options={{
          tabBarLabel: 'My Items',
          tabBarIcon: ({color}) => (
            <Icon name="list" type="feather" size={tabIconSize} color={color} />
          ),
        }}
      />
      <BottomTabStack.Screen
        name={routes.profile}
        component={App.Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <Icon name="user" type="feather" size={tabIconSize} color={color} />
          ),
        }}
      />
    </BottomTabStack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 65,
    backgroundColor: colors.appBgColor1,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  fabButton: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: colors.appColor11,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30, // floating effect
  },
});
