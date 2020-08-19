import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Keyboard, TouchableHighlight } from 'react-native';
import { Title, Text, Paragraph } from 'react-native-paper';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { getAggressionReports } from '../redux/actions';
import Modal from '../components/Modal';

class LogScreen extends Component {

  showModal = report => {
    console.log('REPORT SELECTED: ', report);
  }

  render() {
    // console.log(this.props.allReports);

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.container}>
          {this.props.allReports.map((report, i) => {
            {/* console.log(report); */ }
            return (
              <TouchableHighlight key={i} underlayColor={"#eee"} onPress={() => this.showModal(report)}>
                <View key={i} style={styles.reportListItem}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Title style={report.type == 'MICROAGGRESSION' ? styles.aggressionText : styles.affirmationText}>
                      {report.type}
                    </Title>
                    {report.report.incidentTime ?
                      <Text style={styles.text}>{report.report.incidentTime}</Text> :
                      undefined
                    }
                  </View>
                  <Text numberOfLines={1} style={styles.text}>{report.report.description.trim()}</Text>
                </View>
              </TouchableHighlight>
            );
          })}
        </View>

      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    allReports: state.reports,
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
    // padding: 20,
  },
  reportListItem: {
    paddingHorizontal: wp('3.5%'),
    paddingVertical: hp('0.9%'),
    borderBottomWidth: 1,
    borderBottomColor: '#999',
  },
  text: {
    marginVertical: hp('.75%'),
    // fontWeight: 'bold',
    fontSize: hp('1.75%'),
  },
  aggressionText: {
    color: '#b16d65',
    fontSize: hp('2%'),
    marginBottom: hp('1%'),
  },
  affirmationText: {
    color: '#74b783',
    fontSize: hp('2%'),
    marginBottom: hp('1%'),
  },
  contentContainer: {
    paddingTop: 15,
  },
  titleText: {
    textAlign: 'center',
  },
});