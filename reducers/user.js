import { 
    SAVE_DEVICE
} from '../actions/types';

const INITIAL_STATE = {
    deviceID: null,
    userID: null,
};

function userReducer(state = INITIAL_STATE, action) { 
    switch (action.type) {
        case SAVE_DEVICE:
            return {...state, ...action.payload};
        default:
            return state;
    }
}

export default userReducer;