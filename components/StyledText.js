import * as React from 'react';
import { Text } from 'react-native';
import { useFonts } from '@use-expo/font';
import AppLoading from 'expo';

export function MonoText(props) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}

export function AppText(props) {
  let [fontsLoaded] = useFonts({
    'App-Text': require('../assets/fonts/coveredbyyourgrace.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return <Text {...props} style={[props.style, { fontFamily: 'App-Text' }]} />;
  }
}