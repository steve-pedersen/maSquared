import {
  ADD_PENDING_SURVEY,
  UPDATE_PENDING_SURVEY
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PENDING_SURVEY:
      let pendingSurvey = {};
      pendingSurvey[action.payload.notificationId] = {
        complete: false,
        notificationId: action.payload.notificationId,
        dateNotified: new Date(),
        expiration: action.payload.expiration,     
      };

      return [...state, pendingSurvey];

    case UPDATE_PENDING_SURVEY:
      return state.map((item, index) => {
        if (item) {
          if (Object.keys(item)[0] == action.payload.notificationId) {
            item[action.payload.notificationId].complete = true;
            item[action.payload.notificationId].surveyId = action.payload.surveyId;
          }
        }
        return item;
      });
      
    default:
      return state;
  }
};

