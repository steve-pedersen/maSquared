import { SAVE_AFFIRMATION_REPORT, RESET_AFFIRMATION_REPORT  } from '../actions/types';
import Constants from 'expo-constants';

const INITIAL_STATE = {
    deviceID: Constants.deviceId,
    incidentTime: '',
    description: '',

    relatedToRace: false,
    relatedTocCulture: false,
    relatedToGender: false,
    relatedToSexualOrientation: false,
    relatedToOther: false,
    relatedToOtherDesciption: '',

    campus: '',
    location: null,
    uplift: 0,
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
        case SAVE_AFFIRMATION_REPORT:
            return {...state, ...action.payload};
        case RESET_AFFIRMATION_REPORT:
            return INITIAL_STATE;
        default:
            return state;
    }
}