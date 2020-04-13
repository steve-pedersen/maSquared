import { combineReducers } from 'redux';
import affirmationsReducer from './affirmations';

export default combineReducers({
    affirmations: affirmationsReducer,
});