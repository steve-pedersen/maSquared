import React, { Component } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  TouchableWithoutFeedback, 
  Keyboard, 
  KeyboardAvoidingView,
  Platform 
} from 'react-native';
import { Text, Button, RadioButton, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';

import { postSurvey } from '../util/Api';

import { 
  saveSurveyL,
  addSurvey,
  resetA,
  resetB,
  resetC,
  resetD,
  resetE,
  resetL,
  deactivateSurvey,
  updatePendingSurvey
} from '../../redux/actions';

class AppendixL extends Component {

  onSurveyChange(key, value) {
    this.props.saveSurveyL(key, (value != 0 ? value : null));
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
        appendixL: this.props.surveyL,
      },
      user: this.props.user,
      id: null
    };

    let surveyId = null;

    // post to api backend then save to redux
    postSurvey(surveyData).then(res => {
      if (res && res.data && res.data.surveyId) {
        surveyData.surveyId = res.data.surveyId;
        surveyData.id = res.data.surveyId;
        surveyId = surveyData.id;
      }
      this.props.addSurvey(surveyData);

      if (this.props.activeSurvey.isActive) {
        this.props.updatePendingSurvey({
          notificationId: this.props.activeSurvey.notificationId,
          surveyId: surveyId
        });
      }
    }).catch(error => {
      console.warn('Unable to post survey to API.', error);
    }).finally(() => {
      this.props.resetA();
      this.props.resetB();
      this.props.resetC();
      this.props.resetD();
      this.props.resetE();
      this.props.resetL();
      this.props.deactivateSurvey();
    });
  }
  
  render() {

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView>
        <View style={styles.questionContainer}>
          <Text>
            1) Did you update your iOS system during the time you were using the MA2 app?
          </Text>
          <RadioButton.Group
            onValueChange={value => this.onSurveyChange('1', value)}
            value={this.props.surveyL['1'].value}>
            <View>
              <RadioButton.Item
                label='Yes'
                value={2}
                status={this.props.surveyL['1'].value == 2 ? 'checked' : 'unchecked'}
              />
              <RadioButton.Item
                label='No'
                value={1}
                status={this.props.surveyL['1'].value == 1 ? 'checked' : 'unchecked'}
              />
            </View>
          </RadioButton.Group>
        
          {this.props.surveyL['1'].value === 2 && (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.inner}>
                <Text>1A) Approximately when did you update your phone's OS?</Text>
                <TextInput
                  style={{ flexGrow: 1 }}
                  mode='outlined'
                  value={this.props.surveyL['1a'].value}
                  onChangeText={text => this.onSurveyChange('1a', text)}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>

        <View style={styles.questionContainer}>
          <Text>
            2) Did you receive daily notifications (Monday through Friday) from 
            MA2 during the time you were using the app?
          </Text>
          <RadioButton.Group
            onValueChange={value => this.onSurveyChange('2', value)}
            value={this.props.surveyL['2'].value}>
            <View>
              <RadioButton.Item
                label='Yes'
                value={2}
                status={this.props.surveyL['2'].value === 2 ? 'checked' : 'unchecked'}
              />
              <RadioButton.Item
                label='No'
                value={1}
                status={this.props.surveyL['2'].value === 1 ? 'checked' : 'unchecked'}
              />
            </View>
          </RadioButton.Group>
        
          {this.props.surveyL['2'].value === 1 && (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.inner}>
                <Text>2A) Approximately how often did you receive notifications from MA2?</Text>
                <TextInput
                  style={{ flexGrow: 1 }}
                  mode='outlined'
                  value={this.props.surveyL['2a'].value}
                  onChangeText={text => this.onSurveyChange('2a', text)}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Text>
              3) Do you have any comments about your experience using the MA2 app? 
              For example, what worked well for you and what was a challenge? 
              All feedback is welcome.
            </Text>
            <TextInput
              value={this.props.surveyL['3'].value}
              onChangeText={text => this.onSurveyChange('3', text)}
              // label='Describe what happened...'
              multiline={true}
              mode='outlined'
              style={{
                // height: 150,
                textAlignVertical: "top",
              }}
              numberOfLines={8} 
                
              />
          </View>
        </TouchableWithoutFeedback>

        <Button
          onPress={this.handleSubmit}
          style={styles.button}
          mode="contained"
          title="Submit">
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
            Submit
          </Text>
        </Button>
        </ScrollView>
      </KeyboardAvoidingView>
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
    surveyL: state.surveyL,
    user: state.user,
    activeSurvey: state.activeSurvey,
    type: 'POST',
  };
}

export default connect(
  mapStateToProps,
  { 
    saveSurveyL,
    addSurvey,
    resetA,
    resetB,
    resetC,
    resetD,
    resetE,
    resetL,
    deactivateSurvey,
    updatePendingSurvey
  }
)(AppendixL);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: '#fff',
    padding: 10,
    paddingBottom: 100,
  },
  questionContainer: {
    padding: 10,
    marginTop: 10,
  },
  button: {
    marginTop: 30,
    marginBottom: 100,
    backgroundColor: '#74b783',
    paddingVertical: 6,
    width: '90%',
    alignSelf: 'center',
  },
  inner: {
    padding: 10,
    flex: 1,
    justifyContent: "space-around"
  },
  header: {
    fontSize: 36,
    marginBottom: 48
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12
  }
});