import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView} from 'react-native';
import { Text, Button, Paragraph } from 'react-native-paper';
// import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';

import { getSurveyB, saveSurveyB } from '../../actions';

const Bold = ({ children }) => <Text style={{ fontWeight: 'bold' }}>{children}</Text>;
const U = ({ children }) => <Text style={{ textDecorationLine: 'underline' }}>{children}</Text>;

const placeholder = {
  label: '',
  value: null,
  color: '#9EA0A4',
};

class AppendixB extends Component {

  onSurveyChange(key, value) {
    // console.log('onSurveyChange: ', key, value);
    this.props.saveSurveyB(key, (value != 0 ? value : null));
  }

  handleSubmit = values => {
    // console.log('submitting form', values);
    // saveSurveyA(surveyA);
    this.props.navigation.navigate('AppendixC', {});
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContentContainer}>
          <View>
            <Paragraph style={{ marginBottom: 20, fontSize: 18 }}>
              Assuming you were motivated to do your best, on a scale 1
              (Completely Unsure) to 10 (Completely Sure), please indicate
              whether or not you could <U>successfully</U> do each of the following:
            </Paragraph>
          </View>
          {surveyQsAppendixB.map((prop, key) => {
            key++;
            return (
              <View key={key} style={{ marginBottom: 30 }}>
                <Text style={{ paddingBottom: 10, fontSize: 15 }}><Bold>{prop.key}. </Bold> {prop.text}</Text>
                <View style={styles.pickerContainer}>
                  <RNPickerSelect
                    placeholder={placeholder}
                    items={answerScale}
                    onValueChange={this.onSurveyChange.bind(this, key)}
                    style={pickerSelectStyles}
                    value={this.props.surveyB[key].value}
                    useNativeAndroidPickerStyle={false}
                    textInputProps={{ underlineColorAndroid: 'cyan' }}
                    Icon={() => {
                      return (
                        <Icon
                          name="md-arrow-dropdown"
                          color="#000"
                          size={30}
                        />
                      );
                    }}
                  />
                </View>
              </View>
            );
          })}
          <Button
            onPress={this.handleSubmit}
            style={styles.button}
            mode="contained"
            title="Next"
          >
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
              Next
            </Text>
          </Button>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { surveyB: state.surveyB };
}

export default connect(
  mapStateToProps,
  { getSurveyB, saveSurveyB }
)(AppendixB);


// const answerScale = [
//     { key: 1, text: '1' },
//     { key: 2, text: '2' },
//     { key: 3, text: '3' },
//     { key: 4, text: '4' },
//     { key: 5, text: '5' },
//     { key: 6, text: '6' },
//     { key: 7, text: '7' },
//     { key: 8, text: '8' },
//     { key: 9, text: '9' },
//     { key: 10, text: '10' },
// ];

const answerScale = [
  { value: 1, label: '1 (Completely Unsure)' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: 8, label: '8' },
  { value: 9, label: '9' },
  { value: 10, label: '10 (Completely Sure)' },
];


const surveyQsAppendixB = [
  {
    key: 1,
    text: 'Complete the mathematics requirements for most science, math, or engineering majors.',
  },
  {
    key: 2,
    text: 'Complete the chemistry requirements for most science, math, or engineering majors',
  },
  {
    key: 3,
    text: 'Complete the physics requirements for most science, math, or engineering majors.',
  },
  {
    key: 4,
    text: 'Complete some science, math, or engineering degree.',
  },
  {
    key: 5,
    text: 'Perform competently in some math, science, or engineering career field.',
  },
  {
    key: 6,
    text: 'Remain in science, math, or engineering over the next semester.',
  },
  {
    key: 7,
    text: 'Remain in science, math, or engineering over the next two semesters.',
  },
  {
    key: 8,
    text: 'Remain in science, math, or engineering over the next three semesters.',
  },
  {
    key: 9,
    text: 'Excel in science, math, or engineering over the next semester.',
  },
  {
    key: 10,
    text: 'Excel in science, math, or engineering over the next two semesters.',
  },
  {
    key: 11,
    text: 'Excel in science, math, or engineering over the next three semesters.',
  },
  {
    key: 12,
    text: 'Be accepted into a science math, or engineering graduate program, law school, or medical school.',
  },
  {
    key: 13,
    text: 'Successfully obtain a science, math, or engineering graduate degree, a law degree, or a medical degree.',
  },
  {
    key: 14,
    text: 'Excel in a science, math, or engineering graduate program, a law program, or a medical school program.',
  }
];


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         padding: 20,
//         paddingBottom: 100,
//     },
//     button: {
//         marginTop: 30,
//         marginBottom: 100,
//         backgroundColor: '#74b783',
//         paddingVertical: 6
//     },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 30,
    marginBottom: 100,
    backgroundColor: '#74b783',
    paddingVertical: 6
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  scrollContentContainer: {
    paddingTop: 40,
    paddingBottom: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  flexGrow: 1,
  iconContainer: {
    top: 16,
    right: 20,
  },
  inputIOS: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 18,
    paddingHorizontal: 10,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'green',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

// const pickerSelectStyles = StyleSheet.create({
//   flex: 1,
//   iconContainer: {
//     width: 30,
//     height: 30,
//     right: 12,
//     top: -5,
//   },
//   inputIOS: {
//     fontSize: 16,
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     color: 'black',
//     paddingRight: 30, // to ensure the text is never behind the icon
//   },
//   inputAndroid: {
//     fontSize: 16,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     color: 'black',
//     paddingRight: 30, // to ensure the text is never behind the icon
//   },
// });