import { 
    SAVE_SLIDESHOW
} from '../actions/types';

const INITIAL_STATE = { complete: false };

export default (state = INITIAL_STATE, action) => {  
    switch (action.type) {
        case SAVE_SLIDESHOW:
            return { ...state, complete: action.payload };
        default:
            return state;
    }
};