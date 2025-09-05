import {useState, useEffect} from 'react';
import {navigate} from '../../../../navigation/rootNavigation';
import {login, routes} from '../../../../services';
import {saveSignedInUser} from '../../../../store/reducers/auth';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Toasts} from '../../../../components';

export function useHooks() {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [RememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  // 🔹 Load saved credentials if RememberMe was enabled
  useEffect(() => {
    const loadRememberedCredentials = async () => {
      try {
        const savedRememberMe = await AsyncStorage.getItem('rememberMe');
        if (savedRememberMe === 'true') {
          const savedEmail = await AsyncStorage.getItem('rememberedEmail');
          const savedPassword = await AsyncStorage.getItem(
            'rememberedPassword',
          );
          if (savedEmail) setEmail(savedEmail);
          if (savedPassword) setPassword(savedPassword);
          setRememberMe(true);
        }
      } catch (err) {
        console.error('Error loading remembered credentials:', err);
      }
    };

    loadRememberedCredentials();
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordVisible(prevState => !prevState);
  };

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'This field is required';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (validate()) {
      try {
        const res = await login({login: email, password});
        if (res?.token) {
          dispatch(saveSignedInUser(res));
          await AsyncStorage.setItem('authToken', res.token);

          // 🔹 Save credentials if RememberMe is enabled
          if (RememberMe) {
            await AsyncStorage.setItem('rememberMe', 'true');
            await AsyncStorage.setItem('rememberedEmail', email);
            await AsyncStorage.setItem('rememberedPassword', password);
          } else {
            await AsyncStorage.setItem('rememberMe', 'false');
            await AsyncStorage.removeItem('rememberedEmail');
            await AsyncStorage.removeItem('rememberedPassword');
          }

          Toasts.Success('Login successful');
          navigate(routes.app);
        } else {
          if (res.message === 'Verification required before login.') {
            navigate(routes.verification, email);
          }
          Toasts.Error(res.message);
          console.log('Login failed:', res);
        }
      } catch (err) {
        console.error('Login error:', err);
        Toasts.Error('Something went wrong. Please try again');
      }
    }
  };

  const handleRememberMe = () => {
    setRememberMe(!RememberMe);
  };

  return {
    handleLogin,
    RememberMe,
    setRememberMe,
    isPasswordVisible,
    setPasswordVisible,
    togglePasswordVisibility,
    handleRememberMe,
    email,
    setEmail,
    password,
    setPassword,
    errors,
  };
}
