import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Switch, Button, TextInput, Title, Divider } from "react-native-paper";

import DateTimePicker from "./DateTimePicker";
// import CampusMap from './CampusMap';
import EmotionSlider from "./EmotionSlider";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  saveAffirmationReport,
  addAffirmationReport,
  resetAffirmationReport,
} from "../redux/actions";
import { postReport } from "./util/Api";

const Bold = ({ children }) => (
  <Text style={{ fontWeight: "bold" }}>{children}</Text>
);

const placeholder = {
  label: "Select an option...",
  value: null,
  color: "#9EA0A4",
};

function LogoTitleReport() {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Title style={{ color: "#74b783", fontWeight: "600" }}>Edit Report</Title>
    </View>
  );
}

class AffirmationReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      affirmationSelectedLocation: "",
      affirmationSelectedDate: "",
      affirmationSelectedTime: "",
      affirmationOtherEmotionAdded:
        this.props.report.otherEmotionValue ||
        this.props.report.otherEmotionText,
    };

    this.props.navigation.setOptions({
      headerRight: () => (
        <Icon
          name='md-trash'
          color='#74b783'
          size={35}
          onPress={() => {
            this.props.resetAffirmationReport({});
            this.props.navigation.reset({
              index: 0,
              routes: [{ name: "Root" }],
              params: [{ message: "from report" }],
            });
          }}
        />
      ),
      headerLeft: () => (
        <Icon
          name='md-arrow-back'
          color='#74b783'
          size={35}
          onPress={() => this.saveDraft()}
        />
      ),
    });
    if (this.props.report.reportId) {
      this.props.navigation.setOptions({
        headerTitle: (props) => <LogoTitleReport {...props} />,
      });
    }
  }

  onReportChange = (key, value) => {
    this.props.saveAffirmationReport(key, value);
  };

  saveDraft = () => {
    if (this.props.report.description) {
      let report = {
        reportId: this.props.report.reportId,
        complete: false,
        type: "MICROAFFIRMATION",
        report: this.props.report,
        user: this.props.user,
      };

      postReport(report)
        .then((res) => {
          if (res && res.reportId && !report.reportId) {
            report.reportId = res.reportId;
            report.report.reportId = report.reportId;
            this.props.saveAffirmationReport("reportId", report.reportId);
          }
          this.props.addAffirmationReport(report);
        })
        .catch((error) => {
          console.warn("Error posting draft to API");
        })
        .finally(() => {
          this.props.resetAffirmationReport({});
          this.props.navigation.navigate("Home", {
            toastMessage: "Draft saved.",
          });
        });
    } else {
      this.props.resetAffirmationReport({});
      this.props.navigation.navigate("Home", {
        // toastMessage: 'Draft not saved.',
      });
    }
  };

  handleSubmit = () => {
    this.props.saveAffirmationReport("complete", true);
    let report = {
      reportId: this.props.report.reportId,
      report: this.props.report,
      user: this.props.user,
      type: "MICROAFFIRMATION",
      complete: true,
    };
    // Post to API then save to redux
    postReport(report)
      .then((res) => {
        if (res && res.reportId && !report.reportId) {
          report.reportId = res.reportId;
          report.report.reportId = report.reportId;
          this.props.saveAffirmationReport("reportId", report.reportId);
        }
        this.props.addAffirmationReport(report);
      })
      .catch((error) => {
        console.warn("Error posting report to API");
      })
      .finally(() => {
        this.props.resetAffirmationReport({});
        this.props.navigation.navigate("Home", {
          toastMessage: "Report submitted.",
        });
      });
  };

  onLocationChange = (key, value) => {
    this.setState({ affirmationSelectedLocation: value });
    this.onReportChange(key, value);
  };

  addOtherEmotion = () => {
    this.setState({ affirmationOtherEmotionAdded: true });
  };

  onDateTimeChange = (value) => {
    let incidentDateTime = this.formatDate(new Date(value - 86400 * 1000));
    this.props.saveAffirmationReport("incidentTime", incidentDateTime);
  };

  formatDate = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return (
      date.getMonth() +
      1 +
      "/" +
      date.getDate() +
      "/" +
      date.getFullYear() +
      "  " +
      strTime
    );
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <SafeAreaView>
            <Title style={{ ...styles.affirmationText, fontWeight: "bold" }}>
              MICROAFFIRMATION REPORT
            </Title>

            <View>
              <Text style={styles.label}>Time of incident</Text>
              <View
                style={{
                  ...styles.reportComponent,
                  ...styles.datetimePicker,
                }}
              >
                <DateTimePicker
                  style={{ flexGrow: 1 }}
                  mode='datetime'
                  currentDateTime={
                    this.props.report.incidentTime
                      ? new Date(this.props.report.incidentTime)
                      : new Date()
                  }
                  text={
                    this.props.report.incidentTime
                      ? this.props.report.incidentTime
                      : "Choose Date & Time"
                  }
                  callbackHandler={this.onDateTimeChange}
                />
              </View>
            </View>

            <Divider style={{ marginVertical: hp(".75%") }} />

            <View style={styles.reportComponent}>
              <Text style={styles.label}>Describe what happened...</Text>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <TextInput
                  value={this.props.report["description"]}
                  onChangeText={(value) =>
                    this.onReportChange("description", value)
                  }
                  label='Description'
                  multiline={true}
                  mode='outlined'
                  style={{
                    textAlignVertical: "top",
                  }}
                  numberOfLines={8}
                />
              </TouchableWithoutFeedback>
            </View>

            <Divider style={{ marginVertical: hp(".75%") }} />

            <View style={{ marginVertical: hp(".75%") }}>
              <Text style={styles.label}>What was it related to?</Text>
              <View style={styles.switchContainer}>
                <Switch
                  onValueChange={(value) =>
                    this.onReportChange("relatedToRace", value)
                  }
                  value={this.props.report.relatedToRace}
                  trackColor='#DEDEDE'
                />
                <Text style={styles.switchText}>Race</Text>
              </View>
              <View style={styles.switchContainer}>
                <Switch
                  onValueChange={(value) =>
                    this.onReportChange("relatedToCulture", value)
                  }
                  value={this.props.report.relatedToCulture}
                  trackColor='#DEDEDE'
                />
                <Text style={styles.switchText}>Culture</Text>
              </View>
              <View style={styles.switchContainer}>
                <Switch
                  onValueChange={(value) =>
                    this.onReportChange("relatedToGender", value)
                  }
                  value={this.props.report.relatedToGender}
                  trackColor='#DEDEDE'
                />
                <Text style={styles.switchText}>Gender</Text>
              </View>
              <View style={styles.switchContainer}>
                <Switch
                  onValueChange={(value) =>
                    this.onReportChange("relatedToSexualOrientation", value)
                  }
                  value={this.props.report.relatedToSexualOrientation}
                  trackColor='#DEDEDE'
                />
                <Text style={styles.switchText}>Sexual Orientation</Text>
              </View>
              <View style={styles.switchContainer}>
                <Switch
                  onValueChange={(value) =>
                    this.onReportChange("relatedToOther", value)
                  }
                  value={this.props.report.relatedToOther}
                  trackColor='#DEDEDE'
                />
                <Text style={styles.switchText}>Other</Text>
                {this.props.report.relatedToOther ? (
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <TextInput
                      style={{ marginLeft: 10, flexGrow: 1 }}
                      mode='outlined'
                      value={this.props.report.relatedToOtherDescription}
                      onChangeText={(value) =>
                        this.onReportChange("relatedToOtherDescription", value)
                      }
                    />
                  </TouchableWithoutFeedback>
                ) : undefined}
              </View>
            </View>

            <Divider style={{ marginVertical: hp(".75%") }} />

            <View style={styles.reportComponent}>
              <Text style={styles.label}>
                Where did it happen? (Please enter a specific location
                [including Zoom])
              </Text>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <TextInput
                  value={this.props.report.campus}
                  onChangeText={(value) => this.onReportChange("campus", value)}
                  label='Location'
                  multiline={true}
                  mode='outlined'
                  style={{
                    textAlignVertical: "top",
                  }}
                  numberOfLines={3}
                />
              </TouchableWithoutFeedback>
            </View>

            {/* <View style={styles.pickerContainer}>
            <View style={{ marginBottom: hp('1%') }}>
              <Text style={styles.label}>Where did it happen? (Please enter a specific location [including Zoom])</Text>
            </View>
            <RNPickerSelect
              placeholder={placeholder}
              items={campusOptions}
              onValueChange={(value) => this.onReportChange('campus', value)}
              style={pickerSelectStyles}
              value={this.props.report.campus}
              useNativeAndroidPickerStyle={false}
              // InputAccessoryView={() => null}
              Icon={() => {
                return (
                  <Icon
                    name="md-arrow-down"
                    color="#000"
                    size={30}
                  />
                );
              }}
            />
          </View> */}

            {/* <Text style={{ fontStyle: 'italic', paddingVertical: 10, textAlign: 'center', fontSize: hp('1.75%') }}>
            Click the pencil under the map to select a location.
          </Text>

          <View style={{ paddingHorizontal: hp('3.5%') }}>
            <CampusMap 
              location={this.state.affirmationSelectedLocation} 
              onMarkerPress={value => this.onLocationChange('location', value)}
              campus={this.props.report.campus}
            />
          </View> */}

            {/* <View style={styles.pickerContainer}>
            <RNPickerSelect
              placeholder={{
                label: 'Choose a location',
                value: null,
                color: '#9EA0A4',
              }}
              items={ucsdLocations}
              onValueChange={(value) => this.onLocationChange('location', value)}
              style={pickerSelectStyles}
              value={this.props.report.location}
              useNativeAndroidPickerStyle={false}
              Icon={() => {
                return (
                  <Icon
                    name="md-create"
                    color="#74b783"
                    size={25}
                  />
                );
              }}
            />
          </View> */}

            <Divider style={{ marginVertical: hp(".75%") }} />

            <View style={styles.sliders}>
              <View key='sensitivity' style={{ marginBottom: 20 }}>
                <EmotionSlider
                  key='sensitivity'
                  containerStyle={styles.sliders}
                  titleStyle={styles.label}
                  title='How much did it uplift you?'
                  value={this.props.report["sensitivity"]}
                  onChange={(value) =>
                    this.onReportChange("sensitivity", value)
                  }
                  sliderStyle={styles.sliderStyle}
                  minimumValue={0}
                  maximumValue={5}
                  minimumTrackTintColor='#74b783'
                  maximumTrackTintColor='#EFEFEF'
                  imageSrc={require("../assets/images/scale2.png")}
                />
              </View>

              <Divider style={{ marginVertical: hp(".75%") }} />

              <Text style={styles.label}>
                At this moment, how intensely do you feel the following?
              </Text>

              {aggressionEmotionSliders.map((emotion, i) => {
                return (
                  <View key={i}>
                    <EmotionSlider
                      key={emotion.key}
                      containerStyle={styles.sliders}
                      titleStyle={styles.affirmationText}
                      title={emotion.title}
                      value={this.props.report[emotion.key]}
                      onChange={(value) =>
                        this.onReportChange(emotion.key, value)
                      }
                      sliderStyle={styles.sliderStyle}
                      minimumValue={0}
                      maximumValue={5}
                      minimumTrackTintColor='#74b783'
                      maximumTrackTintColor='#EFEFEF'
                      imageSrc={require("../assets/images/scale2.png")}
                    />
                    <Divider
                      style={{
                        marginVertical: hp(".75%"),
                        alignSelf: "center",
                        width: "60%",
                      }}
                    />
                  </View>
                );
              })}

              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {!this.state.affirmationOtherEmotionAdded ? (
                  <TouchableOpacity
                    style={{
                      ...styles.sliders,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    onPress={this.addOtherEmotion}
                  >
                    <Icon
                      name='md-add'
                      style={{ color: "#74b783", marginRight: 15 }}
                      size={35}
                    />
                    <Text style={{ fontSize: 18 }}>
                      Add another emotion (optional)
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View key='other' style={{ marginBottom: 20 }}>
                    <TextInput
                      value={this.props.report.otherEmotionText}
                      onChangeText={(value) =>
                        this.onReportChange("otherEmotionName", value)
                      }
                      label='Name of emotion'
                      mode='outlined'
                    />
                    <EmotionSlider
                      key='other'
                      containerStyle={styles.sliders}
                      titleStyle={styles.affirmationText}
                      title={this.props.report.otherEmotionText ?? ""}
                      value={this.props.report.otherEmotionValue}
                      onChange={(value) =>
                        this.onReportChange("otherEmotionValue", value)
                      }
                      sliderStyle={styles.sliderStyle}
                      minimumValue={0}
                      maximumValue={10}
                      minimumTrackTintColor='#74b783'
                      maximumTrackTintColor='#EFEFEF'
                      imageSrc={require("../assets/images/scale2.png")}
                    />
                  </View>
                )}
              </TouchableWithoutFeedback>
            </View>

            <Divider style={{ marginVertical: hp(".75%") }} />
            <Button
              onPress={this.handleSubmit}
              style={styles.button}
              icon='send'
              mode='contained'
            >
              Submit
            </Button>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  return {
    report: state.affirmations,
    user: state.user,
  };
}

export default connect(mapStateToProps, {
  saveAffirmationReport,
  addAffirmationReport,
  resetAffirmationReport,
})(AffirmationReport);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbfafa",
    padding: wp("2%"),
  },
  label: {
    marginVertical: hp(".75%"),
    fontWeight: "bold",
    fontSize: hp("2%"),
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    marginVertical: 5,
  },
  sliders: {
    marginVertical: hp("2%"),
  },
  sliderStyle: {
    width: "90%",
    alignSelf: "center",
  },
  switchText: {
    marginLeft: wp("3%"),
    fontSize: hp("1.85%"),
  },
  contentContainer: {
    paddingTop: hp("2%"),
  },
  reportComponent: {
    width: "100%",
    marginVertical: hp("2%"),
  },
  affirmationText: {
    color: "#74b783",
    fontSize: hp("2.5%"),
    marginBottom: hp("1%"),
    fontWeight: "bold",
  },
  aggressionButton: {
    marginVertical: 40,
    borderWidth: 3,
    borderRadius: 5,
    borderColor: "#b16d65",
    color: "#b16d65",
    padding: 30,
    paddingVertical: 40,
    fontSize: hp("2.25%"),
    fontWeight: "600",
  },
  affirmationButton: {
    marginVertical: 40,
    borderWidth: 3,
    borderRadius: 5,
    borderColor: "#74b783",
    color: "#74b783",
    padding: 30,
    paddingVertical: 40,
    fontSize: hp("2.25%"),
    fontWeight: "600",
  },
  button: {
    marginTop: hp("3%"),
    marginBottom: hp("10%"),
    backgroundColor: "#74b783",
    paddingVertical: 6,
    width: "90%",
    alignSelf: "center",
  },
  pickerContainer: {
    flex: 1,
    paddingVertical: hp("3%"),
    justifyContent: "space-between",
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  scrollContentContainer: {
    paddingTop: 40,
    paddingBottom: 10,
  },
  datetimePicker: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#787878",
    backgroundColor: "#f7f7f7",
    paddingVertical: 9,
    paddingHorizontal: 5,
    alignItems: "baseline",
  },
});

