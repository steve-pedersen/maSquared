import * as React from "react";
import { StyleSheet, Image, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabNavigator from "./BottomTabNavigator";
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { DefaultTheme, Text, Title } from "react-native-paper";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Network from "expo-network";

import AffirmationReport from "../components/AffirmationReport";
import AggressionReport from "../components/AggressionReport";
import IntroSlideshow from "../screens/IntroSlideshow";
import IntroSurvey from "../screens/IntroSurvey";
import ConsentForm from "../components/ConsentForm";
import AppendixA from "../components/surveys/AppendixA";
import AppendixB from "../components/surveys/AppendixB";
import AppendixC from "../components/surveys/AppendixC";
import AppendixD from "../components/surveys/AppendixD";
import AppendixE from "../components/surveys/AppendixE";
import AppendixL from "../components/surveys/AppendixL";

import {
  saveConsent,
  saveSlideshow,
  resetApp,
  saveUser,
  completeIntroSurvey,
} from "../redux/actions";

const Stack = createStackNavigator();
// const Tab = createMaterialTopTabNavigator();

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    accent: "#f1c40f",
  },
};

class NavigationStack extends React.Component {
  DEVMODE = false;
  STARTOVER = true;
  network = null;
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;

    if (this.props.user) {
      this.props.saveUser(this.props.user);
      // reset intro survey for new user
      if (this.props.user.newUser) {
        this.props.completeIntroSurvey(false);
      }
    }

    if (this._isMounted) {
      this.network = Network.getNetworkStateAsync();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (!this.DEVMODE && !this.props.consentGranted) {
      // CONSENT FORM
      return (
        <NavigationContainer
          ref={this.props.containerRef}
          initialState={this.props.initialNavigationState}
        >
          <Stack.Navigator>
            <Stack.Screen
              name='ConsentForm'
              component={ConsentForm}
              options={slideshowHeaderStyles}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else if (!this.DEVMODE && !this.props.slideshowComplete) {
      // SLIDESHOW
      return (
        <NavigationContainer
          ref={this.props.containerRef}
          initialState={this.props.initialNavigationState}
        >
          <Stack.Navigator>
            <Stack.Screen
              name='IntroSlideshow'
              component={IntroSlideshow}
              options={slideshowHeaderStyles}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else if (
      !this.DEVMODE &&
      this.props.slideshowComplete &&
      !this.props.introSurveyComplete
    ) {
      // SURVEYS
      return (
        <NavigationContainer
          ref={this.props.containerRef}
          initialState={this.props.initialNavigationState}
        >
          {surveyStack}
        </NavigationContainer>
      );
    } else if (this.props.activeSurvey.isActive) {
      // SURVEYS FROM NOTIFICATION
      return (
        <NavigationContainer
          ref={this.props.containerRef}
          initialState={this.props.initialNavigationState}
        >
          {surveyStack}
        </NavigationContainer>
      );
    } else {
      // HOME SCREEN
      return (
        <NavigationContainer
          ref={this.props.containerRef}
          initialState={this.props.initialNavigationState}
        >
          <Stack.Navigator>
            <Stack.Screen
              name='Root'
              component={BottomTabNavigator}
              options={rootHeader}
              initialParams={{
                message: "",
                toastMessage: "",
              }}
            />
            <Stack.Screen
              name='AggressionReport'
              component={AggressionReport}
              options={reportHeader}
            />
            <Stack.Screen
              name='AffirmationReport'
              component={AffirmationReport}
              options={reportHeader}
            />
            <Stack.Screen
              name='IntroSlideshow'
              component={IntroSlideshow}
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
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Title style={{ color: "#74b783", fontWeight: "600" }}>New Report</Title>
    </View>
  );
}

function LogoTitle() {
  return (
    <Image
      style={{ width: wp("13%") }}
      resizeMode='contain'
      source={require("../assets/images/128.imageset/128_ma2_white.png")}
    />
  );
}

function HeaderRight() {
  return <Icon name='md-trash' color='#74b783' size={35} />;
}

function NetworkStatus() {
  let network = Network.getNetworkStateAsync();
  if (network.isConnected) {
    return <Text style={{ color: "#74b783" }}>CONNECTED</Text>;
  } else {
    return (
      <Text
        style={{ color: "red" }}
        onPress={() => console.log("Need to request wifi stuff")}
      >
        GO ONLINE
      </Text>
    );
  }
}

function BackIcon() {
  return <Icon name='md-arrow-back' color='#74b783' size={35} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});

const slideshowHeaderStyles = {
  headerStyle: {
    backgroundColor: "#74b783",
    height: hp("12%"),
  },
  headerTintColor: "#74b783",
};

const headerStyles = {
  headerStyle: {
    backgroundColor: "#74b783",
    height: hp("12%"),
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
  headerTitle: (props) => <LogoTitle {...props} />,
};

const reportHeader = {
  headerTitle: (props) => <LogoTitleReport {...props} />,
  headerBackImage: (props) => <BackIcon {...props} />,
  headerBackTitleVisible: false,
  headerLeftContainerStyle: { paddingHorizontal: 12, alignSelf: "center" },
  headerRightContainerStyle: { paddingHorizontal: 12, alignSelf: "center" },
  headerStyle: {
    backgroundColor: "#fff",
    height: hp("12%"),
    borderBottomWidth: 2,
    borderBottomColor: "#74b783",
  },
  headerTintColor: "#74b783",
  headerTitleStyle: {
    fontWeight: "bold",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
  },
};
const rootHeader = {
  headerTitle: (props) => <LogoTitle {...props} />,
  headerLeft: (props) => <LogoTitle {...props} />,
  headerBackImage: (props) => <LogoTitle {...props} />,
  headerBackTitleVisible: false,
  headerLeftContainerStyle: { paddingHorizontal: 12, alignSelf: "center" },
  headerRightContainerStyle: { paddingHorizontal: 12, alignSelf: "center" },
  headerStyle: {
    backgroundColor: "#74b783",
    height: hp("12%"),
    borderBottomWidth: 2,
    borderBottomColor: "#74b783",
  },
  headerTintColor: "#74b783",
  headerTitleStyle: {
    fontWeight: "bold",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
  },
};

const surveyStack = (
  <Stack.Navigator>
    <Stack.Screen
      name='IntroSurvey'
      component={IntroSurvey}
      options={slideshowHeaderStyles}
    />
    <Stack.Screen
      name='AppendixA'
      component={AppendixA}
      options={slideshowHeaderStyles}
    />
    <Stack.Screen
      name='AppendixB'
      component={AppendixB}
      options={slideshowHeaderStyles}
    />
    <Stack.Screen
      name='AppendixC'
      component={AppendixC}
      options={slideshowHeaderStyles}
    />
    <Stack.Screen
      name='AppendixD'
      component={AppendixD}
      options={slideshowHeaderStyles}
    />
    <Stack.Screen
      name='AppendixE'
      component={AppendixE}
      options={slideshowHeaderStyles}
    />
    <Stack.Screen
      name='AppendixL'
      component={AppendixL}
      options={slideshowHeaderStyles}
    />
  </Stack.Navigator>
);

function mapStateToProps(state) {
  return {
    consentGranted: state.consent.value,
    slideshowComplete: state.slideshow.complete,
    introSurveyComplete: state.introSurvey.complete,
    activeSurvey: state.activeSurvey,
    reports: state.reports,
    storedUser: state.user,
  };
}

export default connect(mapStateToProps, {
  saveConsent,
  saveSlideshow,
  saveUser,
  completeIntroSurvey,
})(NavigationStack);
