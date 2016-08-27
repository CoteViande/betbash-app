import auth from './authReducer';
import scenes from './sceneReducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  scenes,
  auth
});

export default rootReducer;