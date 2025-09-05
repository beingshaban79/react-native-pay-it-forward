import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routes, headers } from "../../services";
import * as App from "../../screens/app";
import BottomTab from "./bottomTab";
import * as Auth from "../../screens/auth";
const AppStack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <AppStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={routes.bottomTab}
    >
      <AppStack.Screen name={routes.bottomTab} component={BottomTab} />
      <AppStack.Screen name={routes.postDetail} component={App.PostDetail} />
      <AppStack.Screen name={routes.savedItems} component={App.SavedItems} />
      <AppStack.Screen
        name={routes.otherUserProfile}
        component={App.OtherUserProfile}
      />
      <AppStack.Screen
        name={routes.createAccount}
        component={Auth.CreateAccount}
      />

      <AppStack.Screen name={routes.settings} component={App.Settings} />
      <AppStack.Screen name={routes.filter} component={App.Filter} />
      <AppStack.Screen name={routes.myRequests} component={App.MyRequests} />
    </AppStack.Navigator>
  );
};

export default AppNavigation;
