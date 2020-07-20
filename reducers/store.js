import { 
  SAVE_STORE,
  GET_STORE,
} from '../actions/types';

const INITIAL_STATE = {
  store: {}
};

function storeReducer(state = INITIAL_STATE, action) { 
  switch (action.type) {
    case SAVE_STORE:
      var store = action.payload;
      console.log(store);
      return {...state, ...action.payload};
    case GET_STORE: 
      return {...state, store: action.payload};
    default: 
      return state;
  }
}

export default storeReducer;