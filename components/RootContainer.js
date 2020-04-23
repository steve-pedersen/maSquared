import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { createStore } from 'redux';

import { saveConsent, saveSlideshow } from '../actions';

class RootContainer extends Component {
    render() {
      return (
        <StoreProvider store={createStore(reducers, {})}>
          <PaperProvider>
            <View style={styles.container} theme={theme}>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <CurrentNavigationStack />
            </View>
          </PaperProvider>
        </StoreProvider>
      );
    }
  }

function mapStateToProps(state) {

}

export default connect(
    mapStateToProps,
    {  }
)(RootContainer);