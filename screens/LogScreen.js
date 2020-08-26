import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Keyboard, TouchableHighlight, Modal } from 'react-native';
import { Title, Text, Paragraph, Subheading } from 'react-native-paper';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { getAggressionReports, saveAggressionReport, saveAffirmationReport } from '../redux/actions';

class LogScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      modalVisible: false,
      refreshing: false,
      selectedData: {},
      report: {}
    }
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  _selectedItem = (data) => {
    this.setState({ selectedData: data });
    this.setModalVisible(true);
    this.setState({ report: data.report });
  }

  editReport = () => {
    this.setModalVisible(!this.state.modalVisible);
    if (this.state.selectedData.type == 'MICROAGGRESSION') {
      this.props.saveAggressionReport(null, null, this.state.report);
      this.props.navigation.navigate('AggressionReport');
    } else {
      this.props.saveAffirmationReport(null, null, this.state.report);
      this.props.navigation.navigate('AffirmationReport');
    }
  }

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.container}>
          {this.props.allReports.map((report, i) => {

            return (
              <TouchableHighlight key={i} underlayColor={"#eee"} onPress={() => this._selectedItem(report)}>
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

        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ borderBottomWidth: 1, narginBottom: 5 }}>
                <Title style={this.state.selectedData.type == 'MICROAGGRESSION' ? styles.aggressionText : styles.affirmationText}>
                  {this.state.selectedData.type} Report
              </Title>
                <Subheading>{this.state.report.incidentTime}</Subheading>
              </View>

              <View style={{ marginVertical: hp('3%') }}>
                <Text style={this.state.selectedData.type == 'MICROAGGRESSION' ? styles.aggressionText : styles.affirmationText}>
                  Description
                </Text>
                <Text numberOfLines={1} style={styles.text}>
                  {this.state.report.description ? this.state.report.description.trim() : ''}
                </Text>
                <Text style={this.state.selectedData.type == 'MICROAGGRESSION' ? styles.aggressionText : styles.affirmationText}>
                  Related To
                </Text>
                <Text numberOfLines={1} style={styles.text}>{getRelatedTo(this.state.report)}</Text>
                <Text style={this.state.selectedData.type == 'MICROAGGRESSION' ? styles.aggressionText : styles.affirmationText}>
                  Sensitivity
                </Text>
                <Text numberOfLines={1} style={styles.text}>{this.state.report.sensitivity}</Text>
                <Text style={this.state.selectedData.type == 'MICROAGGRESSION' ? styles.aggressionText : styles.affirmationText}>
                  Location
                </Text>
                <Text numberOfLines={1} style={styles.text}>{this.state.report.location}</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#b16d65", flex: 1, marginHorizontal: wp('3%') }}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3", flex: 1, marginHorizontal: wp('3%') }}
                  onPress={() => {
                    this.editReport()
                  }}
                >
                  <Text style={styles.textStyle}>Edit</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>

      </ScrollView>
    );
  }
}

function getRelatedTo(report) {
  let related = [];
  const keys = [
    'relatedToRace',
    'relatedToCulture',
    'relatedToGender',
    'relatedToSexualOrientation',
    'relatedToOther',
    // 'relatedToOtherDescription',
  ];
  keys.forEach(key => {
    if (key === 'relatedToOther' && report[key]) {
      related.push(report['relatedToOtherDescription']);
    } else if (report[key]) {
      related.push(key.substr(9));
    }
  });

  return related.join(', ');
}

function mapStateToProps(state) {
  return {
    allReports: state.reports,
  };
}

export default connect(
  mapStateToProps,
  { getAggressionReports, saveAggressionReport, saveAffirmationReport }
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
  label: {
    marginVertical: hp('.75%'),
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 5,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});