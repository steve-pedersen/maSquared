import { 
    SAVE_SURVEY_A,
    GET_SURVEY_A, 
} from '../actions/types';


const INITIAL_STATE = {
    1: {
        value: null,
    },
    2: {
        value: null,
    },
    3: {
        value: null,
    },
    4: {
        value: null,
    },
    5: {
        value: null,
    },
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_SURVEY_A:
            // console.log('in save survey reducer', action);
            return { ...state, ...action.payload };
        case GET_SURVEY_A:
            // console.log('in getSurveyA reducer', action, action.payload);
            return state[action.payload]; // ?
        default:
            return state;
    }
};