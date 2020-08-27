import { 
    SAVE_DEVICE,
    SAVE_USER,
    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
    deviceId: null,
    userId: null,
    groupId: null,
    university: '',
    loading: true,
    errorMessage: '',
    createdDate: '',
    pushToken: '',
    lastSyncDate: null
};

function userReducer(state = INITIAL_STATE, action) { 
    switch (action.type) {
        case SAVE_DEVICE:
            return {...state, ...action.payload};
        case SAVE_USER:
            return {...state, ...action.payload};
        case GET_USER: 
            return {...state, loading: action.payload};
        case GET_USER_SUCCESS:
            return {
                ...state, 
                userId: action.payload, 
                loading: action.loading
            };
        case GET_USER_ERROR:
            return {...state, errorMessage: action.payload, loading: action.loading};
        default: 
            return state;
    }
}

export default userReducer;