import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { RadioButton, Text, Button, Title, Paragraph } from 'react-native-paper';
import NotificationsContainer from './util/NotificationsContainer';
import { getConsent, saveConsent, saveDevice } from '../redux/actions';

const Bold = ({ children }) => <Text style={{ fontWeight: 'bold' }}>{children}</Text>;

class ConsentForm extends Component {

  onConsentChange(value) {
    this.props.saveConsent(value);
  }

  handleSubmit = values => {
    if (this.props.consentGranted) {
      let deviceId = this.props.user.deviceId ?? this.props.user.pushToken;
      this.props.saveDevice(deviceId);
    }
  }

  componentDidMount() {

  }

  render() {
    return (    
      <ScrollView style={styles.container}>
        <SafeAreaView>
        {/* <NotificationsContainer /> */}
        {consentText}

        <View style={styles.radioGroup}>
          <RadioButton.Group
            onValueChange={this.onConsentChange.bind(this)}
            value={this.props.consentGranted}
          >
            <View>
              <RadioButton.Item
                label='No, I do not agree'
                value={false}
                status={this.props.consentGranted ? 'unchecked' : 'checked'}
              />
              <RadioButton.Item
                label='Yes, I agree'
                value={true}
                status={this.props.consentGranted ? 'checked' : 'unchecked'}
              />
            </View>
          </RadioButton.Group>
        </View>

        <Button
          onPress={this.handleSubmit}
          style={styles.button}
          mode="contained"
          title="Submit"
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
            Submit
          </Text>
        </Button>
        </SafeAreaView>
      </ScrollView>
      
    );
  }
}


function mapStateToProps(state) {
  return { consentGranted: state.consent.value, user: state.user }
}


export default connect(
  mapStateToProps,
  { getConsent, saveConsent, saveDevice }
)(ConsentForm);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: '#fff',
    padding: 15,
    paddingBottom: 50,
  },
  radioGroup: {
    marginTop: 30,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#efefef',
  },
  button: {
    marginTop: 30,
    marginBottom: 100,
    backgroundColor: '#74b783',
    paddingVertical: 6
  },
  centered : {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 15,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 10,
  },
  text: {
    fontSize: 15
  }
});



const consentText = (
<View>
  <Text style={styles.centered}>
    San Francisco State University{"\n"}
    Informed Consent to Participate in Research{"\n"}
    MA2 App
  </Text>

  <Text style={styles.header}>A.  PURPOSE AND BACKGROUND</Text>

  <Text style={styles.text}>
    The purpose of this research is to gain insight regarding the microaggressive and 
    microaffirmative experiences that students encounter.{"\n\n"}

    The researchers, Leticia Marquez-Magaña, Charlotte Tate, and Lindsey Seril are professors and 
    graduate students at San Francisco State University conducting research for SF BUILD. 
    You are being asked to participate in this study because you are an SF State student.
  </Text>

  <Text style={styles.header}>B.  PROCEDURES </Text>

  <Text style={styles.text}>
    If you agree to participate in this research, the following will occur:{"\n"}
  </Text>

  <Text>
    <Text>
      {'\u2022  '}You will watch a tutorial video about microaggressions, microaffirmations, and how 
      to utilize the MA2 app, which will take approximately 7 minutes.
    </Text>{"\n\n"}
    <Text>
      {'\u2022  '}You will complete a pre-assessment in the MA2 app, which will take approximately 10 
      minutes. It will ask about your feelings of school connectedness, self-efficacy, sense of dignity, 
      sleep quality, and a few demographic questions.
    </Text>{"\n\n"}
    <Text>
      {'\u2022  '}You will log microaggressions and microaffirmations experienced on SF State’s campus 
      within the app. Each entry should take approximately 5 minutes to log. 
    </Text>{"\n\n"}
    <Text>
      {'\u2022  '}You will receive one notification from the app a day, Monday through Friday. You will 
      earn $1 for each notification you accept within 1 hour of receiving. Responding to a notification 
      takes less than a minute. 
    </Text>{"\n\n"}
    <Text>
      {'\u2022  '}You will complete a post-assessment in the app, which will take approximately 10 minutes. 
      It will ask about your feelings of school connectedness, self-efficacy, sense of dignity, sleep 
      quality, and about your experience with the app.
    </Text>{"\n\n"}
  </Text>

  <Text>
  The minimum time commitment, in total, is approximately 27 minutes (if you do not create any 
  reports or respond to any notifications).
  </Text>

  <Text style={styles.header}>C.  RISKS</Text>

  <Text style={styles.text}>
    There is a possibility of psychological risk and discomfort associated with identifying and 
    logging microaggressions; however, there is no more risk than what would be experienced in 
    daily life. If you feel uncomfortable at any time, you may stop participating in the study. 
    There is also the possibility of loss of privacy. To mitigate this risk, you will never be asked 
    to provide your name. You will be assigned a unique, de-identified numerical code that corresponds 
    with your app activity.
  </Text>

  <Text style={styles.header}>D.  CONFIDENTIALITY </Text>

  <Text style={styles.text}>
    Research data will be stored in an encrypted database. Data will only be accessed by the 
    researchers on a password-protected computer. Data will only be accessed by the researchers 
    on a password-protected computer and will be kept for a minimum of 10 years.
  </Text>

  <Text style={styles.header}>E.  DIRECT BENEFITS</Text>

  <Text style={styles.text}>
    There will be no direct benefits to you as the participant.
  </Text>

  <Text style={styles.header}>F.  COSTS </Text>

  <Text style={styles.text}>
    There will be no cost to you for participating in this research.
  </Text>

  <Text style={styles.header}>G.  COMPENSATION </Text>

  <Text style={styles.text}>
    There will be no automatic compensation for participating in this research. You will receive 
    $5 for downloading the app and completing the pre-assessment, and you may earn up to $5 a week 
    for responding to app notifications within one hour of receiving them.
  </Text>

  <Text style={styles.header}>H.  ALTERNATIVES </Text>

  <Text style={styles.text}>
    The alternative is not to participate in the research. 
  </Text>

  <Text style={styles.header}>I.  QUESTIONS</Text>

  <Text style={styles.text}>
    If you have any questions about the study, you may ask the researchers on ma2sfsu.blogspot.com or 
    contact Charlotte Tate at ctate2@sfsu.edu.
    {"\n\n"}
    Questions about your rights as a study participant, or comments or complaints about the study, 
    may also be addressed to the Human and Animal Protections at (415) 338-1093 or protocol@sfsu.edu. 
    {"\n\n"}
    PARTICIPATION IN THIS RESEARCH IS VOLUNTARY.  You are free to decline to participate in this 
    research, or to withdraw your participation at any point, without penalty. Your decision whether 
    or not to participate in this research will have no influence on your present or future status at 
    San Francisco State University.
    {"\n\n"}
    TO WITHDRAW FROM THE STUDY AND DATA COLLECTION, send an email to buildres@sfsu.edu and include your 
    User ID (this can be found on the More tab on the bottom of the home screen).
    {"\n\n"}
    By proceeding in the MA2 app, you are agreeing to participation in this research study. 
  </Text>

</View>
);