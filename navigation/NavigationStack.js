import * as React from 'react';
// import { Provider } from 'react-redux';


import { StyleSheet, Image, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, createAppContainer } from '@react-navigation/stack';

import BottomTabNavigator from './BottomTabNavigator';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { DefaultTheme, Provider as PaperProvider, Text, Title } from 'react-native-paper';
import { connect } from 'react-redux';
import Constants from 'expo-constants';

import Layout from '../constants/Layout';
import AffirmationReport from '../components/AffirmationReport';
import AggressionReport from '../components/AggressionReport';
import IntroSlideshow from '../screens/IntroSlideshow';
import IntroSurvey from '../screens/IntroSurvey';
import ConsentForm from '../components/ConsentForm';
import AppendixA from '../components/surveys/AppendixA';
import AppendixB from '../components/surveys/AppendixB';
import AppendixC from '../components/surveys/AppendixC';
import AppendixD from '../components/surveys/AppendixD';
import PostMeasure from '../components/surveys/PostMeasure';

import { saveConsent, saveSlideshow, resetApp } from '../actions';


const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};


class NavigationStack extends React.Component {
  DEVMODE = true;
  render() {
    if ((!this.DEVMODE && !this.props.consentGranted) || 
        (Constants.deviceId !== this.props.deviceID)) {
      return (
        <NavigationContainer 
          ref={this.props.containerRef} 
          initialState={this.props.initialNavigationState}>
          <Stack.Navigator>
            {/* TODO: save consent in state and only show if not granted */}
            <Stack.Screen
              name="ConsentForm"
              component={ConsentForm}
              options={slideshowHeaderStyles}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else if (!this.DEVMODE && !this.props.slideshowComplete) {
      return (
        <NavigationContainer 
          ref={this.props.containerRef} 
          initialState={this.props.initialNavigationState}>
          <Stack.Navigator>
            <Stack.Screen
              name="IntroSlideshow"
              component={IntroSlideshow}
              options={slideshowHeaderStyles}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    // } else if (!this.DEVMODE && this.props.slideshowComplete && !this.props.surveyComplete) {
    } else if (true) {
    // console.log('starting survey...');
      
      return (
        <NavigationContainer 
          ref={this.props.containerRef} 
          initialState={this.props.initialNavigationState}>
        <Stack.Navigator>
          {/* <Stack.Screen
            name="IntroSurvey"
            component={IntroSurvey}
            options={slideshowHeaderStyles}
          />
          <Stack.Screen
            name="AppendixA"
            component={AppendixA}
            // options={}
            options={slideshowHeaderStyles}
          />
          <Stack.Screen
            name="AppendixB"
            component={AppendixB}
            // options={{ title: 'Intro Survey: Appendix B' }}
            options={slideshowHeaderStyles}
          />
          <Stack.Screen
            name="AppendixC"
            component={AppendixC}
            // options={{ title: 'Intro Survey: Appendix C' }}
            options={slideshowHeaderStyles}
          /> */}
          <Stack.Screen
            name="AppendixD"
            component={AppendixD}
            options={slideshowHeaderStyles}
          />
        </Stack.Navigator>
      </NavigationContainer>
      );
    } else {
      // console.log('starting home screen');

      return (
        <NavigationContainer 
          ref={this.props.containerRef} 
          initialState={this.props.initialNavigationState}>
          <Stack.Navigator>
            <Stack.Screen
              name="Root"
              component={BottomTabNavigator}
              options={headerStyles}
              initialParams={{
                message: ''
              }}
            />
            <Stack.Screen
              name="AggressionReport"
              component={AggressionReport}
              options={reportHeader}
            />
            <Stack.Screen
              name="AffirmationReport"
              component={AffirmationReport}
              options={headerStyles}
            />
            <Stack.Screen
              name="IntroSlideshow"
              component={IntroSlideshow}
              options={slideshowHeaderStyles}
            />
            <Stack.Screen
              name="PostMeasure"
              component={PostMeasure}
              options={slideshowHeaderStyles}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  }
}

function LogoTitleReport() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Title style={{ color: '#74b783', fontWeight: '600' }}>New Report</Title>
      {/* <Image
        style={{ width: 44, height: 44, marginLeft: 15 }}
        resizeMode="contain"
        source={require('../assets/images/AppIcon.appiconset/120.png')}
      /> */}
    </View>
  );
}

function LogoTitle() {
  return (
    <Image
      style={{ width: 44, height: 44 }}
      resizeMode="contain"
      source={require('../assets/images/AppIcon.appiconset/120.png')}
    />
  );
}

function HeaderRight() {
  return (
    <Icon
      name="md-trash"
      color='#74b783'
      size={35}
      // onPress={this._onDone}
    />
  );
}

function BackIcon() {
  return (
    <Icon
      name="md-arrow-back"
      color='#74b783'
      size={35}
      // onPress={this._onDone}
    />
  );
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
    height: (Layout.window.height / 10),
  },
  headerTintColor: '#74b783',

};

const headerStyles = {
  headerStyle: {
    backgroundColor: '#74b783',
    height: (Layout.window.height / 10),
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerTitle: props => <LogoTitle {...props} />,
};

const reportHeader = {
  headerTitle: props => <LogoTitleReport {...props} />,
  headerBackImage: props => <BackIcon {...props} />,
  headerBackTitleVisible: false,
  headerLeftContainerStyle: {paddingHorizontal: 12, alignSelf: 'center'},
  // headerRight: props => <HeaderRight {...props} />,
  headerRightContainerStyle: {paddingHorizontal: 12, alignSelf: 'center'},
  headerStyle: {
    backgroundColor: '#fff',
    height: (Layout.window.height / 10),
    borderBottomWidth: 2,
    borderBottomColor: '#74b783',
  },
  headerTintColor: '#74b783',
  headerTitleStyle: {
    fontWeight: 'bold',
    alignItems: 'left',
    alignSelf: 'left',
    justifyContent: 'left',
  },
}

function mapStateToProps(state) {
  return {
    consentGranted: state.consent.value,
    slideshowComplete: state.slideshow.complete,
    surveyComplete: state.survey.complete,
    deviceID: state.user.deviceID
  };
}

export default connect(
  mapStateToProps,
  { saveConsent, saveSlideshow }
)(NavigationStack);