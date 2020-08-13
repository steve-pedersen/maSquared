import { Component } from 'react';
// import * as React from 'react';
import { connect } from 'react-redux';
// import Constants from 'expo-constants';
// import { Notifications } from 'expo';
import * as ExpoNotifications from 'expo-notifications';
// import * as Permissions from 'expo-permissions';

import { notificationAccepted } from './Api';
import { 
  saveUser, 
  completeIntroSurvey, 
  addPendingSurvey,
  updatePendingSurvey,
  activateSurvey
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
      ExpoNotifications.setBadgeCountAsync(pendingSurveys.length);
      
      // this.props.updatePendingSurvey({
      //   notificationId: "49",
      //   surveyId: "cheese"
      // });
      // console.log('pending surveys: ', pendingSurveys['45']);
      console.log('pending surveys: ', pendingSurveys.length);

      ExpoNotifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });

      // this._notificationSubscription = Notifications.addListener(this._handleNotification);
      this.notificationListener = ExpoNotifications.addNotificationReceivedListener(
        this._handleNotification
      );
      
      // This listener is fired whenever a user taps on or interacts with a notification 
      // (works when app is foregrounded, backgrounded, or killed)
      this.responseListener = ExpoNotifications.addNotificationResponseReceivedListener(
        this._handleNotificationResponse
      );
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    ExpoNotifications.removeNotificationSubscription(this.notificationListener);
    ExpoNotifications.removeNotificationSubscription(this.responseListener);
  }

  _handleNotification = async notification => {
    // console.log('new notification received', notification);
    this.setState({ notification: notification });

    let data = notification.request.content.data;
    let resp = this.props.addPendingSurvey({
      notificationId: data.body.notificationId,
      expiration: data.body.expiration
    });
  };

  _handleNotificationResponse = response => {
    let data = response.notification.request.content.data;

    // Dismiss notification from Notification Center tray
    ExpoNotifications.dismissNotificationAsync(data.id);

    // Let API know that user has accepted notification
    notificationAccepted({
      notificationId: data.body.notificationId,
      user: this.props.user,
    });

    this.props.activateSurvey({
      notificationId: data.body.notificationId,
      isActive: true
    });
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
  { saveUser, completeIntroSurvey, addPendingSurvey, updatePendingSurvey, activateSurvey }
)
(NotificationsContainer);