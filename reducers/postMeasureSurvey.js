import { 
    SAVE_POST_MEASURE_SURVEY 
} from '../actions/types';


const INITIAL_STATE = {
    q1: undefined,
    q1a: '',
    q2: undefined,
    q2a: '',
    q3: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_POST_MEASURE_SURVEY:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};