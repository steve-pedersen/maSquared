import { combineReducers } from 'redux';
import affirmationsReducer from './affirmations';
import aggressionsReducer from './aggressions';
import reportsReducer from './reports';
import surveyAReducer from './surveyA';
import surveyBReducer from './surveyB';
import surveyCReducer from './surveyC';
import surveyDReducer from './surveyD';
import surveyEReducer from './surveyE';
import surveyReducer from './survey';
import consentReducer from './consent';
import slideshowReducer from './slideshow';
import postMeasureSurveyReducer from './postMeasureSurvey';
import userReducer from './user';

export default combineReducers({
    affirmations: affirmationsReducer,
    aggressions: aggressionsReducer,
    reports: reportsReducer,
    surveyA: surveyAReducer,
    surveyB: surveyBReducer,
    surveyC: surveyCReducer,
    surveyD: surveyDReducer,
    surveyE: surveyEReducer,
    survey: surveyReducer,
    consent: consentReducer,
    slideshow: slideshowReducer,
    postMeasureSurvey: postMeasureSurveyReducer,
    user: userReducer,
});