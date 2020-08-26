import { combineReducers } from 'redux';
import affirmationsReducer from './affirmations';
import aggressionsReducer from './aggressions';
import reportsReducer from './reports';
import surveysReducer from './surveys';
import surveyAReducer from './surveyA';
import surveyBReducer from './surveyB';
import surveyCReducer from './surveyC';
import surveyDReducer from './surveyD';
import surveyEReducer from './surveyE';
import surveyLReducer from './surveyL';
import introSurveyReducer from './introSurvey';
import pendingSurveysReducer from './pendingSurveys';
import activeSurveyReducer from './activeSurvey';
import consentReducer from './consent';
import slideshowReducer from './slideshow';
import postMeasureSurveyReducer from './postMeasureSurvey';
import userReducer from './user';

export default combineReducers({
    affirmations: affirmationsReducer,
    aggressions: aggressionsReducer,
    reports: reportsReducer,
    surveys: surveysReducer,
    surveyA: surveyAReducer,
    surveyB: surveyBReducer,
    surveyC: surveyCReducer,
    surveyD: surveyDReducer,
    surveyE: surveyEReducer,
    surveyL: surveyLReducer,
    introSurvey: introSurveyReducer,
    pendingSurveys: pendingSurveysReducer,
    activeSurvey: activeSurveyReducer,
    consent: consentReducer,
    slideshow: slideshowReducer,
    postMeasureSurvey: postMeasureSurveyReducer,
    user: userReducer,
});