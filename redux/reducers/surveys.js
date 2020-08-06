import {
  ADD_SURVEY,
} from '../actions/types';

function surveysReducer(state = [], action) {
  switch (action.type) {
    case ADD_SURVEY:
      return [...state, {
          dateCompleted: new Date(),
          survey: action.payload.survey,
          user: action.payload.user
        }
      ];
    default:
      return state;
  }
}

export default surveysReducer;