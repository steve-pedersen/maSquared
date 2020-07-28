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
import { Text, Button, RadioButton, Title, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';

import { savePostMeasureSurvey } from '../../redux/actions';

class PostMeasure extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      q1Yes: this.props.survey.q1,
      q2No: this.props.survey.q2,
    }
  }

  onSurveyChange = (key, value) => {
    // console.log(key, value);
    switch(key) {
      case 'q1':
        this.setState({ q1Yes: value }); break;
      case 'q2':
        this.setState({ q2No: value }); break;
    }
    this.props.savePostMeasureSurvey(key, value);
  }

  handleSubmit = () => {
    this.props.navigation.navigate('Root');
  }
  
  render() {
    // console.log(this.props.survey.q1);
    
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
            onValueChange={value => this.onSurveyChange('q1', value)}
            value={this.props.survey.q1}>
            <View>
              <RadioButton.Item
                label='Yes'
                value={true}
                // status={this.props.q1 && this.props.q1 !== undefined ? 'checked' : 'unchecked'}
              />
              <RadioButton.Item
                label='No'
                value={false}
                status={this.props.survey.q1 === false ? 'checked' : 'unchecked'}
              />
            </View>
          </RadioButton.Group>
        
          {this.state.q1Yes && (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.inner}>
                <Text>1A) Approximately when did you update your phone's OS?</Text>
                <TextInput
                  style={{ flexGrow: 1 }}
                  mode='outlined'
                  value={this.props.survey.q1a}
                  onChangeText={text => this.onSurveyChange('q1a', text)}
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
            onValueChange={value => this.onSurveyChange('q2', value)}
            value={this.props.survey.q2}>
            <View>
              <RadioButton.Item
                label='Yes'
                value={true}
              />
              <RadioButton.Item
                label='No'
                value={false}
                status={this.props.survey.q2 === false ? 'checked' : 'unchecked'}
              />
            </View>
          </RadioButton.Group>
        
          {this.state.q2No === false && (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.inner}>
                <Text>2A) Approximately how often did you receive notifications from MA2?</Text>
                <TextInput
                  style={{ flexGrow: 1 }}
                  mode='outlined'
                  value={this.props.survey.q2a}
                  onChangeText={text => this.onSurveyChange('q2a', text)}
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
              value={this.props.survey.q3}
              onChangeText={text => this.onSurveyChange('q3', text)}
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
  return { survey: state.postMeasureSurvey };
}

export default connect(
  mapStateToProps,
  { savePostMeasureSurvey }
)(PostMeasure);


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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   inner: {
//     padding: 24,
//     flex: 1,
//     justifyContent: "space-around"
//   },
//   header: {
//     fontSize: 36,
//     marginBottom: 48
//   },
//   textInput: {
//     height: 40,
//     borderColor: "#000000",
//     borderBottomWidth: 1,
//     marginBottom: 36
//   },
//   btnContainer: {
//     backgroundColor: "white",
//     marginTop: 12
//   }
// });