import {useState} from 'react';
import {Toasts} from '../../../../components';
import {navigate} from '../../../../navigation/rootNavigation';
import {forgotPassword, routes} from '../../../../services';

export function useHooks(value) {
  const [errors, setErrors] = useState('');
  const handleForgotPass = async () => {
    if (!value.trim()) {
      setErrors('This field is required');
      return;
    }
    try {
      const res = await forgotPassword({
        phone_email: value,
      });
      console.log('res');
      if (res?.status) {
        navigate(routes.signin);

        Toasts.Success(res.message);
      } else {
        Toasts.Error(res.message);
        console.log('forgot Password failed:', res);
      }
    } catch (err) {
      console.error('forgot Password error:', err);
      Toasts.Error('Something went wrong. Please try again');
    }
  };
  return {handleForgotPass, errors};
}
