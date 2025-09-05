import {Linking} from 'react-native';

export function useHooks() {
  const handleCall = () => {
    Linking.openURL(`tel:+1234567890`);
  };

  const handleMessage = () => {
    Linking.openURL(`sms:+1234567890`);
  };
  return {handleCall, handleMessage};
}
