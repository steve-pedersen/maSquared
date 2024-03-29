import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  StyleSheet,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Text,
  Button,
  Paragraph,
  RadioButton,
  TextInput,
} from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Ionicons";
import RNPickerSelect from "react-native-picker-select";
import { saveSurveyD, saveSurvey } from "../../redux/actions";

const Bold = ({ children }) => (
  <Text style={{ fontWeight: "bold" }}>{children}</Text>
);
const U = ({ children }) => (
  <Text style={{ textDecorationLine: "underline" }}>{children}</Text>
);
const I = ({ children }) => (
  <Text style={{ fontStyle: "italic" }}>{children}</Text>
);

const placeholder = {
  label: "_",
  value: null,
  color: "#9EA0A4",
};

class AppendixD extends Component {
  onSurveyChange(key, value) {
    this.props.saveSurveyD(key, value != 0 ? value : null);
  }

  handleSubmit = (values) => {
    this.props.navigation.navigate("AppendixE", {});
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContentContainer}
        >
          <View>
            <Paragraph style={{ marginBottom: 30, fontSize: 22 }}>
              The following questions relate to your usual sleep habits during
              the past month <I>only</I>. Your answers should indicate the most
              accurate reply for the <I>majority</I> of days and nights in the
              past month. <U>Please answer all questions.</U>
            </Paragraph>
          </View>
          {surveyQsAppendixD1234.map((prop, key) => {
            key++;
            if (key === 1) {
              return (
                <View key={key} style={{ marginBottom: 30 }}>
                  <View style={{ paddingBottom: 10 }}>{prop.question}</View>
                  <View style={styles.pickerContainer}>
                    <RNPickerSelect
                      items={surveyTimes}
                      onValueChange={this.onSurveyChange.bind(this, key)}
                      style={pickerSelectStyles}
                      value={this.props.surveyD[prop.key].value}
                      useNativeAndroidPickerStyle={false}
                      Icon={() => {
                        return (
                          <Icon name='md-caret-down' color='#000' size={30} />
                        );
                      }}
                    />
                  </View>
                </View>
              );
            } else {
              return (
                <View key={key} style={{ marginBottom: 30 }}>
                  <View style={{ paddingBottom: 10 }}>{prop.question}</View>
                  <View style={styles.pickerContainer}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                      <TextInput
                        style={{ flexGrow: 1 }}
                        mode='outlined'
                        keyboardType='numeric'
                        label={prop.label}
                        value={this.props.surveyD[prop.key].value}
                        onChangeText={(value) =>
                          this.onSurveyChange(prop.key, value)
                        }
                      />
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              );
            }
          })}

          {/* <Divider style={{ marginBottom: hp('3.5%') }} /> */}

          <View>
            <Paragraph
              style={{ marginBottom: 20, marginTop: 20, fontSize: 22 }}
            >
              For each of the next ten questions <I>(5a-5j)</I>, check the one
              best response.{" "}
              <U>
                Please answer <I>all</I> questions.
              </U>
            </Paragraph>
          </View>
          {surveyQsAppendixD5.map((prop, key) => {
            key = key + 1;
            let that = this;
            return (
              <View key={key} style={{ marginVertical: 15 }}>
                <View>
                  <Text style={{ ...styles.questionText, paddingBottom: 5 }}>
                    <Bold>{prop.key}.</Bold> {prop.label}
                  </Text>
                </View>
                <RadioButton.Group
                  key={prop.key}
                  onValueChange={this.onSurveyChange.bind(this, prop.key)}
                  value={this.props.surveyD[prop.key].value}
                >
                  {surveyAsAppendixD5.map(function (answer) {
                    let isChecked =
                      that.props.surveyD[prop.key].value === answer.key;
                    return (
                      <View key={answer.key}>
                        <RadioButton.Item
                          label={answer.label}
                          value={answer.key}
                          style={styles.answerText}
                          status={isChecked ? "checked" : "unchecked"}
                        />
                      </View>
                    );
                  })}
                </RadioButton.Group>
              </View>
            );
          })}
          <View style={styles.pickerContainer}>
            <Text style={styles.questionText}>
              <Bold>5j. </Bold>Other reason(s), please describe
            </Text>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <TextInput
                style={{ flexGrow: 1 }}
                mode='outlined'
                // label=''
                value={this.props.surveyD["5j"].value}
                onChangeText={(value) => this.onSurveyChange("5j", value)}
              />
            </TouchableWithoutFeedback>
          </View>

