import { SAVE_AGGRESSION_REPORT } from '../actions/types';

const INITIAL_STATE = {
    incidentTime: '',
    description: '',
    relatedTo: {
        race: false,
        culture: false,
        gender: false,
        sexualOrientation: false,
        other: false,
        otherDesciption: '',
    },
    campus: '',
    location: null,
    bother: 0,
    anger: 0,
    sad: 0,
    shame: 0,
    surprise: 0,
    fear: 0,
    contempt: 0,
    happy: 0,
    disgust: 0,
    pride: 0,
    guilt: 0,
    otherEmotion: {
        name: '',
        intensity: 0,
    }
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SAVE_AGGRESSION_REPORT:
            return {...state, ...action.payload};
        default:
            return state;
    }
}