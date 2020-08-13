import {
    SAVE_AFFIRMATION_REPORT,
    SAVE_AGGRESSION_REPORT,
    ADD_AGGRESSION_REPORT,
    RESET_AGGRESSION_REPORT,
    RESET_AFFIRMATION_REPORT,
    ADD_SURVEY,
    SAVE_SURVEY_A,
    SAVE_SURVEY_B,
    SAVE_SURVEY_C,
    SAVE_SURVEY_D,
    SAVE_SURVEY_E,
    RESET_SURVEY_A,
    RESET_SURVEY_B,
    RESET_SURVEY_C,
    RESET_SURVEY_D,
    RESET_SURVEY_E,
    SAVE_CONSENT,
    SAVE_SLIDESHOW,
    SAVE_INTRO_SURVEY,
    COMPLETE_INTRO_SURVEY,
    RESET_APP,
    SAVE_POST_MEASURE_SURVEY,
    SAVE_DEVICE,
    SAVE_USER,
    ADD_PENDING_SURVEY,
    UPDATE_PENDING_SURVEY,
    ACTIVATE_SURVEY,
    DEACTIVATE_SURVEY,
} from './types';
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
    return { type: SAVE_USER, payload: user }
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
    return { type: ADD_AGGRESSION_REPORT, payload: report }
}

export function resetAggressionReport() {
    return { type: RESET_AGGRESSION_REPORT, payload: {} }
}

export function addSurvey(survey) {
    return { type: ADD_SURVEY, payload: survey }
}

export function resetA() {
    return { type: RESET_SURVEY_A, payload: {} }
}
export function resetB() {
    return { type: RESET_SURVEY_B, payload: {} }
}
export function resetC() {
    return { type: RESET_SURVEY_C, payload: {} }
}
export function resetD() {
    return { type: RESET_SURVEY_D, payload: {} }
}
export function resetE() {
    return { type: RESET_SURVEY_E, payload: {} }
}

export function resetAffirmationReport() {
    return { type: RESET_AFFIRMATION_REPORT, payload: {} }
}

export function saveIntroSurvey(survey) {
    return { type: SAVE_INTRO_SURVEY, payload: survey };
}

export function activateSurvey(survey) {
    return { type: ACTIVATE_SURVEY, payload: survey }
}

export function deactivateSurvey(survey) {
    return { type: DEACTIVATE_SURVEY, payload: survey }
}

export function addPendingSurvey(pendingSurvey) {
    return { type: ADD_PENDING_SURVEY, payload: pendingSurvey }
}

export function updatePendingSurvey(pendingSurvey) {
    return { type: UPDATE_PENDING_SURVEY, payload: pendingSurvey }
}

export function completeIntroSurvey(complete=true) {
    return { type: COMPLETE_INTRO_SURVEY, payload: complete }
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

export function saveConsent(consent) {
    return { type: SAVE_CONSENT, payload: consent }
}

export function saveSlideshow(complete) {
    return { type: SAVE_SLIDESHOW, payload: complete }
}

export function resetApp() {
    return { type: RESET_APP, payload: null }
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