import {Toasts} from '../../../../components';
import {routes} from '../../../../services';
import {
  getPreferencesCategories,
  addPreferencesCategories,
} from '../../../../services/backend/categories';

export function useHooks() {
  const getCategories = async () => {
    try {
      const res = await getPreferencesCategories();
      console.log('getPreferencesCategories:', res);

      return res.data;
    } catch (err) {
      console.error('Preferences Categories error:', err);
      Toasts.Error('Something went wrong. Please try again');
      return [];
    }
  };

  const handleSaveCategories = async (selected = []) => {
    try {
      const cleaned = selected.map(item => String(item));

      console.log('Saving categories:', cleaned);

      const res = await addPreferencesCategories(cleaned);

      if (res?.status) {
        Toasts.Success('Save Categories successful');
      } else {
        Toasts.Error(res?.message || 'Failed to save categories');
        console.log('Save Categories failed:', res);
      }
    } catch (err) {
      console.error('Save Categories error:', err);
      Toasts.Error('Something went wrong. Please try again');
    }
  };

  return {handleSaveCategories, getCategories};
}
