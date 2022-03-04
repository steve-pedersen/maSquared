import * as React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider, Text } from 'react-native-paper';

import { createStackNavigator } from '@react-navigation/stack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Toast, { DURATION } from '../components/Toast';

const Stack = createStackNavigator();

class HomeScreen extends React.Component {

  showSlideshow = () => {
    this.props.navigation.navigate('IntroSlideshow', { returnRoute: 'HomeScreen' });
  };

  componentDidUpdate() {
    if (this.props.route.params?.toastMessage) {
      this.refs.toastMessage.show(this.props.route.params?.toastMessage, 500);
      this.props.route.params.toastMessage = '';
    }
  }

  render() {

    return (
      <View style={styles.container}>

        <Toast ref="toastMessage" position="top" positionValue={5} style={{ backgroundColor: 'green' }} />

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <View style={{ paddingVertical: 10 }}>
            <Text style={{ textAlign: 'center', fontSize: 18 }}>What did you experience?</Text>
          </View>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AggressionReport')}
            style={styles.reportButton}>
            <Text style={styles.aggressionButton}>MICROAGGRESSION</Text>
          </TouchableOpacity>

          <Divider
            style={{
              borderBottomColor: '#e3e3e3',
              borderBottomWidth: StyleSheet.hairlineWidth,
              justifyContent: 'space-evenly',
            }}
          />

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AffirmationReport')}
            style={styles.reportButton}>
            <Text style={styles.affirmationButton}>MICROAFFIRMATION</Text>
          </TouchableOpacity>

          <View style={styles.helpContainer}>
            <TouchableOpacity
              onPress={this.showSlideshow}
              style={styles.helpLink}>
              <Text style={styles.helpLinkText}>Did you forget what these are?</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  reportButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 18,
    color: '#74b783',
    textDecorationColor: '#74b783',
    textDecorationLine: 'underline',
  },
  aggressionButton: {
    marginVertical: hp('5%'),
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#b16d65',
    color: '#b16d65',
    padding: hp('4%'),
    paddingVertical: hp('5%'),
    fontSize: 20,
    fontWeight: '600',
  },
  affirmationButton: {
    marginVertical: hp('5%'),
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#74b783',
    color: '#74b783',
    padding: hp('4%'),
    paddingVertical: hp('5%'),
    fontSize: 20,
    fontWeight: '600',
  },
});

export default HomeScreen;