import { 
  SAVE_SURVEY_L,
  RESET_SURVEY_L
} from '../actions/types';


const INITIAL_STATE = {
  '1': { value: null },
  '1a': { value: null },
  '2': { value: null },
  '2a': { value: null },
  '3': { value: null },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case SAVE_SURVEY_L:
          return { ...state, ...action.payload };
      case RESET_SURVEY_L:
          return INITIAL_STATE;
      default:
          return state;
  }
};