import { ACTIVATE_SURVEY, DEACTIVATE_SURVEY  } from '../actions/types';
import Constants from 'expo-constants';

const INITIAL_STATE = {
  notificationId: null,
  isActive: false
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ACTIVATE_SURVEY:
            return {...state, ...action.payload};
        case DEACTIVATE_SURVEY:
            return INITIAL_STATE;
        default:
            return state;
    }
}