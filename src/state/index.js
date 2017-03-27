import {combineReducers} from 'redux';
import server from './server/reducers';
import uploads from './uploads/reducers';

const rootReducer = combineReducers({
  server,
  uploads
});

export default rootReducer;
