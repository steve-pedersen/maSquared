import { SAVE_AFFIRMATION_REPORT } from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case SAVE_AFFIRMATION_REPORT:
            return [...state, action.payload];
        default:
            return state;
    }
}