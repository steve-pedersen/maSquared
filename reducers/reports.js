import { 
    SAVE_AGGRESSION_REPORT,
    SAVE_AFFIRMATION_REPORT,
    ADD_AGGRESSION_REPORT,
    SAVE_SURVEY_A,
    SAVE_SURVEY_B,
    GET_SURVEY_A, 
} from '../actions/types';

function reportsReducer(state = [], action) {
    // console.log('in reports reducer', action.payload);
    
    switch (action.type) {
        case ADD_AGGRESSION_REPORT:
            return [...state, action.payload];
        default:
            return state;
    }
}

export default reportsReducer;