import { 
    SAVE_AFFIRMATION_REPORT, 
    SAVE_AGGRESSION_REPORT, 
    SAVE_SURVEY_A,
    SAVE_SURVEY_B,
    SAVE_SURVEY_C,
    GET_SURVEY_A,
    GET_SURVEY_B,
    GET_SURVEY_C,
    SAVE_CONSENT,
    SAVE_SLIDESHOW,
    SAVE_SURVEY,
    RESET_APP,
} from './types';


export function saveAffirmationReport(affirmation) {
    console.log('in action saveAffirmationReport');
    return {
        type: SAVE_AFFIRMATION_REPORT,
        payload: affirmation
    };
}

export function saveAggressionReport(key, aggression) {
    let payload = {};
    payload[key] = aggression;
    // console.log('in saveAggression: ', key, aggression, payload);
    return {
        type: SAVE_AGGRESSION_REPORT,
        payload: payload
    };
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