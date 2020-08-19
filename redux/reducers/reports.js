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
    // console.log('in reports reducer', action.payload);
    
    switch (action.type) {
        case ADD_AGGRESSION_REPORT:
            let newAggReport = {};
            newAggReport = {
                type: 'MICROAGGRESSION',
                reportId: action.payload.reportId,
                dateCompleted: new Date(),
                report: action.payload.report,
                user: action.payload.user
            };

            return [...state, newAggReport];

            // return [...state, 
            //     {
            //         type: 'MICROAGGRESSION',
            //         dateCompleted: new Date(),
            //         report: action.payload.report,
            //         user: action.payload.user
            //     }
            // ];
        case ADD_AFFIRMATION_REPORT:
            let newAffReport = {};
            newAffReport = {
                type: 'MICROAFFIRMATION',
                reportId: action.payload.reportId,
                dateCompleted: new Date(),
                report: action.payload.report,
                user: action.payload.user
            };
            
            return [...state, newAffReport];            
        
        
            // return [...state, 
            //     {
            //         type: 'MICROAFFIRMATION',
            //         dateCompleted: new Date(),
            //         report: action.payload.report,
            //         user: action.payload.user
            //     }
            // ];
        default:
            return state;
    }
}

export default reportsReducer;