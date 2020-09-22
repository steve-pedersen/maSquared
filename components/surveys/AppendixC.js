import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';

import { saveSurveyC, saveSurvey } from '../../redux/actions';

const Bold = ({ children }) => <Text style={{ fontWeight: 'bold' }}>{children}</Text>;
const U = ({ children }) => <Text style={{ textDecorationLine: 'underline' }}>{children}</Text>;

const placeholder = {
  label: '_',
  value: null,
  color: '#9EA0A4',
};

class AppendixC extends Component {

  onSurveyChange(key, value) {
    this.props.saveSurveyC(key, (value != 0 ? value : null));;
  }

  handleSubmit = values => {
    // TODO: update redux state to survey complete, 
    // then allow App to go to Home nav stack
    // this.props.navigation.navigate('Root', {});
    this.props.navigation.navigate('AppendixD', {});
    // this.props.saveSurvey(true);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContentContainer}>
          <View>
            <Paragraph style={{ marginBottom: 20, fontSize: 18 }}>
              Thinking about your current life, please read each of these
              statements and rate to what extent you feel this is true for
              you at SF State, on a scale of <Bold>1 (Never)</Bold> to 
              <Bold> 10 (Always)</Bold>:
            </Paragraph>
          </View>
          {surveyQsAppendixC.map((prop, key) => {
            key++;
            return (

              <View key={key} style={{ marginBottom: 30 }}>
                <View style={{ paddingBottom: 10 }}>
                  {prop.content}
                </View>
                <View style={styles.pickerContainer}>
                  <RNPickerSelect
                    placeholder={placeholder}
                    items={answerScale}
                    onValueChange={this.onSurveyChange.bind(this, key)}
                    style={pickerSelectStyles}
                    value={this.props.surveyC[key].value}
                    useNativeAndroidPickerStyle={false}
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
  return { surveyC: state.surveyC };
}

export default connect(
  mapStateToProps,
  { saveSurveyC, saveSurvey }
)(AppendixC);



const answerScale = [
  { key: 1, value: 1, label: '1 (Never)', displayValue: false },
  { key: 2, value: 2, label: '2', displayValue: false },
  { key: 3, value: 3, label: '3', displayValue: false },
  { key: 4, value: 4, label: '4', displayValue: false },
  { key: 5, value: 5, label: '5', displayValue: false },
  { key: 6, value: 6, label: '6', displayValue: false },
  { key: 7, value: 7, label: '7', displayValue: false },
  { key: 8, value: 8, label: '8', displayValue: false },
  { key: 9, value: 9, label: '9', displayValue: false },
  { key: 10, value: 10, label: '10 (Always)', displayValue: false },
];


const surveyQsAppendixC = [
  {
    key: 1,
    content: (<Text>I feel my <Bold>identity</Bold> is <Bold>accepted</Bold>.</Text>),
  },
  {
    key: 2,
    content: (<Text>I feel <Bold>recognized</Bold> for my good efforts, thoughfulness, and talents.</Text>)
  },
  {
    key: 3,
    content: (<Text> I feel <Bold>acknowledged</Bold> (seen, heard, listened to, validated and responded to about my concern).</Text>)
  },
  {
    key: 4,
    content: (<Text>I feel <Bold>included</Bold> (a sense of belonging).</Text>)
  },
  {
    key: 5,
    content: (<Text>I feel <Bold>safe</Bold> (both physically and psychologically).</Text>)
  },
  {
    key: 6,
    content: (<Text>I feel <Bold>treated fairly</Bold>.</Text>)
  },
  {
    key: 7,
    content: (<Text>I feel <Bold>autonomous</Bold> (free to make my own decisions and act on my own behalf).</Text>)
  },
  {
    key: 8,
    content: (<Text>I feel <Bold>understood</Bold>.</Text>)
  },
  {
    key: 9,
    content: (<Text>I feel I am given the <Bold>benefit of the doubt</Bold>.</Text>)
  },
  {
    key: 10,
    content: (<Text>I feel <Bold>apologized to</Bold> when someone violates my dignity.</Text>)
  }
];


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
