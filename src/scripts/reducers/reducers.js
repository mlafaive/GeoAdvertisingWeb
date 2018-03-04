import { combineReducers } from 'redux';

import { currentUrl } from './url';
import { stats } from './stats';

const reducer = combineReducers({
  currentUrl,
  stats,
})

export default reducer;
