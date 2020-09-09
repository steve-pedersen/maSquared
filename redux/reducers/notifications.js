import { 
  ADD_NOTIFICATION,
  ACCEPT_NOTIFICATION,
  DELETE_NOTIFICATION,
} from '../actions/types';

function notificationsReducer(state = [], action) {

  switch (action.type) {
      case ADD_NOTIFICATION:
          let newAggReport = {};
          newAggReport = {
              type: action.payload.type,
              notificationId: action.payload.notificationId,
              dateReceived: new Date(),
              expiration: action.payload.expiration,
              user: action.payload.user,
              accepted: action.payload.accepted ?? false,
              deleted: false,
              expired: false
          };

          return [...state, newAggReport];       
      
      case ACCEPT_NOTIFICATION:
        return state.map((item, index) => {
          if (item.notificationId == action.payload.notificationId) {
              item.accepted = true;
          }
          return item;
        });
        break;        

      case DELETE_NOTIFICATION:
          return state.map((item, index) => {
              if (item.notificationId == action.payload.notificationId) {
                  item.deleted = true;
              }
              return item;
          });
          break;

      default:
          return state;
  }
}

export default notificationsReducer;