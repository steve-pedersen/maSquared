import { 
    SAVE_AGGRESSION_REPORT,
    SAVE_AFFIRMATION_REPORT,
    SAVE_SURVEY_A,
    SAVE_SURVEY_B,
    GET_SURVEY_A, 
} from '../actions/types';

function reportsReducer(state = [], action) {
    switch (action.type) {
        case SAVE_AGGRESSION_REPORT:
            return [...state, action.payload];
        case SAVE_AFFIRMATION_REPORT:
            return [...state, action.payload];
        default:
            return state;
    }
}

export default reportsReducer;