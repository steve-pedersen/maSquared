import { 
    SAVE_CONSENT,
    GET_CONSENT,
} from '../actions/types';

const INITIAL_STATE = { value: false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_CONSENT:
            return { ...state, value: action.payload };
        case GET_CONSENT:
            return state.value;
        default:
            return state;
    }
};