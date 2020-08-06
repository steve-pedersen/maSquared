import { 
    SAVE_INTRO_SURVEY,
    COMPLETE_INTRO_SURVEY,
} from '../actions/types';

const INITIAL_STATE = {
    complete: false,
    dateCompleted: null,
    appendices: {},
    user: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_INTRO_SURVEY:
            return { 
                ...state, 
                complete: true,
                dateCompleted: new Date(),
                appendices: action.payload.appendices,
                user: action.payload.user
            };
        case COMPLETE_INTRO_SURVEY:
            return { ...state, complete: action.payload };
        default:
            return state;
    }
};