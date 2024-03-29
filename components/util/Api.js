import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.manifest.extra.apiUrl;

export const apiUrl = API_URL;

export function getUser(token) {
  let userApi = `${API_URL}/user/`;
  let params = { params: { 
    a: Constants.manifest.extra.apiKey,
    d: Constants.deviceId ?? token, // NOTE, can no longer fetch deviceId on iOS. use push token as backup
    t: token 
  }};
  
  return axios.get(userApi, params).then(response => {
    return response.data;
  }).catch(error => {
    console.log('error getting user from API');
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
}

export function postSurvey(survey) {
  let surveyApi = `${API_URL}/surveys/?a=${Constants.manifest.extra.apiKey}`;
  let params = { 
    survey: survey
  }; 
  return axios.post(surveyApi, params).then(response => {
    return response.data;
  }).catch(error => {
    console.warn('error posting survey from Api component.', error);
  });
}

export function postReport(report) {
  let reportApi = `${API_URL}/reports/?a=${Constants.manifest.extra.apiKey}`;
  let params = { 
    report: {
      reportId: report.reportId,
      type: report.type,
      report: report.report,
      user: report.user,
      location: report.report.location,
      description: report.report.description,
      incidentTime: report.report.incidentTime,
      complete: report.complete
    }
  }; 
  return axios.post(reportApi, params).then(response => {
    return response.data;
  }).catch(error => {
    console.log('error saving report.', error);
  });
}

export function postFeedback(feedback) {
  let feedbackApi = `${API_URL}/feedback/?a=${Constants.manifest.extra.apiKey}`;
  let params = { 
    feedback: {
      text: feedback.text,
      user: feedback.user,
    }
  }; 
  return axios.post(feedbackApi, params).then(response => {
    return response.data;
  }).catch(error => {
    console.log('error saving feedback.', error);
  });
}

export function notificationAccepted(data) {
  let url = `${API_URL}/notifications/?a=${Constants.manifest.extra.apiKey}`;
  let params = {
    notification: {
      notificationId: data.notificationId,
      user: data.user,
    }
  }
  console.log('POSTING RESPONSE: ', params);
  return axios.post(url, params).then(response => {
    return response.data;
  }).catch(error => {
    console.log('error sending notification accepted');
  });
}