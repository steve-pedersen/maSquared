import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet,  TouchableOpacity, View, Button, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider, Text } from 'react-native-paper';

import { MonoText } from '../components/StyledText';
import AffirmationReport from '../components/AffirmationReport';
import AggressionReport from '../components/AggressionReport';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import reducers from '../reducers';
import { greaterThan } from 'react-native-reanimated';

const Stack = createStackNavigator();

export default function HomeScreen({ navigation }) {

  const showSlideshow = () => {
    // navigation.setParams({ returnRoute: '' });
    navigation.navigate('IntroSlideshow', { returnRoute: 'HomeScreen' });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <View style={{ paddingVertical: 10 }}>
          <Text style={{ textAlign: 'center', fontSize: 16 }}>What did you experience?</Text>
        </View>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 20 }}>
          <Text 
            onPress={() => navigation.navigate('AggressionReport')} 
            style={styles.aggressionButton}>
            MICROAGGRESSION
          </Text>
        </View>

        <Divider 
          style={{
            borderBottomColor: '#e3e3e3',
            borderBottomWidth: StyleSheet.hairlineWidth,
            justifyContent: 'space-evenly',
          }}
        />

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 20 }}>
          <Text 
            onPress={() => navigation.navigate('AffirmationReport')} 
            style={styles.affirmationButton}>
            MICROAFFIRMATION
          </Text>
        </View>

        <View style={styles.helpContainer}>
          <TouchableOpacity 
            onPress={showSlideshow} 
            style={styles.helpLink}>
            <Text style={styles.helpLinkText}>Did you forget what these are?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
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
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 16,
    color: '#74b783',
    textDecorationColor: '#74b783',
    textDecorationLine: 'underline',
  },
  aggressionButton: {
    marginVertical: 40,
    borderWidth: 3,
    borderRadius: 5,
    borderColor: '#b16d65',
    color: '#b16d65',
    padding: 30,
    paddingVertical: 40,
    fontSize: 18,
    fontWeight: '600',
  },
  affirmationButton: {
    marginVertical: 40,
    borderWidth: 3,
    borderRadius: 5,
    borderColor: '#74b783',
    color: '#74b783',
    padding: 30,
    paddingVertical: 40,
    fontSize: 18,
    fontWeight: '600',
  },
});
