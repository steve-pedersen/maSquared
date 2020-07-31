import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, AppState } from 'react-native';
import { SplashScreen } from 'expo';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react'
import { store, persistor } from './redux/store/store';

import NotificationsContainer from './components/util/NotificationsContainer';
import NavigationStack from './navigation/NavigationStack';
import Api from './components/util/Api';
import Loader from './components/util/Loader';
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


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingComplete: false,
      user: store.getState().user ?? {}
    }
  }

  // Load any resources or data that we need prior to rendering the app
  async componentDidMount() {
    try {
      SplashScreen.preventAutoHide();
      if (!this.state.user.userId) {
        await this.loadDataFromApi();
      }
    } catch (e) {
      console.warn(e);
    } finally {
      this.setState({ isLoadingComplete: true });
      SplashScreen.hide();
    }
  }

  loadDataFromApi = async () => {
    let res = await getUser();
    this.setState({
      user: {
        deviceId: res.deviceId,
        userId: res.userId,
        groupId: res.groupId,
        createdDate: res.createdDate,
        university: res.university
      }
    });
  }



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
    backgroundColor: 'red',
  },
});

const slideshowHeaderStyles = {
  headerStyle: {
    backgroundColor: '#74b783',
  },
  headerTintColor: '#74b783',

};

const headerStyles = {
  headerStyle: {
    backgroundColor: '#74b783',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

export default App;