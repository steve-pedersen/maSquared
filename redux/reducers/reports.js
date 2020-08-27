import { 
    SAVE_AGGRESSION_REPORT,
    SAVE_AFFIRMATION_REPORT,
    ADD_AGGRESSION_REPORT,
    ADD_AFFIRMATION_REPORT,
    SAVE_SURVEY_A,
    SAVE_SURVEY_B,
    GET_SURVEY_A, 
} from '../actions/types';

function reportsReducer(state = [], action) {

    switch (action.type) {
        case ADD_AGGRESSION_REPORT:
            let newAggReport = {};
            newAggReport = {
                type: 'MICROAGGRESSION',
                reportId: action.payload.reportId,
                dateCompleted: new Date(),
                report: action.payload.report,
                user: action.payload.user,
                complete: action.payload.complete
            };

            return [...state, newAggReport];

        case ADD_AFFIRMATION_REPORT:
            let newAffReport = {};
            newAffReport = {
                type: 'MICROAFFIRMATION',
                reportId: action.payload.reportId,
                dateCompleted: new Date(),
                report: action.payload.report,
                user: action.payload.user,
                complete: action.payload.complete
            };
            
            return [...state, newAffReport];            
        
        default:
            return state;
    }
}

export default reportsReducer;