import {Platform, Alert} from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

export async function requestLocationPermission() {
  try {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    const status = await check(permission);

    switch (status) {
      case RESULTS.UNAVAILABLE:
        Alert.alert('Location not available', 'This feature is not supported.');
        return false;

      case RESULTS.DENIED:
        const newStatus = await request(permission);
        return newStatus === RESULTS.GRANTED;

      case RESULTS.GRANTED:
        return true;

      case RESULTS.LIMITED:
        return true;

      case RESULTS.BLOCKED:
        Alert.alert(
          'Location Permission Blocked',
          'Please enable location access in settings.',
          [
            {text: 'Cancel', style: 'cancel'},
            {
              text: 'Open Settings',
              onPress: () => openSettings(),
            },
          ],
        );
        return false;
    }
  } catch (err) {
    console.error('Error checking location permission:', err);
    return false;
  }
}
