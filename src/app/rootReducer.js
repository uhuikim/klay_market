import { combineReducers } from '@reduxjs/toolkit';

import modalReducer from 'slices/modalSlice';
import loginReducer from 'slices/loginSlice';

const rootReducer = combineReducers({
    modal: modalReducer,
    login: loginReducer
});

export default rootReducer;
