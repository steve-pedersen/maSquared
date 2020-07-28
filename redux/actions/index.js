import {
    SAVE_AFFIRMATION_REPORT,
    SAVE_AGGRESSION_REPORT,
    ADD_AGGRESSION_REPORT,
    RESET_AGGRESSION_REPORT,
    RESET_AFFIRMATION_REPORT,
    GET_AGGRESSION_REPORTS,
    SAVE_SURVEY_A,
    SAVE_SURVEY_B,
    SAVE_SURVEY_C,
    SAVE_SURVEY_D,
    SAVE_SURVEY_E,
    GET_SURVEY_A,
    GET_SURVEY_B,
    GET_SURVEY_C,
    SAVE_CONSENT,
    SAVE_SLIDESHOW,
    SAVE_SURVEY,
    RESET_APP,
    SAVE_POST_MEASURE_SURVEY,
    SAVE_DEVICE,
    SAVE_USER,
    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
} from './types';
import { State } from 'react-native-gesture-handler';
import Constants from 'expo-constants';


export function saveDevice(deviceId = null) {
    deviceId = deviceId ?? Constants.deviceId;
    // console.log('Device ID: ', deviceId);
    let payload = {};
    payload['deviceId'] = deviceId;

    return {
        type: SAVE_DEVICE,
        payload: payload,
    };
}

export function saveUser(user = {}) {
    // console.log('user from action: ', user);
    return {
        type: SAVE_USER,
        payload: user
    }
}

export const fetchUser = bool => {
    console.log('in fetchUser');
    return {
        type: GET_USER,
        payload: bool
    }
}

export const fetchUserSuccess = data => {
    // _storeUser(data.userId);
    return {
        type: GET_USER_SUCCESS,
        payload: data.userId,
        loading: false
    }
}

export const fetchUserError = error => {
    console.log('in fetchUserError');
    return {
        type: GET_USER_ERROR,
        payload: error,
        loading: false
    }
}


export function saveAffirmationReport(key, affirmation) {
    let payload = {};
    payload[key] = affirmation;
    payload['modifiedDate'] = new Date;
    return {
        type: SAVE_AFFIRMATION_REPORT,
        payload: payload
    };
}

export function saveAggressionReport(key, aggression) {
    let payload = {};
    payload[key] = aggression;
    payload['modifiedDate'] = new Date;
    return {
        type: SAVE_AGGRESSION_REPORT,
        payload: payload
    };
}

export function addAggressionReport(report) {
    // console.log('in addAgg report ', report);

    return {
        type: ADD_AGGRESSION_REPORT,
        payload: report
    }
}

export function resetAggressionReport() {
    return {
        type: RESET_AGGRESSION_REPORT,
        payload: {}
    }
}

export function resetAffirmationReport() {
    return {
        type: RESET_AFFIRMATION_REPORT,
        payload: {}
    }
}

export function getAggressionReports() {
    return {
        type: GET_AGGRESSION_REPORTS,
        payload: State.reports
    }
}

export function saveSurvey(complete) {
    return {
        type: SAVE_SURVEY,
        payload: complete
    };
}

export const saveSurveyA = (key, value) => {
    let payload = {};
    payload[key] = { value: value };
    return {
        type: SAVE_SURVEY_A,
        payload: payload
    };
}

export const saveSurveyB = (key, value) => {
    let payload = {};
    payload[key] = { value: value };
    return {
        type: SAVE_SURVEY_B,
        payload: payload
    };
}

export const saveSurveyC = (key, value) => {
    let payload = {};
    payload[key] = { value: value };
    return {
        type: SAVE_SURVEY_C,
        payload: payload
    };
}

export const saveSurveyD = (key, value) => {
    let payload = {};
    payload[key] = { value: value };
    return {
        type: SAVE_SURVEY_D,
        payload: payload
    };
}

export const saveSurveyE = (key, value) => {
    let payload = {};
    payload[key] = { value: value };
    return {
        type: SAVE_SURVEY_E,
        payload: payload
    };
}

export function getSurveyA(key) {
    return {
        type: GET_SURVEY_A,
        payload: surveyA.key
    }
}

export function getSurveyB(surveyB) {
    return {
        type: GET_SURVEY_B,
        payload: surveyB.key
    }
}

export function getSurveyC(surveyC) {
    return {
        type: GET_SURVEY_C,
        payload: surveyC.key
    }
}

export function saveConsent(consent) {
    return {
        type: SAVE_CONSENT,
        payload: consent
    }
}

export function getConsent() {
    return {
        type: GET_CONSENT,
        payload: consent
    }
}

export function saveSlideshow(complete) {
    return {
        type: SAVE_SLIDESHOW,
        payload: complete
    }
}

export function resetApp() {
    return {
        type: RESET_APP,
        payload: null
    }
}

export function savePostMeasureSurvey(key, value) {
    let payload = {};
    payload[key] = value;
    payload['modifiedDate'] = new Date;
    return {
        type: SAVE_POST_MEASURE_SURVEY,
        payload: payload
    };
}