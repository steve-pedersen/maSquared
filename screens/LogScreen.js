import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { Title, Paragraph } from 'react-native-paper';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

import { getAggressionReports } from '../actions';

class LogScreen extends Component {

  render() {
    // console.log(this.props.aggressionReports);
    
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        
        <Title style={styles.titleText}>Log Screen</Title>
        
        <View style={styles.container}>
          {this.props.aggressionReports.map((report, i) => {
            return (
              <View key={i} style={{ marginBottom: 20 }}> 
                <Title>Report #{++i}</Title>
                {report.incidentTime ?
                  <Text>Incident Time:{"\t"}{report.incidentTime}</Text> :
                  undefined
                }
                <Text>Description:{"\t\t"}{report.description}</Text>
              </View>
            );
          })}
        </View>

      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    aggressionReports: state.reports,
  };
}

export default connect(
  mapStateToProps,
  { getAggressionReports }
)(LogScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 20,
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
  titleText: {
    textAlign: 'center',
  },
});