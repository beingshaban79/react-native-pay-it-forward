import {colors} from '../utilities/colors';
import {appStyles} from '../utilities/appStyles';
export const baseURL =
  'http://ec2-3-25-53-231.ap-southeast-2.compute.amazonaws.com/billboard_db_pif/public/api/';
export const endPoints = {
  register: {
    url_1: 'auth/sign-up',
  },
  login: {
    url_1: 'auth/login',
  },
  verify: {
    url_1: 'auth/verify-otp',
  },
  preferencesCategories: {
    url_1: 'user/preferences-categories',
  },
  listings: {
    url_1: 'listings',
  },
  forgotPass: {
    url_1: 'auth/forgot-password',
  },
};
export const routes = {
  //main stacks
  auth: 'auth',
  app: 'app',
  common: 'common',
  //auth
  splash: 'splash',
  signin: 'signin',
  createAccount: 'createAccount',
  forgotPassword: 'forgotPassword',
  verification: 'verification',
  //app
  otherUserProfile: 'otherUserProfile',
  bottomTab: 'bottomTab',
  home: 'home',
  savedItems: 'savedItems',
  categories: 'categories',
  addPost: 'addPost',
  myItem: 'myItem',
  profile: 'profile',
  settings: 'settings',
  filter: 'filter',
  myRequests: 'myRequests',
  postDetail: 'postDetail',
  smartFoodJournal: 'smartFoodJournal',
  sprayLogs: 'sprayLogs',
  userProfile: 'userProfile',
  weightLossRanking: 'weightLossRanking',
  //common
  termsOfService: 'termsOfService',
  privacyPolicy: 'privacyPolicy',
};
export const headers = {
  screenOptions: {
    // headerShown: false,
    title: 'Title',
    headerTitleAlign: 'left',
    headerStyle: [appStyles.headerStyle],
    headerTitleStyle: appStyles.headerTitleStyle,
    headerTintColor: colors.appTextColor4,
    headerBackTitle: ' ',
  },
};
export const tabs = {
  tabBarOptions: {
    showLabel: false,
    tabBarActiveTintColor: colors.appBgColor1,
    tabBarInactiveTintColor: colors.appBgColor1 + '60',
    allowFontScaling: true,
    tabBarStyle: [appStyles.tabBarStyle, appStyles.shadowExtraDark],
    activeBackgroundColor: '#FFFFFF40',
    //tabStyle: { borderRadius: 20, marginHorizontal: 7.5, marginVertical: 2 }
  },
};
export const imagePickerOptions = {
  title: 'Select Photo',
  quality: 1,
  maxWidth: 500,
  maxHeight: 500,
  // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
export const categories = [
  {
    id: '1',
    title: 'Furniture',
    icon: 'chair',
    type: 'font-awesome-5',
    items: 45,
    color: 'blue',
  },
  {
    id: '2',
    title: 'Toys & Games',
    icon: 'game-controller',
    type: 'ionicon',
    items: 32,
    color: 'red',
  },
  {
    id: '3',
    title: 'Electronics',
    icon: 'tv-outline',
    type: 'ionicon',
    items: 67,
    color: 'purple',
  },
  {
    id: '4',
    title: 'Clothes',
    icon: 'tshirt',
    type: 'font-awesome-5',
    items: 89,
    color: 'green',
  },
  {
    id: '5',
    title: 'Automotive',
    icon: 'car',
    type: 'font-awesome',
    items: 20,
    color: 'red',
  },
  {
    id: '6',
    title: 'Books & Media',
    icon: 'book',
    type: 'font-awesome',
    items: 54,
    color: 'orange',
  },
  {
    id: '7',
    title: 'Health & Beauty',
    icon: 'heart-outline',
    type: 'ionicon',
    items: 29,
    color: 'green',
  },
  {
    id: '8',
    title: 'Home & Garden',
    icon: 'home',
    type: 'material-community',
    items: 41,
    color: 'blue',
  },
];
export const postData = [
  {
    lat: 40.7128,
    lng: -74.006,
    id: '1',
    title: 'Vintage Wooden Coffee Table',
    description: 'Beautiful vintage design in excellent condition',
    category: 'Furniture',
    image: 'https://picsum.photos/300/200?random=1',
    location: 'Downtown',
    time: '2 hours ago',
    km: '0.8km',
  },
  {
    lat: 42.7128,
    lng: -71.006,
    id: '2',
    title: 'Kids Educational Toys',
    description: 'Toys for kids with fun learning',
    category: 'Toys',
    image: 'https://picsum.photos/300/200?random=2',
    location: 'Uptown',
    time: '1 day ago',
    km: '1.5km',
  },
  {
    lat: 32.7128,
    lng: -74.006,
    id: '3',
    title: 'Stylish Lamp',
    description: 'Modern lamp with warm light',
    category: 'Decor',
    image: 'https://picsum.photos/300/200?random=3',
    location: 'City Center',
    time: '3 hours ago',
    km: '0.4km',
  },
  {
    lat: 46.7128,
    lng: -74.006,
    id: '4',
    title: 'Office Chair',
    description: 'Ergonomic chair for home/office use',
    category: 'Furniture',
    image: 'https://picsum.photos/300/200?random=4',
    location: 'Downtown',
    time: '30 mins ago',
    km: '2.0km',
  },
];
