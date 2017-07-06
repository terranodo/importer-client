import {combineReducers} from 'redux';
import server from './server/reducers';
import uploads from './uploads/reducers';
import layerImportConfig from './layerimportconfig/reducers';

const rootReducer = combineReducers({
  server,
  uploads,
  layerImportConfig
});

export default rootReducer;
