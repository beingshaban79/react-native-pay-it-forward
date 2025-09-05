import {useDispatch} from 'react-redux';
import {logoutUser} from '../../../../store/reducers/auth';
import {navigate} from '../../../../navigation/rootNavigation';
import {routes} from '../../../../services';

export function useHooks() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());

    //  navigate(routes.auth);
  };

  return {handleLogout};
}
