import { Component } from 'react';
import { connect } from 'react-redux';
import * as Notifications from 'expo-notifications';
// import * as Permissions from 'expo-permissions';

import { notificationAccepted } from './Api';
import { 
  saveUser, 
  completeIntroSurvey, 
  addPendingSurvey,
  updatePendingSurvey,
  activateSurvey,
  addNotification,
  acceptNotification,
} from '../../redux/actions';



class NotificationsContainer extends Component {
  _isMounted = false;
  notificationListener = null;
  responseListener = null;

  state = {
    notification: {},
  };


  componentDidMount() {
    this._isMounted = true;
    // this.registerForPushNotificationsAsync();

    if (this._isMounted) {

      let pendingSurveys = this.props.pendingSurveys.filter(survey => {
        if (survey) {
          return survey[Object.keys(survey)[0]].complete === false;
        }
        return true;
      });
      Notifications.setBadgeCountAsync(pendingSurveys.length);
      
      // console.log('pending surveys: ', pendingSurveys.length);

      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });

      this.notificationListener = Notifications.addNotificationReceivedListener(
        this._handleNotification
      );
      
      // This listener is fired whenever a user taps on or interacts with a notification 
      // (works when app is foregrounded, backgrounded, or killed)
      this.responseListener = Notifications.addNotificationResponseReceivedListener(
        this._handleNotificationResponse
      );
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    Notifications.removeNotificationSubscription(this.notificationListener);
    Notifications.removeNotificationSubscription(this.responseListener);
  }

  _handleNotification = async notification => {
    this.setState({ notification: notification });

    console.log('NOTIFICATION RECEIVED: ', notification);

    let data = notification.request.content.data;
    let newNotification = {
      type: data.body.type,
      notificationId: data.body.notificationId,
      user: this.props.user,
      expiration: data.body.expiration,
      message: data.body.message,
    };

    this.props.addNotification(newNotification);

    switch (data.body.type) {
      case 'accept':
        // 'accept' type notifications last for 1 hour
        
        break;

      case 'submit':
        // 'submit' type notifications start a new pending survey

        let resp = this.props.addPendingSurvey({
          notificationId: data.body.notificationId,
          expiration: data.body.expiration
        });
        break;

    }

  };

  _handleNotificationResponse = response => {
    let data = response.notification.request.content.data;
    console.log('NOTIFICATION RESPONSE', response);
    // Dismiss notification from Notification Center tray
    Notifications.dismissNotificationAsync(data.id);



    // TODO: find out response clicked by user (accept or reject)
    this.props.acceptNotification({
      notificationId: data.body.notificationId,
    });


    if (data.body.type === 'accept') {
      // Let API know that user has accepted notification
      notificationAccepted({
        notificationId: data.body.notificationId,
        user: this.props.user,
      });
    } else {
      this.props.activateSurvey({
        notificationId: data.body.notificationId,
        isActive: true
      });
    }

  };

  render() {
    return null;
  }
}

const mapStateToProps = (state) => {
  return { 
    user: state.user,
    pendingSurveys: state.pendingSurveys 
  };
};

export default connect(
  mapStateToProps,
  { 
    saveUser, 
    completeIntroSurvey, 
    addPendingSurvey, 
    updatePendingSurvey, 
    activateSurvey, 
    addNotification, 
    acceptNotification 
  }
)
(NotificationsContainer);