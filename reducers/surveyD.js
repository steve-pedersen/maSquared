import { 
    SAVE_SURVEY_D,
} from '../actions/types';


const INITIAL_STATE = {
    1: { value: null },
    2: { value: null },
    3: { value: null },
    4: { value: null },
    "5a": { value: null },
    "5b": { value: null },
    "5c": { value: null },
    "5d": { value: null },
    "5e": { value: null },
    "5f": { value: null },
    "5g": { value: null },
    "5h": { value: null },
    "5i": { value: null },
    "5j": { value: null },
    6: { value: null },
    7: { value: null },
    8: { value: null },
    9: { value: null },
    10: { value: null },
    "10a": { value: null },
    "10b": { value: null },
    "10c": { value: null },
    "10d": { value: null },
    "10e": { value: null },
    "10eOther": { value: '' }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_SURVEY_D:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};