const pickerSelectStyles = StyleSheet.create({
  flexGrow: 1,
  iconContainer: {
    top: 16,
    right: 20,
  },
  inputIOS: {
    fontSize: hp("2%"),
    paddingVertical: 18,
    paddingHorizontal: 10,
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: hp("2%"),
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const aggressionEmotionSliders = [
  { key: "anger", title: "Angry" },
  { key: "sad", title: "Sad" },
  { key: "shame", title: "Shame" },
  { key: "surprise", title: "Surprise" },
  { key: "fear", title: "Fear" },
  { key: "contempt", title: "Contempt" },
  { key: "happy", title: "Happy" },
  { key: "disgust", title: "Disgust" },
  { key: "pride", title: "Pride" },
  { key: "guilt", title: "Guilt" },
];

const campusOptions = [
  { key: 1, value: "UCSD", label: "UC San Diego", displayValue: false },
  { key: 2, value: "sfsu", label: "SF State", displayValue: false },
];

const ucsdLocations = [
  {
    key: "on-campus",
    value: "on-campus",
    label: "On-campus",
  },
  {
    key: "virtual",
    value: "virtual",
    label: "Virtual meeting",
  },
];

const sfsuLocations = [
  {
    key: "lib",
    value: "lib",
    label: "J. Paul Leonard Library (LIB)",
  },
  {
    key: "shs",
    value: "shs",
    label: "Student Health Center (SHS)",
  },
  {
    key: "hh",
    value: "hh",
    label: "Hensill Hall (HH)",
  },
  {
    key: "hss",
    value: "hss",
    label: "Health and Social Sciences (HSS)",
  },
  {
    key: "hum",
    value: "hum",
    label: "Humanities (HUM)",
  },
  {
    key: "parking",
    value: "parking",
    label: "Parking Garage",
  },
  {
    key: "quad",
    value: "quad",
    label: "Quad",
  },
  {
    key: "sci",
    value: "sci",
    label: "Science (SCI)",
  },
  {
    key: "ssb",
    value: "ssb",
    label: "Student Services (SSB)",
  },
  {
    key: "th",
    value: "th",
    label: "Thornton Hall (TH)",
  },

  // {
  //   key: 'sfsu',
  //   value: 'sfsu',
  //   label: 'San Francisco State University',
  // },
  // {
  //   key: 'adm',
  //   value: 'adm',
  //   label: 'Administration',
  // },
  // {
  //   key: 'bookstore',
  //   value: 'bookstore',
  //   label: 'SFSU Bookstore',
  // },
  // {
  //   key: 'bh',
  //   value: 'bh',
  //   label: 'Burk Hall (BH)',
  // },
  // {
  //   key: 'bus',
  //   value: 'bus',
  //   label: 'Business (BUS)',
  // },
  // {
  //   key: 'ccsc',
  //   value: 'ccsc',
  //   label: 'Cesar Chavez Student Center (CCSC)',
  // },
  // {
  //   key: 'stadium',
  //   value: 'stadium',
  //   label: 'Cox Stadium',
  // },
  // {
  //   key: 'ca',
  //   value: 'ca',
  //   label: 'Creative Arts (CA)',
  // },
  // {
  //   key: 'ep',
  //   value: 'ep',
  //   label: 'Ethnic Studies & Psychology (EP)',
  // },
  // {
  //   key: 'fa',
  //   value: 'fa',
  //   label: 'Fine Arts (FA)',
  // },
  // {
  //   key: 'gym',
  //   value: 'gym',
  //   label: 'Gymnasium (GYM)',
  // },
];
