import { 
    SAVE_SURVEY 
} from '../actions/types';

const INITIAL_STATE = { complete: false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_SURVEY:
            return { ...state, complete: action.payload };
        default:
            return state;
    }
};