import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, AppState } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Constants from 'expo-constants';

import reducers from './reducers';
import { saveStore, saveUser } from './actions';
import NavigationStack from './navigation/NavigationStack';


const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

const API_URL = 'https://ilearn.test.at.sfsu.edu/ma2/api';


// let store = createStore(reducers, middleware);

class App extends React.Component {

  constructor(props) {
    super(props);

    // const containerRef = React.useRef();
    const middleware = applyMiddleware(thunk);
    const initialStore = createStore(reducers, middleware);

    this.state = {
      isLoadingComplete: false,
      userId: initialStore.userId,
      isStoreLoading: false,
      store: initialStore,
      initialNavigationState: null
    }
  }

  getUser = async () => {
    let userApi = `${API_URL}/user`;
    console.log('apiKey: ', Constants.manifest.extra.apiKey);
    let params = { 
      // a: Constants.manifest.extra.apiKey,
      d: Constants.deviceId 
    };

    axios.get(userApi, params).then(res => {
      console.log('response: ', res.data);
      this.setState({ userId: res.data.userId });
      this.setState({ isStoreLoading: false });
      let payload = saveUser({ userId: res.data.userId }).payload;
      // saveStore(this.state);
      // this._handleAppStateChange();
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

  // stores any state change into local storage
  _handleAppStateChange = (currentAppState) => {
    let storingValue = JSON.stringify(this.state.store.getState())
    AsyncStorage.setItem('completeStore', storingValue).then(() => {
      console.log('storing store in redux', storingValue);
      saveStore(storingValue);
    });
  }
  
  // Load any resources or data that we need prior to rendering the app
  componentDidMount() {

    try {
      SplashScreen.preventAutoHide();
      AppState.addEventListener('change', this._handleAppStateChange);
      this.setState({ isStoreLoading: true });

      AsyncStorage.getItem('completeStore').then(value => {
        if (value && value.length){
          let initialStore = JSON.parse(value);
          let newStore = createStore(reducers, initialStore, this.middleware);
          this.setState({ store: newStore });
          // this.setState({ userId: newStore.user.userId });
        } else {
          this.setState({ store: this.state.store });
        }
        // console.log('first',!this.state.userId,'second',!this.state.store.user.userId);
        if (!this.state.userId && !this.state.store.user.userId) {
          // console.log('getting user....');
          this.getUser();
        } else {
          console.log(this.state.userId);
        }
      }).catch((error)=>{
        this.setState({ store: this.state.store });
        this.setState({ isStoreLoading: false });
      });
      
      if (!this.state.store.userId) {
        // console.log('no uid in state on load');
        this.getUser();
      }

    } catch (e) {
      // We might want to provide this error information to an error reporting service
      console.warn(e);
    } finally {
      this.setState({ isLoadingComplete: true });
      SplashScreen.hide();
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange.bind(this));
  }

  render() {
    // console.log('loading: ', !this.state.isLoadingComplete || this.state.isStoreLoading);
    if (!this.state.isLoadingComplete || this.state.isStoreLoading) {
      // console.log('not rendering app...');
      return null;
    } else {
      // console.log('rendering app...');
      // console.log('store: ', this.state.store.getState());
      return (
        <StoreProvider store={this.state.store}>
          <PaperProvider>
            <View style={styles.container} theme={theme}>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <NavigationStack userId={this.state.userId} initialStore={this.state.store} />
            </View>
          </PaperProvider>
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