import { 
    SAVE_SURVEY_B,
    GET_SURVEY_B, 
    RESET_SURVEY_B
} from '../actions/types';


const INITIAL_STATE = {
    1: { value: null },
    2: { value: null },
    3: { value: null },
    4: { value: null },
    5: { value: null },
    6: { value: null },
    7: { value: null },
    8: { value: null },
    9: { value: null },
    10: { value: null },
    11: { value: null },
    12: { value: null },
    13: { value: null },
    14: { value: null },
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_SURVEY_B:
            // console.log('in save surveyB reducer', action);
            return { ...state, ...action.payload };
        case GET_SURVEY_B:
            // console.log('in getSurveyB reducer', action, action.payload);
            return state[action.payload]; // ?
        case RESET_SURVEY_B:
            return INITIAL_STATE;
        default:
            return state;
    }
};