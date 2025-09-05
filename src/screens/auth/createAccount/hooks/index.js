import {useState} from 'react';
import {navigate} from '../../../../navigation/rootNavigation';
import {register, routes} from '../../../../services';
import {Toasts} from '../../../../components';

export function useHooks() {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [RememberMe, setRememberMe] = useState(false);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    state: '',
    suburb: '',
    // confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setPasswordVisible(prev => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(prev => !prev);
  };

  const handleChange = (key, value) => {
    setForm(prev => ({...prev, [key]: value}));
    setErrors(prev => ({...prev, [key]: ''}));
  };

  const validate = () => {
    const newErrors = {};

    // Validate each field
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9]{7,15}$/.test(form.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!form.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (!form.state.trim()) newErrors.state = 'State is required';
    if (!form.suburb.trim()) newErrors.suburb = 'Suburb is required';

    // if (form.confirmPassword !== form.password) {
    //   newErrors.confirmPassword = 'Passwords do not match';
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateAccount = async () => {
    if (validate()) {
      try {
        const res = await register(form);
        if (res?.status) {
          Toasts.Success('Register successful');
          navigate(routes.verification, form?.phone);
        } else {
          Toasts.Error(res.message);
          console.log('Register failed:', res);
        }
      } catch (err) {
        console.error('Register error:', err);
        Toasts.Error('Something went wrong. Please try again');
      }
    }
  };

  const handleRememberMe = () => {
    setRememberMe(!RememberMe);
  };

  return {
    ...form,
    errors,
    handleChange,
    handleCreateAccount,
    RememberMe,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    isPasswordVisible,
    isConfirmPasswordVisible,
    handleRememberMe,
  };
}
