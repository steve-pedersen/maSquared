import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import useLinking from './navigation/useLinking';

import AffirmationReport from './components/AffirmationReport';
import AggressionReport from './components/AggressionReport';
import IntroSlideshow from './screens/IntroSlideshow';
import InformedConsent from './screens/InformedConsent';

// import HomeScreen from '../screens/HomeScreen';
// import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);
  const hasCompletedIntro = false;

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else if (!hasCompletedIntro) {
    return (
      <Provider store={createStore(reducers, {})}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
            <Stack.Navigator>
              {/* <Stack.Screen 
                name="InformedConsent" 
                component={InformedConsent} 
                options={headerStyles}
              /> */}
              <Stack.Screen 
                name="Root" 
                component={IntroSlideshow} 
                options={headerStyles}
              />
              {/* <Stack.Screen 
                name="IntroSurvey" 
                component={IntroSurvey} 
                options={headerStyles}
              /> */}
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    );
  } else if (hasCompletedIntro) {
    return (
      <Provider store={createStore(reducers, {})}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
            <Stack.Navigator>
              <Stack.Screen 
                name="Root" 
                component={BottomTabNavigator} 
                options={headerStyles}
              />
              <Stack.Screen 
                name="AggressionReport" 
                component={AggressionReport} 
                options={headerStyles}
              />
              <Stack.Screen 
                name="AffirmationReport" 
                component={AffirmationReport} 
                options={headerStyles}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});

const headerStyles = {
  headerStyle: {
    backgroundColor: '#74b783',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};