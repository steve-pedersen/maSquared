import { 
    SAVE_SURVEY,
    COMPLETE_INTRO_SURVEY,
} from '../actions/types';

// const INITIAL_STATE = { 
//     complete: false,
//     dateCompleted: null,
//     user: {},
//     appendices: {}
// };

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_SURVEY:
            return [ ...state, 
                {
                    complete: false,
                    dateCompleted: new Date(),
                    appendices: action.payload.appendices,
                    user: action.payload.user
                }
            ];
        case COMPLETE_INTRO_SURVEY:
            return { ...state, complete: action.payload };
        default:
            return state;
    }
};