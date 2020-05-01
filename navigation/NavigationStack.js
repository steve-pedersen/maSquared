import * as React from 'react';
// import { Provider } from 'react-redux';


import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, createAppContainer } from '@react-navigation/stack';

import BottomTabNavigator from './BottomTabNavigator';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { connect } from 'react-redux';


// import RootContainer from './components/RootContainer';
import AffirmationReport from '../components/AffirmationReport';
import AggressionReport from '../components/AggressionReport';
import IntroSlideshow from '../screens/IntroSlideshow';
import IntroSurvey from '../screens/IntroSurvey';
import ConsentForm from '../components/ConsentForm';
import AppendixA from '../components/surveys/AppendixA';
import AppendixB from '../components/surveys/AppendixB';
import AppendixC from '../components/surveys/AppendixC';
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
  DEVMODE = false;
  render() {
    if (!this.DEVMODE && !this.props.slideshowComplete) {
      // console.log('starting consent and slideshow');
      
      return (
        <NavigationContainer ref={this.props.containerRef} initialState={this.props.initialNavigationState}>
          <Stack.Navigator>
            {/* TODO: save consent in state and only show if not granted */}
            <Stack.Screen
              name="ConsentForm"
              component={ConsentForm}
              options={slideshowHeaderStyles}
            />
            <Stack.Screen
              name="IntroSlideshow"
              component={IntroSlideshow}
              options={slideshowHeaderStyles}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else if (!this.DEVMODE && this.props.slideshowComplete && !this.props.surveyComplete) {
      // console.log('starting survey...');
      
      return (
        <NavigationContainer ref={this.props.containerRef} initialState={this.props.initialNavigationState}>
        <Stack.Navigator>
          <Stack.Screen
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
          />
        </Stack.Navigator>
      </NavigationContainer>
      );
    } else {
      // console.log('starting home screen');

      return (
        <NavigationContainer ref={this.props.containerRef} initialState={this.props.initialNavigationState}>
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

function mapStateToProps(state) {
  return {
    consentGranted: state.consent.value,
    slideshowComplete: state.slideshow.complete,
    surveyComplete: state.survey.complete,
  };
}

export default connect(
  mapStateToProps,
  { saveConsent, saveSlideshow }
)(NavigationStack);