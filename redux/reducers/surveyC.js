import { 
    SAVE_SURVEY_C,
    GET_SURVEY_C, 
    RESET_SURVEY_C
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
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_SURVEY_C:
            // console.log('in save surveyC reducer', action);
            return { ...state, ...action.payload };
        case GET_SURVEY_C:
            console.log('in getSurveyC reducer', action, action.payload);
            return state[action.payload]; // ?
        case RESET_SURVEY_C:
            return INITIAL_STATE;
        default:
            return state;
    }
};