          {/* <Divider style={{ marginVertical: hp('5%') }} /> */}

          <View style={{ marginVertical: 15, marginTop: 30 }}>
            <View>
              <Text style={styles.questionText}>
                <Bold>6. </Bold>
                During the past month, how would you rate your sleep quality
                overall?
              </Text>
            </View>
            <RadioButton.Group
              key='6'
              onValueChange={this.onSurveyChange.bind(this, "6")}
              value={this.props.surveyD["6"].value}
            >
              {surveyAsAppendixD6.map(function (answer) {
                let isChecked = this.props.surveyD["6"].value === answer.key;
                return (
                  <View key={answer.key}>
                    <RadioButton.Item
                      label={answer.label}
                      value={answer.key}
                      style={styles.answerText}
                      status={isChecked ? "checked" : "unchecked"}
                    />
                  </View>
                );
              }, this)}
            </RadioButton.Group>
          </View>

          <View style={{ marginVertical: 15 }}>
            <View>
              <Text style={styles.questionText}>
                <Bold>7. </Bold>
                During the past month, how often have you taken medicine
                (prescribed or over the counter) to help you sleep?
              </Text>
            </View>
            <RadioButton.Group
              key='7'
              onValueChange={this.onSurveyChange.bind(this, "7")}
              value={this.props.surveyD["7"].value}
            >
              {surveyAsAppendixD7.map(function (answer) {
                let isChecked = this.props.surveyD["7"].value === answer.key;
                return (
                  <View key={answer.key}>
                    <RadioButton.Item
                      label={answer.label}
                      value={answer.key}
                      style={styles.answerText}
                      status={isChecked ? "checked" : "unchecked"}
                    />
                  </View>
                );
              }, this)}
            </RadioButton.Group>
          </View>

          <View style={{ marginVertical: 15 }}>
            <View>
              <Text style={styles.questionText}>
                <Bold>8. </Bold>
                During the past month, how often have you had trouble staying
                awake while driving, eating meals, or engaging in social
                activity?
              </Text>
            </View>
            <RadioButton.Group
              key='8'
              onValueChange={this.onSurveyChange.bind(this, "8")}
              value={this.props.surveyD["8"].value}
            >
              {surveyAsAppendixD8.map(function (answer) {
                let isChecked = this.props.surveyD["8"].value === answer.key;
                return (
                  <View key={answer.key}>
                    <RadioButton.Item
                      label={answer.label}
                      value={answer.key}
                      style={styles.answerText}
                      status={isChecked ? "checked" : "unchecked"}
                    />
                  </View>
                );
              }, this)}
            </RadioButton.Group>
          </View>

          <View style={{ marginVertical: 15 }}>
            <View>
              <Text style={styles.questionText}>
                <Bold>9. </Bold>
                During the past month, how much of a problem has it been for you
                to keep up enough enthusiasm to get things done?
              </Text>
            </View>
            <RadioButton.Group
              key='9'
              onValueChange={this.onSurveyChange.bind(this, "9")}
              value={this.props.surveyD["9"].value}
            >
              {surveyAsAppendixD9.map(function (answer) {
                let isChecked = this.props.surveyD["9"].value === answer.key;
                return (
                  <View key={answer.key}>
                    <RadioButton.Item
                      label={answer.label}
                      value={answer.key}
                      style={styles.answerText}
                      status={isChecked ? "checked" : "unchecked"}
                    />
                  </View>
                );
              }, this)}
            </RadioButton.Group>
          </View>

          <View style={{ marginVertical: 15 }}>
            <View>
              <Text style={styles.questionText}>
                <Bold>10. </Bold>
                Do you have a bed partner or roommate?
              </Text>
            </View>
            <RadioButton.Group
              key='10'
              onValueChange={this.onSurveyChange.bind(this, "10")}
              value={this.props.surveyD["10"].value}
            >
              {surveyAsAppendixD10.map(function (answer) {
                let isChecked = this.props.surveyD["10"].value === answer.key;
                return (
                  <View key={answer.key}>
                    <RadioButton.Item
                      label={answer.label}
                      value={answer.key}
                      style={styles.answerText}
                      status={isChecked ? "checked" : "unchecked"}
                    />
                  </View>
                );
              }, this)}
            </RadioButton.Group>
          </View>

