import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react'
import { store, persistor } from './redux/store/store';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import NotificationsContainer from './components/util/NotificationsContainer';
import NavigationStack from './navigation/NavigationStack';
import { getUser } from './components/util/Api';


const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingComplete: false,
      pushToken: store.getState().user.pushToken ?? '',
      user: store.getState().user ?? {}
    }
  }

  // Load any resources or data that we need prior to rendering the app
  async componentDidMount() {
    try {
      // SplashScreen.preventAutoHide();
      await this.registerForPushNotificationsAsync();
      await this.loadDataFromApi();
    } catch (e) {
      // console.log(e);
    } finally {
      // this.setState({ isLoadingComplete: true });
      // SplashScreen.hide();
    }
  }

  loadDataFromApi = async () => {
    let res = await getUser(this.state.pushToken);
    
    // if (this.state.user.userId !== res.userId) {
    //   console.log('NEW USER', res.userId);
    // } else {
    //   console.log('EXISTING USER', res.userId);
    // }

    this.setState({
      user: {
        newUser: this.state.user.userId !== res.userId,
        deviceId: res.deviceId,
        userId: res.userId,
        groupId: res.groupId,
        createdDate: res.createdDate,
        university: res.university,
        pushToken: res.pushToken,
        lastSyncDate: res.syncDate
      }
    });
    this.setState({ isLoadingComplete: true });
  }

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      // console.log(token);
      this.setState({ pushToken: token });
    } else {
      // console.log('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  render() {
    if (!this.state.isLoadingComplete) {
      return null;
    } else {
      return (
        <StoreProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <PaperProvider>
              <NotificationsContainer />
              <View style={styles.container} theme={theme}>
                {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                <NavigationStack user={this.state.user} />
              </View>
            </PaperProvider>
          </PersistGate>
        </StoreProvider>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;