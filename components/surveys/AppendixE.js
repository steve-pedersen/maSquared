import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Text,
  Button,
  RadioButton,
  TextInput,
  Title,
  Switch
} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { postSurvey } from '../util/Api';
import { 
  saveSurveyE, 
  saveIntroSurvey, 
  addSurvey,
  completeIntroSurvey,
  resetA,
  resetB,
  resetC,
  resetD,
  resetE,
  deactivateSurvey,
  updatePendingSurvey,
} from '../../redux/actions';


const Bold = ({ children }) => <Text style={{ fontWeight: 'bold' }}>{children}</Text>;


const placeholder = {
  label: '_',
  value: null,
  color: '#9EA0A4',
};

class AppendixE extends Component {

  onSurveyChange(key, value, label=null) {
    this.props.saveSurveyE(key, (value != 0 ? value : null), label);
  }

  handleSubmit = values => {
    const surveyData = {
      type: this.props.type,
      appendices: {
        appendixA: this.props.surveyA,
        appendixB: this.props.surveyB,
        appendixC: this.props.surveyC,
        appendixD: this.props.surveyD,
        appendixE: this.props.surveyE,
      },
      user: this.props.user,
      id: null
    };

    let surveyId = null;

    if (this.props.type === 'PRE') {
      postSurvey(surveyData).then(res => {
        if (res && res.data && res.data.surveyId) {
          surveyData.id = res.data.surveyId;
          surveyId = surveyData.id;
        }
        this.props.addSurvey(surveyData);
        
        if (!this.props.activeSurvey.isActive) {
          this.props.saveIntroSurvey(surveyData);
        }
      }).catch(error => {
        console.warn('Unable to post survey to API.', error);
      }).finally(() => {
        this.props.resetA();
        this.props.resetB();
        this.props.resetC();
        this.props.resetD();
        this.props.resetE();
        this.props.completeIntroSurvey();
      });
    } else {
      this.props.navigation.navigate('AppendixL', {});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContentContainer}>
          <View>
            <Title style={{ marginBottom: 20, fontSize: 18 }}>
              Demographic Questions
            </Title>
          </View>

          <View style={styles.pickerContainer}>
            <Text style={styles.questionText}><Bold>1. </Bold>What is your age?</Text>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <TextInput
                style={{ flexGrow: 1 }}
                mode='outlined'
                // label=''
                value={this.props.surveyE[1].value}
                onChangeText={
                  value => this.onSurveyChange(1, value)
                }
              />
            </TouchableWithoutFeedback>
          </View>


          <View style={{ marginVertical: 30 }}>
            <View style={{ paddingBottom: 10 }}>
              <Text style={styles.questionText}>
                <Bold>2. </Bold> What is your current gender identity?
              </Text>
            </View>
            <RadioButton.Group
              key={2}
              onValueChange={this.onSurveyChange.bind(this, 2)}
              value={this.props.surveyE[2].value}
            >
              {surveyAsAppendixE2.map(function (answer) {
                let isChecked = this.props.surveyE[2].value === answer.key;
                return (
                  <View key={answer.key}>
                    <RadioButton.Item
                      key={answer.key}
                      label={answer.label}
                      value={answer.key}
                      status={isChecked ? 'checked' : 'unchecked'}
                    />
                  </View>
                );
              }, this)}
            </RadioButton.Group>
          </View>

          {this.props.surveyE[2].value === 5 ?
            (
              <View>
                <View style={{ paddingBottom: 10 }}>
                  <Text style={styles.questionText}>
                    <Bold>2a. </Bold> If there are any other words or terms you use
                    describe your gender identity, please select them from the list
                    below. If not, please select the “Not Applicable” option at the
                    end of the list.
                  </Text>
                </View>
                {surveyAsAppendixE2a.map(function (answer) {
                  return (
                    <View style={styles.switchContainer} key={answer.key}>
                      <Switch
                        key={answer.key}
                        onValueChange={
                          value => this.onSurveyChange(answer.key, value, answer.label)
                        }
                        value={this.props.surveyE[answer.key].value}
                        trackColor='#DEDEDE'
                      />
                      <Text style={styles.switchText}>{answer.label}</Text>
                      {answer.key === '2a31' && this.props.surveyE[answer.key].value ?
                        (
                          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <TextInput
                              style={{ flexGrow: 1, marginLeft: 10 }}
                              key={'2a31Other'}
                              mode='outlined'
                              label='Other'
                              value={this.props.surveyE['2a31Other'].value}
                              onChangeText={
                                value => this.onSurveyChange('2a31Other', value)
                              }
                            />
                          </TouchableWithoutFeedback>
                        ) :
                        undefined
                      }
                    </View>
                  );
                }, this)}
              </View>
            ) :
            undefined
          }

          <View style={{ marginVertical: 30 }}>
            <View style={{ paddingBottom: 10 }}>
              <Text style={styles.questionText}>
                <Bold>3. </Bold> What gender were you assigned at birth?
              </Text>
            </View>
            <RadioButton.Group
              key={3}
              onValueChange={this.onSurveyChange.bind(this, 3)}
              value={this.props.surveyE[3].value}
            >
              {surveyAsAppendixE3.map(function (answer) {
                let isChecked = this.props.surveyE[3].value === answer.key;
                return (
                  <View key={answer.key}>
                    <RadioButton.Item
                      label={answer.label}
                      value={answer.key}
                      status={isChecked ? 'checked' : 'unchecked'}
                    />
                  </View>
                );
              }, this)}
            </RadioButton.Group>
          </View>

          {this.props.surveyE[3].value === 3 ?
            (
              <View style={{ marginVertical: 30 }}>
                <View style={{ paddingBottom: 10 }}>
                  <Text style={styles.questionText}>
                    <Bold>3a. </Bold> As which gender were you raised?
                  </Text>
                </View>
                <RadioButton.Group
                  key={'3a'}
                  onValueChange={this.onSurveyChange.bind(this, '3a')}
                  value={this.props.surveyE['3a'].value}
                >
                  {surveyAsAppendixE3a.map(function (answer) {
                    let isChecked = this.props.surveyE['3a'].value === answer.key;
                    return (
                      <View key={answer.key}>
                        <RadioButton.Item
                          label={answer.label}
                          value={answer.key}
                          status={isChecked ? 'checked' : 'unchecked'}
                        />
                      </View>
                    );
                  }, this)}
                </RadioButton.Group>
              </View>
            ) :
            undefined
          }

          <View style={{ marginVertical: 30 }}>
            <View style={{ paddingBottom: 10 }}>
              <Text style={styles.questionText}>
                <Bold>4. </Bold> When I think about my sexual orientation, I would
                say that I am (a):
              </Text>
            </View>
            <RadioButton.Group
              key={4}
              onValueChange={this.onSurveyChange.bind(this, 4)}
              value={this.props.surveyE[4].value}
            >
              {surveyAsAppendixE4.map(function (answer) {
                let isChecked = this.props.surveyE[4].value === answer.key;
                return (
                  <View key={answer.key}>
                    <RadioButton.Item
                      label={answer.label}
                      value={answer.key}
                      status={isChecked ? 'checked' : 'unchecked'}
                    />
                  </View>
                );
              }, this)}
            </RadioButton.Group>
          </View>


          <View>
            <View style={{ paddingBottom: 10 }}>
              <Text style={styles.questionText}>
                <Bold>5. </Bold> What is your ethnicity? Please check all that apply.
              </Text>
            </View>
            {surveyAsAppendixE5.map(function (answer) {
              return (
                <View key={answer.key}>
                  <View style={styles.switchContainer}>
                    <Switch
                      key={answer.key}
                      onValueChange={
                        value => this.onSurveyChange(answer.key, value)
                      }
                      value={this.props.surveyE[answer.key].value}
                      trackColor='#DEDEDE'
                    />
                    <Text style={styles.switchText}>{answer.label}</Text>
                  </View>
                  {answer.key === '5g' && this.props.surveyE[answer.key].value ?
                    (
                      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <TextInput
                          style={{ flexGrow: 1, marginLeft: 10 }}
                          key={answer.key + 'Other'}
                          mode='outlined'
                          label='Other'
                          value={this.props.surveyE[answer.key + 'Other'].value}
                          onChangeText={
                            value => this.onSurveyChange(answer.key + 'Other', value)
                          }
                        />
                      </TouchableWithoutFeedback>
                    ) :
                    undefined
                  }
                </View>
              );
            }, this)}
          </View>

          <Button
            onPress={this.handleSubmit}
            style={styles.button, {...styles.button, marginTop: 125, marginBottom: 125 }}
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
  return { 
    surveyA: state.surveyA, 
    surveyB: state.surveyB, 
    surveyC: state.surveyC, 
    surveyD: state.surveyD, 
    surveyE: state.surveyE, 
    user: state.user,
    activeSurvey: state.activeSurvey,
    type: state.introSurvey.complete ? 'POST' : 'PRE',
  };
}

export default connect(
  mapStateToProps,
  { 
    saveSurveyE, 
    saveIntroSurvey, 
    addSurvey,
    completeIntroSurvey,
    resetA,
    resetB,
    resetC,
    resetD,
    resetE,
    deactivateSurvey,
    updatePendingSurvey
  }
)(AppendixE);


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
  questionText: {
    fontSize: hp('1.75%')
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    marginVertical: 5
  },
  switchText: {
    marginLeft: wp('3%'),
    fontSize: hp('1.75%'),
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


const surveyAsAppendixE2 = [
  { key: 1, label: 'Woman' },
  { key: 2, label: 'Man' },
  { key: 3, label: 'Trans Woman' },
  { key: 4, label: 'Trans Man' },
  { key: 5, label: 'Genderqueer/Non-binary (Click for more specific options)' },
  { key: 6, label: 'Intersex' },
];
const surveyAsAppendixE2a = [
  { key: "2a1", label: "Woman" },
  { key: "2a2", label: "Man" },
  { key: "2a3", label: "Transgender" },
  { key: "2a4", label: "Genderqueer" },
  { key: "2a5", label: "Agender" },
  { key: "2a6", label: "Aggressive" },
  { key: "2a7", label: "Androgynist" },
  { key: "2a8", label: "Bigender" },
  { key: "2a9", label: "Butch" },
  { key: "2a10", label: "Cross Dresser" },
  { key: "2a11", label: "Drag King" },
  { key: "2a12", label: "Drag Queen" },
  { key: "2a13", label: "Differently Gendered" },
  { key: "2a14", label: "FluidGender Identity" },
  { key: "2a15", label: "FTM" },
  { key: "2a16", label: "Gender Blender" },
  { key: "2a17", label: "Intergender" },
  { key: "2a18", label: "Intersex" },
  { key: "2a19", label: "MTF" },
  { key: "2a20", label: "Neutro" },
  { key: "2a21", label: "Non-op Transexual" },
  { key: "2a22", label: "Omnigender" },
  { key: "2a23", label: "Pre-op Transexual" },
  { key: "2a24", label: "Post-op Transexual" },
  { key: "2a25", label: "Post-gender" },
  { key: "2a26", label: "Queer" },
  { key: "2a27", label: "Stud" },
  { key: "2a28", label: "Trans Man" },
  { key: "2a29", label: "Trans Woman" },
  { key: "2a30", label: "Two-spirit" },
  { key: "2a31", label: "Other" },
  // { key: "2a31Other", label: "Other Text" },
  { key: "2a32", label: "Not Applicable" },
];
const surveyAsAppendixE3 = [
  { key: 1, label: 'Female' },
  { key: 2, label: 'Male' },
  { key: 3, label: 'Intersex' },
];
const surveyAsAppendixE3a = [
  { key: 1, label: 'Female' },
  { key: 2, label: 'Male' },
];
const surveyAsAppendixE4 = [
  { key: 1, label: 'Heterosexual Woman (Straight Woman)' },
  { key: 2, label: 'Heterosexual Man (Straight Man)' },
  { key: 3, label: 'Gay Man/Queer Man' },
  { key: 4, label: 'Lesbian/Dyke/Queer Woman' },
  { key: 5, label: 'Bisexual Woman' },
  { key: 6, label: 'Bisexual Man' },
  { key: 7, label: 'Asexual' },
  { key: 8, label: 'Pansexual/Anthroposexual' },
  { key: 9, label: 'Queer' },
  { key: 10, label: 'Sapiosexual' },
  // { key: 11, label: 'Other (please specify)' },
];
const surveyAsAppendixE5 = [
  { key: "5a", label: "African American/Black" },
  { key: "5b", label: "Asian American/Asian" },
  { key: "5c", label: "European American/White" },
  { key: "5d", label: "Hispanic/Latina/Latino" },
  { key: "5e", label: "Native American" },
  { key: "5f", label: "Pacific Islander" },
  { key: "5g", label: "Other (please specify)" },
];