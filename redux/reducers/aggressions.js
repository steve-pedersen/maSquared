import { 
    SAVE_AGGRESSION_REPORT, 
    RESET_AGGRESSION_REPORT, 
} from '../actions/types';
import Constants from 'expo-constants';

const INITIAL_STATE = {
    complete: false,
    deviceID: Constants.deviceId,
    incidentTime: '',
    description: '',

    relatedToRace: false,
    relatedToCulture: false,
    relatedToGender: false,
    relatedToSexualOrientation: false,
    relatedToOther: false,
    relatedToOtherDesciption: '',

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
    otherEmotionName: '',
    otherEmotionValue: 0,
    modifiedDate: null,
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SAVE_AGGRESSION_REPORT:
            return {...state, ...action.payload};
        case RESET_AGGRESSION_REPORT:
            return INITIAL_STATE;
        default:
            return state;
    }
}