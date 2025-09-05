import {combineReducers} from '@reduxjs/toolkit';
import authReducer from './auth';
import savedReducer from './savedSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  saved: savedReducer,
});

export default rootReducer;
