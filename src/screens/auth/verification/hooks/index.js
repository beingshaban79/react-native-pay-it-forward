import {useState} from 'react';
import {navigate} from '../../../../navigation/rootNavigation';
import {VerifyOTP, routes} from '../../../../services';
import {Toasts} from '../../../../components';
export function useHooks(phone_no) {
  console.log('phone>>>>', phone_no);
  const [form, setForm] = useState({
    otp: '',
  });

  const handleVerifyOTP = async () => {
    try {
      const res = await VerifyOTP({
        phone_email: phone_no,
        otp_code: form.otp,
      });
      if (res?.status) {
        navigate(routes.signin);

        Toasts.Success('Verification successful');
      } else {
        Toasts.Error(res.message);
        console.log('Verification failed:', res);
      }
    } catch (err) {
      console.error('Verification error:', err);
      Toasts.Error('Something went wrong. Please try again');
    }
  };

  return {
    ...form,
    setForm,
    handleVerifyOTP,
  };
}
