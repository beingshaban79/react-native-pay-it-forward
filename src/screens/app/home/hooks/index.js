import {navigate} from '../../../../navigation/rootNavigation';
import {routes} from '../../../../services';
export function useHooks() {
  const handleOpenPostDetail = data => {
    navigate(routes.postDetail, data);
  };

  return {handleOpenPostDetail};
}