          <View>
            <Paragraph
              style={{ marginBottom: 10, fontSize: 22, marginTop: 20 }}
            >
              <I>
                If you have a roommate or bed partner, ask him/her how often in
                the past month you have had...
              </I>
            </Paragraph>
          </View>
          {surveyQsAppendixD10.map((prop, key) => {
            key = key + 1;
            let that = this;
            return (
              <View key={key} style={{ marginVertical: 15 }}>
                <View>
                  <Text style={styles.questionText}>
                    <Bold>{prop.key}.</Bold> {prop.label}
                  </Text>
                </View>
                {prop.key === "10e" ? (
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <TextInput
                      style={{ flexGrow: 1 }}
                      mode='outlined'
                      // label='Other restlessness'
                      value={this.props.surveyD["10eOther"].value}
                      onChangeText={(value) =>
                        this.onSurveyChange("10eOther", value)
                      }
                    />
                  </TouchableWithoutFeedback>
                ) : undefined}
                <RadioButton.Group
                  key={prop.key}
                  onValueChange={this.onSurveyChange.bind(this, prop.key)}
                  value={this.props.surveyD[prop.key].value}
                >
                  {surveyAsAppendixD5.map(function (answer) {
                    let isChecked =
                      that.props.surveyD[prop.key].value === answer.key;
                    return (
                      <View key={answer.key}>
                        <RadioButton.Item
                          label={answer.label}
                          value={answer.key}
                          style={styles.answerText}
                          status={isChecked ? "checked" : "unchecked"}
                        />
                      </View>
                    );
                  })}
                </RadioButton.Group>
              </View>
            );
          })}

          <Button
            onPress={this.handleSubmit}
            style={styles.button}
            mode='contained'
            title='Next'
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
              Next
            </Text>
          </Button>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { surveyD: state.surveyD };
}

export default connect(mapStateToProps, { saveSurveyD, saveSurvey })(AppendixD);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  button: {
    marginTop: 30,
    marginBottom: 100,
    backgroundColor: "#74b783",
    paddingVertical: 6,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  scrollContentContainer: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  questionText: {
    fontSize: hp("1.75%"),
    fontSize: 20,
  },
  answerText: {
    fontSize: 12,
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
  },
});

