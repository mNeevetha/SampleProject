import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import auth from './auth/reducer';
import flashMessage from './flashMessage/reducer';

import user from './user/reducer';
import apsQuery from './apsQuery/reducer';
import apsQueryRecord from './apsQueryRecord/reducer';
import apsRequestHistory from './apsRequestHistory/reducer';

const root = combineReducers({
  apsQuery,
  apsQueryRecord,
  apsRequestHistory,
  auth,
  flashMessage,
  routing,
  user,
});

export default root;