const pickerSelectStyles = StyleSheet.create({
  flexGrow: 1,
  iconContainer: {
    top: 12,
    right: 16,
  },
  inputIOS: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 16,
    paddingHorizontal: 10,
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "green",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const surveyTimes = [
  { key: 0, value: "0000", label: "12 AM (Midnight)", displayValue: false },
  { key: 1, value: "0100", label: "1 AM", displayValue: false },
  { key: 2, value: "0200", label: "2 AM", displayValue: false },
  { key: 3, value: "0300", label: "3 AM", displayValue: false },
  { key: 4, value: "0400", label: "4 AM", displayValue: false },
  { key: 5, value: "0500", label: "5 AM", displayValue: false },
  { key: 6, value: "0600", label: "6 AM", displayValue: false },
  { key: 7, value: "0700", label: "7 AM", displayValue: false },
  { key: 8, value: "0800", label: "8 AM", displayValue: false },
  { key: 9, value: "0900", label: "9 AM", displayValue: false },
  { key: 10, value: "1000", label: "10 AM", displayValue: false },
  { key: 11, value: "1100", label: "11 AM", displayValue: false },
  { key: 12, value: "1200", label: "12 PM", displayValue: false },
  { key: 13, value: "1300", label: "1 PM", displayValue: false },
  { key: 14, value: "1400", label: "2 PM", displayValue: false },
  { key: 15, value: "1500", label: "3 PM", displayValue: false },
  { key: 16, value: "1600", label: "4 PM", displayValue: false },
  { key: 17, value: "1700", label: "5 PM", displayValue: false },
  { key: 18, value: "1800", label: "6 PM", displayValue: false },
  { key: 19, value: "1900", label: "7 PM", displayValue: false },
  { key: 20, value: "2000", label: "8 PM", displayValue: false },
  { key: 21, value: "2100", label: "9 PM", displayValue: false },
  { key: 22, value: "2200", label: "10 PM", displayValue: false },
  { key: 23, value: "2300", label: "11 PM", displayValue: false },
];

const surveyQsAppendixD1234 = [
  {
    key: 1,
    question: (
      <View>
        <Text style={styles.questionText}>
          <Bold>1. </Bold>During the past month, when have you usually gone to
          bed at night?
        </Text>
        <Text style={{ ...styles.questionText, fontSize: 18 }}>
          <I>
            For example, if you have usually gone to bed at 11 at night, please
            input 11.
          </I>
        </Text>
      </View>
    ),
    label: "USUAL BED TIME",
  },
  {
    key: 2,
    question: (
      <View>
        <Text style={styles.questionText}>
          <Bold>2. </Bold>During the past month, how long (in minutes) has it
          taken you to fall asleep each night?
        </Text>
        <Text style={{ ...styles.questionText, fontSize: 18 }}>
          <I>
            For example, if it has usually taken you 15 minutes to asleep please
            input 15.
          </I>
        </Text>
      </View>
    ),
    label: "NUMBER OF MINUTES",
  },
  {
    key: 3,
    question: (
      <View>
        <Text style={styles.questionText}>
          <Bold>3. </Bold>During the past month, when have you usually gotten up
          in the morning?
        </Text>
        <Text style={{ ...styles.questionText, fontSize: 18 }}>
          <I>
            For example, if you have usually gotten up at 9 in the morning,
            please input 9.
          </I>
        </Text>
      </View>
    ),
    label: "USUAL GETTING UP TIME",
  },
  {
    key: 4,
    question: (
      <View>
        <Text style={styles.questionText}>
          <Bold>4. </Bold>During the past month, how many hours of actual sleep
          did you get at night?
        </Text>
        <Text style={{ ...styles.questionText, fontSize: 18 }}>
          <I>
            This may be different than the number of hours you spend in bed. For
            example, if you got 7 hours of actual sleep, please input 7.
          </I>
        </Text>
      </View>
    ),
    label: "HOURS OF SLEEP PER NIGHT",
  },
];
const surveyQsAppendixD5 = [
  { key: "5a", label: "Cannot get to sleep within 30 minutes." },
  { key: "5b", label: "Wake up in the middle of the night or early morning." },
  { key: "5c", label: "Have to get up to use the bathroom." },
  { key: "5d", label: "Cannot breathe comfortable." },
  { key: "5e", label: "Cough or snore loudly." },
  { key: "5f", label: "Feel too cold." },
  { key: "5g", label: "Feel too hot." },
  { key: "5h", label: "Had bad dreams." },
  { key: "5i", label: "Have pain." },
  // { key: '5j', label: 'Other reason(s), please describe' },
];
const surveyQsAppendixD10 = [
  { key: "10a", label: "Loud snoring" },
  { key: "10b", label: "Long pauses between breaths while asleep." },
  { key: "10c", label: "Legs twitching or jerking while you sleep." },
  {
    key: "10d",
    label: "Episodes of disorientation or confusion during sleep.",
  },
  { key: "10e", label: "Other restlessness while you sleep; please describe" },
];

const surveyAsAppendixD5 = [
  { key: 1, label: "Not during the past month" },
  { key: 2, label: "Less than a week" },
  { key: 3, label: "Once or twice a week" },
  { key: 4, label: "Three or more times a week" },
];
const surveyAsAppendixD6 = [
  { key: 1, label: "Very good" },
  { key: 2, label: "Fairly good" },
  { key: 3, label: "Fairly bad" },
  { key: 4, label: "Very bad" },
];
const surveyAsAppendixD7 = surveyAsAppendixD5;
const surveyAsAppendixD8 = surveyAsAppendixD5;
const surveyAsAppendixD9 = [
  { key: 1, label: "No problem at all" },
  { key: 2, label: "Only a very slight problem" },
  { key: 3, label: "Somewhat of a problem" },
  { key: 4, label: "A very big problem" },
];
const surveyAsAppendixD10 = [
  { key: 1, label: "No bed partner or roommate" },
  { key: 2, label: "Partner/roommate in another room" },
  { key: 3, label: "Partner in same room, but not same bed" },
  { key: 4, label: "Partner in same bed" },
];
const surveyAsAppendixD10a = surveyAsAppendixD5;
const surveyAsAppendixD10b = surveyAsAppendixD5;
const surveyAsAppendixD10c = surveyAsAppendixD5;
const surveyAsAppendixD10d = surveyAsAppendixD5;
const surveyAsAppendixD10e = surveyAsAppendixD5;
